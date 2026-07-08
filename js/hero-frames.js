/* =====================================================================
   Hero Frame Scroll Sequence
   Scrubs 145 frames on canvas tied to scroll; fades hero + about text
   overlays at defined progress milestones.
   ===================================================================== */
(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── Config ── */
  var TOTAL    = 145;
  var SCROLL_H = 4500; // px of pinned scroll for the full sequence

  /*
    Progress milestones (0 = frame 1, 1 = frame 145):
    Hero text:  fade IN  frames  3..10  (p 0.02..0.069)
                hold     frames 10..39  (p 0.069..0.27)
                fade OUT frames 39..58  (p 0.27..0.40)
    About text: fade IN  frames 116..133 (p 0.80..0.92)
                hold     frames 133..145 (p 0.92..1.00)
  */
  var H_IN_START  = 0.02;
  var H_IN_END    = 0.069;
  var H_OUT_START = 0.27;
  var H_OUT_END   = 0.40;
  var A_IN_START  = 0.80;
  var A_IN_END    = 0.92;

  /* ── DOM refs ── */
  var canvas    = document.getElementById('reel-canvas');
  var ctx       = canvas ? canvas.getContext('2d', { alpha: false, desynchronized: true }) : null;
  var heroOvl   = document.getElementById('hero-overlay');
  var aboutOvl  = document.getElementById('about-overlay');
  var loaderEl  = document.getElementById('reel-loader');
  var loaderBar = document.getElementById('reel-loader-bar');
  /* Actual <a> buttons — pointer-events toggled directly on these */
  var heroBtns  = heroOvl  ? Array.from(heroOvl.querySelectorAll('.btn'))  : [];
  var aboutBtn  = aboutOvl ? aboutOvl.querySelector('.btn')                 : null;

  if (!canvas || !ctx) return;

  /* ── Reduced-motion: show static frame + bypass animation ── */
  var prefersReduced = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  if (prefersReduced) {
    /* Show first frame once it loads */
    var fm0 = new Image();
    fm0.onload = function () {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drawCoverImg(fm0);
      if (loaderEl) { loaderEl.style.opacity = '0'; loaderEl.style.display = 'none'; }
    };
    fm0.src = 'assets/frames/frame_001.jpg';
    /* Reveal hero text immediately */
    if (heroOvl) {
      heroOvl.style.opacity = '1';
      var animEls = heroOvl.querySelectorAll('.anim');
      animEls.forEach(function (el) { el.style.opacity = '1'; el.style.transform = ''; });
      heroBtns.forEach(function (b) { b.style.pointerEvents = 'auto'; });
    }
    return; /* no ScrollTrigger, page scrolls normally */
  }

  /* ── Canvas sizing + cover draw ── */
  var currentIdx = 0;
  var frames = new Array(TOTAL);

  function drawCoverImg(img) {
    var cw = canvas.width, ch = canvas.height;
    var iw = img.naturalWidth,  ih = img.naturalHeight;
    if (!iw || !ih) return;
    var scale = Math.max(cw / iw, ch / ih);
    var dw = iw * scale, dh = ih * scale;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }

  function drawFrame(idx) {
    currentIdx = idx;
    var img = frames[idx];
    if (img && img.complete && img.naturalWidth) {
      drawCoverImg(img); return;
    }
    /* fallback: nearest earlier loaded frame */
    for (var j = idx - 1; j >= 0; j--) {
      var f = frames[j];
      if (f && f.complete && f.naturalWidth) { drawCoverImg(f); return; }
    }
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentIdx);
    ScrollTrigger.refresh();
  }

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', resize);

  /* ── Pre-load all frames ── */
  var loadedCount = 0;
  var firstReady  = false;

  function framePath(i) {
    return 'assets/frames/frame_' + String(i).padStart(3, '0') + '.jpg';
  }

  for (var i = 1; i <= TOTAL; i++) {
    (function (idx) {
      var img = new Image();
      img.onload = function () {
        loadedCount++;
        if (loaderBar) loaderBar.style.width = (loadedCount / TOTAL * 100) + '%';
        if (!firstReady && idx === 1) {
          firstReady = true;
          drawFrame(0);
          if (loaderEl) {
            loaderEl.style.opacity = '0';
            setTimeout(function () {
              if (loaderEl) loaderEl.style.display = 'none';
            }, 700);
          }
        }
      };
      img.src = framePath(idx);
      frames[idx - 1] = img;
    }(i));
  }

  /* ── Init overlay states ── */
  var heroAnims  = heroOvl  ? Array.from(heroOvl.querySelectorAll('.anim'))  : [];
  var aboutAnims = aboutOvl ? Array.from(aboutOvl.querySelectorAll('.anim')) : [];

  heroAnims.forEach(function (el)  { el.style.opacity = '0'; el.style.transform = 'translateY(30px)'; });
  aboutAnims.forEach(function (el) { el.style.opacity = '0'; el.style.transform = 'translateY(24px)'; });
  if (heroOvl)  heroOvl.style.opacity  = '0';
  if (aboutOvl) aboutOvl.style.opacity = '0';
  heroBtns.forEach(function (b) { b.style.pointerEvents = 'none'; });
  if (aboutBtn) aboutBtn.style.pointerEvents = 'none';

  /* ── Math helpers ── */
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function remap(x, lo, hi) { return clamp01((x - lo) / (hi - lo)); }
  function easeOut(t) { var u = 1 - t; return 1 - u * u * u; } /* cubic ease-out */

  /* childT: 0→1 as p moves from `start` to `start+dur`, clamped */
  function childProgress(p, start, dur) {
    return easeOut(remap(p, start, start + dur));
  }

  function setElStyle(el, t, yFrom) {
    el.style.opacity   = String(t);
    el.style.transform = t < 0.999 ? 'translateY(' + ((1 - t) * yFrom) + 'px)' : '';
  }

  /* ── Overlay update (called on every scroll tick) ── */
  function updateOverlays(p) {
    var i, el, t;

    /* ---- Hero overlay ---- */
    if (heroOvl) {
      if (p >= H_IN_START && p <= H_OUT_END) {
        heroOvl.style.opacity = '1';

        if (p <= H_OUT_START) {
          /* Staggered fade-IN: each child starts 0.025 later, takes 0.055 to complete */
          for (i = 0; i < heroAnims.length; i++) {
            el = heroAnims[i];
            t  = childProgress(p, H_IN_START + i * 0.025, 0.055);
            setElStyle(el, t, 30);
          }
          /* Enable buttons once kicker is mostly in */
          t = childProgress(p, H_IN_START, 0.055);
          var btnPE = t > 0.6 ? 'auto' : 'none';
          heroBtns.forEach(function (b) { b.style.pointerEvents = btnPE; });

        } else {
          /* Fade OUT: all at once, container fades */
          var fadeOut = 1 - easeOut(remap(p, H_OUT_START, H_OUT_END));
          heroOvl.style.opacity = String(fadeOut);
          var btnPEOut = fadeOut > 0.5 ? 'auto' : 'none';
          heroBtns.forEach(function (b) { b.style.pointerEvents = btnPEOut; });
        }
      } else {
        heroOvl.style.opacity = '0';
        heroBtns.forEach(function (b) { b.style.pointerEvents = 'none'; });
        /* Reset children so re-entry replays the stagger */
        if (p < H_IN_START) {
          for (i = 0; i < heroAnims.length; i++) {
            setElStyle(heroAnims[i], 0, 30);
          }
        }
      }
    }

    /* ---- About overlay ---- */
    if (aboutOvl) {
      if (p >= A_IN_START) {
        /* Container fades in, then holds */
        aboutOvl.style.opacity = String(easeOut(remap(p, A_IN_START, A_IN_END)));

        /* Staggered fade-IN: each child starts 0.03 later, takes 0.07 to complete */
        for (i = 0; i < aboutAnims.length; i++) {
          el = aboutAnims[i];
          t  = childProgress(p, A_IN_START + i * 0.03, 0.07);
          setElStyle(el, t, 24);
        }
        /* Enable CTA once most of text is in */
        if (aboutBtn) {
          var lastChildT = childProgress(p, A_IN_START + (aboutAnims.length - 1) * 0.03, 0.07);
          aboutBtn.style.pointerEvents = lastChildT > 0.5 ? 'auto' : 'none';
        }
      } else {
        aboutOvl.style.opacity = '0';
        if (aboutBtn) aboutBtn.style.pointerEvents = 'none';
      }
    }
  }

  /* ── ScrollTrigger ── */
  ScrollTrigger.create({
    trigger : '#frame-reel',
    start   : 'top top',
    end     : '+=' + SCROLL_H,
    pin     : true,
    scrub   : 0.8,
    onUpdate: function (self) {
      var p   = self.progress;
      var idx = Math.min(Math.floor(p * TOTAL), TOTAL - 1);
      drawFrame(idx);
      updateOverlays(p);
    }
  });

}());
