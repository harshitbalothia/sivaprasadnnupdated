/* Horizontal parallax gallery
   Smooth scroll + per-image counter-shift for depth. */
(function(){
  var wrapper = document.getElementById('hgallery');
  var track   = document.getElementById('hgallery-track');
  if(!wrapper || !track) return;

  var images = track.querySelectorAll('.hgallery__img');
  var scroll = { current:0, target:0, ease:0.045, limit:0 };
  var dragging = false, startX = 0, startScroll = 0;

  function setLimit(){
    scroll.limit = track.scrollWidth - wrapper.clientWidth;
  }

  function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }
  function lerp(a,b,t){ return a + (b - a) * t; }

  var imgShifts = [];
  images.forEach(function(){ imgShifts.push(0); });

  function parallax(){
    var vw = window.innerWidth;
    var center = vw * 0.5;
    images.forEach(function(img, i){
      var parent = img.parentElement;
      if(!parent) return;
      var rect = parent.getBoundingClientRect();
      var elCenter = rect.left + rect.width * 0.5;
      var t = clamp((elCenter - center) / center, -1, 1);
      var targetShift = -t * 10;
      imgShifts[i] = lerp(imgShifts[i], targetShift, 0.06);
      img.style.transform = 'translate3d(' + imgShifts[i].toFixed(3) + '%,0,0)';
    });
  }

  function render(){
    scroll.target = clamp(scroll.target, 0, scroll.limit);
    scroll.current = lerp(scroll.current, scroll.target, scroll.ease);
    if(Math.abs(scroll.current - scroll.target) < 0.1) scroll.current = scroll.target;
    track.style.transform = 'translate3d(' + (scroll.current < 0.01 ? 0 : -scroll.current).toFixed(2) + 'px,0,0)';
    parallax();
    requestAnimationFrame(render);
  }

  wrapper.addEventListener('wheel', function(e){
    e.preventDefault();
    scroll.target += (e.deltaY + e.deltaX) * 0.8;
  }, {passive:false});

  wrapper.addEventListener('pointerdown', function(e){
    dragging = true;
    startX = e.clientX;
    startScroll = scroll.target;
    wrapper.setPointerCapture(e.pointerId);
  });
  wrapper.addEventListener('pointermove', function(e){
    if(!dragging) return;
    var dx = startX - e.clientX;
    scroll.target = startScroll + dx * 1.2;
  });
  wrapper.addEventListener('pointerup', function(){ dragging = false; });
  wrapper.addEventListener('pointercancel', function(){ dragging = false; });

  window.addEventListener('resize', setLimit);

  setLimit();
  render();
})();
