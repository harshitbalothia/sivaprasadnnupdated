/* =====================================================================
   Shared header + footer. Edit the nav or footer ONCE here and it
   updates on every page. Pages just need <div id="site-header"></div>
   and <div id="site-footer"></div>.
   ===================================================================== */
(function(){
  var C = (window.SITE && window.SITE.contact) || {};
  var page = document.body.getAttribute('data-page') || '';

  /* ---- NAV: label + file. Reorder / rename here. ---- */
  var nav = [
    ["Home","index.html","home"],
    ["About","about.html","about"],
    ["Repertoire","repertoire.html","repertoire"],
    ["Performances","performances.html","performances"],
    ["Music & Video","music.html","music"],
    ["Learn","learn.html","learn"],
    ["Ensembles","book.html","book"],
    ["Press","press.html","press"]
  ];

  var links = nav.map(function(n){
    var active = (n[2]===page) ? ' class="active"' : '';
    return '<li><a href="'+n[1]+'"'+active+'>'+n[0]+'</a></li>';
  }).join('');

  var header =
  '<div class="wrap"><nav class="nav">'
  + '<a class="brand" href="index.html">'
  +   '<span class="n">Sivaprasad NN</span>'
  +   '<span class="t">Carnatic Vocalist</span>'
  + '</a>'
  + '<ul class="nav-links" id="navlinks">' + links
  +   '<li class="nav-cta"><a href="contact.html" class="btn ghost" style="padding:10px 22px">Book / Enquire</a></li>'
  + '</ul>'
  + '<button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>'
  + '</nav></div>';

  var wa = C.phoneRaw ? 'https://wa.me/'+C.phoneRaw : '#';
  function soc(url,label,svg){ return url ? '<a href="'+url+'" target="_blank" rel="noopener" aria-label="'+label+'">'+svg+'</a>' : ''; }
  var ig='<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4 1.3-.1 1.7-.1 4.9-.1M12 0C8.7 0 8.3 0 7 .1 5.7.1 4.8.3 4.1.6c-.8.3-1.4.7-2.1 1.4C1.3 2.7.9 3.3.6 4.1.3 4.8.1 5.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c.1 1.3.3 2.2.5 2.9.3.8.7 1.4 1.4 2.1.7.7 1.3 1.1 2.1 1.4.7.3 1.6.5 2.9.5 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3-.1 2.2-.3 2.9-.5.8-.3 1.4-.7 2.1-1.4.7-.7 1.1-1.3 1.4-2.1.3-.7.5-1.6.5-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.3-.3-2.2-.5-2.9-.3-.8-.7-1.4-1.4-2.1C21.3 1.3 20.7.9 19.9.6 19.2.3 18.3.1 17 .1 15.7 0 15.3 0 12 0z"/><path d="M12 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4z"/><circle cx="18.4" cy="5.6" r="1.4"/></svg>';
  var fb='<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>';
  var yt='<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5zM9.6 15.6V8.4l6.3 3.6z"/></svg>';
  var waSvg='<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.6.1-.2.3-.7 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C9.8 8.5 9.3 7 9 6.4c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.9.9-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>';

  var footer =
  '<div class="wrap"><div class="footer-grid">'
  + '<div><div class="brand" style="margin-bottom:14px"><span class="n" style="color:#fff;font-size:1.4rem">Sivaprasad NN</span>'
  +   '<span class="t" style="color:var(--saffron)">Carnatic Vocalist &middot; Composer &middot; Music Director</span></div>'
  +   '<p class="muted" style="max-width:34ch">Four decades of Carnatic vocal, Sopanam, dance-ballet and fusion, carried to the people who book, learn from and write about the music.</p>'
  +   '<div class="socials">'+soc(C.instagram,'Instagram',ig)+soc(C.facebook,'Facebook',fb)+soc(C.youtube,'YouTube',yt)+soc(wa,'WhatsApp',waSvg)+'</div>'
  + '</div>'
  + '<div><h4>Explore</h4><ul>'
  +   '<li><a href="about.html">About</a></li><li><a href="repertoire.html">Repertoire</a></li>'
  +   '<li><a href="performances.html">Performances</a></li><li><a href="music.html">Music &amp; Video</a></li>'
  +   '<li><a href="learn.html">Learn Online</a></li><li><a href="book.html">Book Ensembles</a></li>'
  +   '<li><a href="press.html">Press &amp; Recognition</a></li></ul></div>'
  + '<div><h4>Get in touch</h4><ul>'
  +   '<li><a href="tel:'+(C.phoneRaw||'')+'">'+(C.phone||'')+'</a></li>'
  +   '<li><a href="mailto:'+(C.email||'')+'">'+(C.email||'')+'</a></li>'
  +   '<li>'+(C.cityLine||'')+'</li>'
  +   '<li style="margin-top:12px"><a href="contact.html" class="btn light" style="padding:10px 22px">Book / Enquire</a></li></ul></div>'
  + '</div>'
  + '<div class="footer-bottom"><span>&copy; '+new Date().getFullYear()+' Sivaprasad NN. All rights reserved.</span>'
  +   '<span class="credit">A digital home by <a href="https://marketincrew.com" target="_blank" rel="noopener">MarketinCrew</a></span></div>'
  + '</div>';

  var h=document.getElementById('site-header'); if(h){h.className='site-header';h.innerHTML=header;}
  var f=document.getElementById('site-footer'); if(f){f.className='site-footer';f.innerHTML=footer;}

  // burger toggle
  var b=document.getElementById('burger'), nl=document.getElementById('navlinks');
  if(b&&nl){ b.addEventListener('click',function(){nl.classList.toggle('open');}); }
})();
