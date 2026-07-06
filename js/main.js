/* =====================================================================
   Site behaviour: renders galleries/videos/awards/quotes from data.js,
   lightbox, scroll-reveal, form tabs. You rarely need to edit this.
   ===================================================================== */
(function(){
  var S = window.SITE || {};

  /* ---------- scroll reveal ---------- */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12}) : null;
  function reveal(el){ if(io) io.observe(el); else el.classList.add('in'); }
  document.querySelectorAll('.reveal').forEach(reveal);

  /* ---------- render photo gallery (any element with data-gallery) ---------- */
  var galEl = document.querySelector('[data-gallery]');
  if(galEl){
    var n = S.galleryCount || 42;
    var limit = parseInt(galEl.getAttribute('data-limit')) || n;
    var html='';
    for(var i=1;i<=Math.min(limit,n);i++){
      var f='assets/photos/gallery/perf-'+String(i).padStart(2,'0')+'.jpg';
      html+='<figure data-lb="'+f+'"><img loading="lazy" src="'+f+'" alt="Sivaprasad NN in performance"></figure>';
    }
    galEl.innerHTML=html;
  }

  /* ---------- render press wall (data-press) ---------- */
  var prEl=document.querySelector('[data-press]');
  if(prEl){
    var pn=S.pressCount||18, ph='';
    for(var p=1;p<=pn;p++){
      var pf='assets/press/clip-'+String(p).padStart(2,'0')+'.jpg';
      ph+='<figure data-lb="'+pf+'"><img loading="lazy" src="'+pf+'" alt="Press coverage of Sivaprasad NN"></figure>';
    }
    prEl.innerHTML=ph;
  }

  /* ---------- render videos (data-videos, optional data-group) ---------- */
  document.querySelectorAll('[data-videos]').forEach(function(box){
    var group=box.getAttribute('data-group');
    var vids=(S.videos||[]).filter(function(v){return !group||v.group===group;});
    box.innerHTML=vids.map(function(v){
      return '<div><div class="video video-thumb" data-yt="'+v.id+'">'
        +'<img loading="lazy" src="https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg" alt="'+v.title+'"></div>'
        +'<div class="vcaption">'+v.title+'</div></div>';
    }).join('');
  });
  // click a video thumb -> swap to iframe
  document.addEventListener('click',function(e){
    var t=e.target.closest('.video-thumb'); if(!t)return;
    var id=t.getAttribute('data-yt');
    t.classList.remove('video-thumb');
    t.innerHTML='<iframe src="https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  });

  /* ---------- render awards (data-awards) ---------- */
  var awEl=document.querySelector('[data-awards]');
  if(awEl){ awEl.innerHTML=(S.awards||[]).map(function(a){
    return '<li><span class="yr">'+a.yr+'</span><span class="ti">'+a.ti+'</span></li>';
  }).join(''); }

  /* ---------- render quotes (data-quotes) ---------- */
  var qEl=document.querySelector('[data-quotes]');
  if(qEl){ qEl.innerHTML=(S.quotes||[]).map(function(c){
    return '<div class="quote reveal"><p>&ldquo;'+c.q+'&rdquo;</p><cite>'+c.by+'</cite></div>';
  }).join(''); qEl.querySelectorAll('.reveal').forEach(reveal); }

  /* ---------- lightbox ---------- */
  var imgs=[], idx=0;
  function buildLB(){
    if(document.getElementById('lb'))return;
    var d=document.createElement('div'); d.id='lb'; d.className='lb';
    d.innerHTML='<span class="x">&times;</span><span class="nav-a prev">&#8249;</span><img><span class="nav-a next">&#8250;</span>';
    document.body.appendChild(d);
    d.querySelector('.x').onclick=function(){d.classList.remove('open');};
    d.onclick=function(e){if(e.target===d)d.classList.remove('open');};
    d.querySelector('.prev').onclick=function(e){e.stopPropagation();idx=(idx-1+imgs.length)%imgs.length;show();};
    d.querySelector('.next').onclick=function(e){e.stopPropagation();idx=(idx+1)%imgs.length;show();};
    document.addEventListener('keydown',function(e){
      if(!d.classList.contains('open'))return;
      if(e.key==='Escape')d.classList.remove('open');
      if(e.key==='ArrowLeft')d.querySelector('.prev').click();
      if(e.key==='ArrowRight')d.querySelector('.next').click();
    });
  }
  function show(){document.querySelector('#lb img').src=imgs[idx];}
  document.addEventListener('click',function(e){
    var fig=e.target.closest('[data-lb]'); if(!fig)return;
    buildLB();
    var scope=fig.closest('[data-gallery],[data-press]')||document;
    imgs=[].map.call(scope.querySelectorAll('[data-lb]'),function(f){return f.getAttribute('data-lb');});
    idx=imgs.indexOf(fig.getAttribute('data-lb'));
    show(); document.getElementById('lb').classList.add('open');
  });

  /* ---------- contact form tabs ---------- */
  document.querySelectorAll('.tabs').forEach(function(tabs){
    tabs.addEventListener('click',function(e){
      var t=e.target.closest('.tab'); if(!t)return;
      tabs.querySelectorAll('.tab').forEach(function(x){x.classList.remove('active');});
      t.classList.add('active');
      var target=t.getAttribute('data-tab');
      document.querySelectorAll('.tabpane').forEach(function(pane){
        pane.style.display = pane.getAttribute('data-pane')===target ? 'block':'none';
      });
      // update the hidden subject line so the enquiry email is labelled
      var subj=document.querySelector('input[name="_subject"]');
      if(subj) subj.value='Website enquiry: '+t.textContent.trim();
    });
  });
})();
