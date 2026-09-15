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

  /* ---------- Learn curriculum tabs and stage navigation ---------- */
  var learnTabsets=[];
  document.querySelectorAll('[data-learn-tabs]').forEach(function(root){
    var tablist=root.querySelector('[data-learn-tablist]');
    var tabs=[].slice.call(root.querySelectorAll('[data-learn-tab]'));
    var panels=[].slice.call(root.querySelectorAll('[data-learn-panel]'));
    if(!tablist||!tabs.length||!panels.length)return;

    tablist.setAttribute('role','tablist');

    function activateLearnTab(tab,options){
      options=options||{};
      var panelId=tab.getAttribute('data-learn-tab');
      var panel=document.getElementById(panelId);
      if(!panel||!root.contains(panel))return;

      tabs.forEach(function(item){
        var selected=item===tab;
        item.setAttribute('aria-selected',String(selected));
        item.tabIndex=selected?0:-1;
      });
      panels.forEach(function(item){item.hidden=item!==panel;});

      if(options.focus)tab.focus({preventScroll:true});
      if(options.updateHash&&window.history&&window.history.replaceState){
        window.history.replaceState(null,'','#'+panelId);
      }
    }

    tabs.forEach(function(tab,index){
      var panelId=tab.getAttribute('data-learn-tab');
      var panel=document.getElementById(panelId);
      if(!panel||!root.contains(panel))return;
      if(!tab.id)tab.id=panelId+'-tab';
      tab.setAttribute('role','tab');
      tab.setAttribute('aria-controls',panelId);
      panel.setAttribute('role','tabpanel');
      panel.setAttribute('aria-labelledby',tab.id);
      panel.tabIndex=0;

      tab.addEventListener('click',function(){activateLearnTab(tab,{updateHash:true});});
      tab.addEventListener('keydown',function(event){
        var next=null;
        if(event.key==='ArrowRight')next=(index+1)%tabs.length;
        if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
        if(event.key==='Home')next=0;
        if(event.key==='End')next=tabs.length-1;
        if(next===null)return;
        event.preventDefault();
        activateLearnTab(tabs[next],{focus:true,updateHash:true});
      });
    });

    var hashId='';
    try{hashId=decodeURIComponent(window.location.hash.slice(1));}catch(error){hashId=window.location.hash.slice(1);}
    var initial=tabs[0];
    tabs.forEach(function(tab){if(tab.getAttribute('data-learn-tab')===hashId)initial=tab;});
    root.classList.add('is-enhanced');
    activateLearnTab(initial);
    learnTabsets.push({root:root,tabs:tabs,activate:activateLearnTab});
  });

  function activateLearnTabFromHash(){
    var hashId='';
    try{hashId=decodeURIComponent(window.location.hash.slice(1));}catch(error){hashId=window.location.hash.slice(1);}
    learnTabsets.forEach(function(set){
      set.tabs.forEach(function(tab){
        if(tab.getAttribute('data-learn-tab')===hashId)set.activate(tab);
      });
    });
  }
  if(learnTabsets.length)window.addEventListener('hashchange',activateLearnTabFromHash);

  /* Re-align direct links after fonts and injected components settle. */
  function alignInitialHash(){
    if(!window.location.hash)return;
    var hashId='';
    try{hashId=decodeURIComponent(window.location.hash.slice(1));}catch(error){hashId=window.location.hash.slice(1);}
    var target=document.getElementById(hashId);
    if(target)target.scrollIntoView({block:'start'});
  }
  function queueInitialHashAlignment(){window.setTimeout(alignInitialHash,60);}
  if(window.location.hash){
    if(document.readyState==='complete')queueInitialHashAlignment();
    else window.addEventListener('load',queueInitialHashAlignment,{once:true});
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(queueInitialHashAlignment);
  }

  var curriculumNav=document.querySelector('[data-curriculum-nav]');
  if(curriculumNav){
    var curriculumItems=[];
    curriculumNav.querySelectorAll('a[href^="#"]').forEach(function(link){
      var section=document.getElementById(link.getAttribute('href').slice(1));
      if(section)curriculumItems.push({link:link,section:section});
    });

    function setCurrentCurriculum(section){
      curriculumItems.forEach(function(item){
        var current=item.section===section;
        item.link.classList.toggle('is-active',current);
        if(current)item.link.setAttribute('aria-current','location');
        else item.link.removeAttribute('aria-current');
      });
    }
    function currentCurriculumByPosition(){
      var readingLine=window.innerHeight*.3;
      var current=curriculumItems.length?curriculumItems[0].section:null;
      curriculumItems.forEach(function(item){
        if(item.section.getBoundingClientRect().top<=readingLine)current=item.section;
      });
      return current;
    }

    curriculumItems.forEach(function(item){
      item.link.addEventListener('click',function(){setCurrentCurriculum(item.section);});
    });
    if(curriculumItems.length){
      var hashTarget=document.getElementById(window.location.hash.slice(1));
      var hashSection=null;
      curriculumItems.forEach(function(item){
        if(hashTarget&&(item.section===hashTarget||item.section.contains(hashTarget)))hashSection=item.section;
      });
      setCurrentCurriculum(hashSection||currentCurriculumByPosition());
    }

    if(curriculumItems.length&&'IntersectionObserver' in window){
      var curriculumObserver=new IntersectionObserver(function(entries){
        var intersecting=entries.filter(function(entry){return entry.isIntersecting;});
        if(intersecting.length){
          intersecting.sort(function(a,b){
            var line=window.innerHeight*.3;
            return Math.abs(a.boundingClientRect.top-line)-Math.abs(b.boundingClientRect.top-line);
          });
          setCurrentCurriculum(intersecting[0].target);
        }else{
          setCurrentCurriculum(currentCurriculumByPosition());
        }
      },{rootMargin:'-20% 0px -65% 0px',threshold:0});
      curriculumItems.forEach(function(item){curriculumObserver.observe(item.section);});
    }
  }

  /* ---------- Repertoire image parallax ---------- */
  var repertoireImages=[].slice.call(document.querySelectorAll('[data-repertoire-parallax]'));
  if(repertoireImages.length&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var repertoireTicking=false;
    function updateRepertoireImages(){
      var vh=window.innerHeight;
      repertoireImages.forEach(function(img){
        var rect=img.parentElement.getBoundingClientRect();
        if(rect.bottom>0&&rect.top<vh){
          var progress=((rect.top+(rect.height/2))-(vh/2))/vh;
          img.style.setProperty('--repertoire-shift',(progress*-34)+'px');
        }
      });
      repertoireTicking=false;
    }
    function requestRepertoireImages(){if(!repertoireTicking){window.requestAnimationFrame(updateRepertoireImages);repertoireTicking=true;}}
    window.addEventListener('scroll',requestRepertoireImages,{passive:true});
    window.addEventListener('resize',requestRepertoireImages,{passive:true});
    updateRepertoireImages();
  }

  /* ---------- About journey chapter progress ---------- */
  var aboutJourney=document.querySelector('[data-about-journey]');
  if(aboutJourney){
    var aboutChapters=[].slice.call(aboutJourney.querySelectorAll('[data-about-chapter]'));
    var aboutMarkers=[].slice.call(aboutJourney.querySelectorAll('[data-about-marker]'));
    var aboutProgress=aboutJourney.querySelector('[data-about-progress]');
    function setAboutChapter(index){
      aboutMarkers.forEach(function(marker,markerIndex){marker.classList.toggle('active',markerIndex===index);});
      aboutChapters.forEach(function(chapter,chapterIndex){chapter.classList.toggle('active',chapterIndex===index);});
      if(aboutProgress)aboutProgress.style.transform='scaleY('+((index+1)/aboutChapters.length)+')';
    }
    if('IntersectionObserver' in window){
      var aboutObserver=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){if(entry.isIntersecting)setAboutChapter(parseInt(entry.target.getAttribute('data-about-chapter'),10));});
      },{threshold:.46,rootMargin:'-12% 0px -12% 0px'});
      aboutChapters.forEach(function(chapter){aboutObserver.observe(chapter);});
    }
    aboutMarkers.forEach(function(marker){marker.addEventListener('click',function(){var chapter=aboutChapters[parseInt(marker.getAttribute('data-about-marker'),10)];if(chapter)chapter.scrollIntoView({behavior:'smooth',block:'center'});});});
    setAboutChapter(0);
  }

  /* ---------- render photo gallery (any element with data-gallery) ---------- */
  var galEl = document.querySelector('[data-gallery]');
  if(galEl){
    var html='';
    if(galEl.getAttribute('data-gallery-source')==='performances' && S.performanceImages){
      html=S.performanceImages.map(function(item,index){
        var f=typeof item==='string' ? item : item.src;
        var shape=typeof item==='string' ? 'standard' : (item.shape||'standard');
        return '<figure class="performance-shot performance-shot--'+shape+' reveal" data-lb="'+f+'" role="button" tabindex="0" aria-label="Open performance photograph" style="--gallery-delay:'+(index%6)*70+'ms">'
          +'<img loading="lazy" src="'+f+'" alt="Sivaprasad NN in performance">'
          +'<span class="performance-shot__number">'+String(index+1).padStart(2,'0')+'</span>'
          +'<span class="performance-shot__view">View</span></figure>';
      }).join('');
    } else {
      var n = S.galleryCount || 42;
      var limit = parseInt(galEl.getAttribute('data-limit')) || n;
      for(var i=1;i<=Math.min(limit,n);i++){
        var f='assets/photos/gallery/perf-'+String(i).padStart(2,'0')+'.jpg';
        html+='<figure data-lb="'+f+'" role="button" tabindex="0" aria-label="Open performance photograph"><img loading="lazy" src="'+f+'" alt="Sivaprasad NN in performance"></figure>';
      }
    }
    galEl.innerHTML=html;
    galEl.querySelectorAll('.reveal').forEach(reveal);

    /* Preserve every performance photograph's original aspect ratio while
       keeping the editorial grid aligned to a shared row rhythm. */
    if(galEl.getAttribute('data-gallery-source')==='performances'){
      var galleryResizeTimer;
      function sizePerformanceGallery(){
        var styles=window.getComputedStyle(galEl);
        var row=parseFloat(styles.gridAutoRows);
        var gap=parseFloat(styles.rowGap);
        galEl.querySelectorAll('.performance-shot').forEach(function(figure){
          var img=figure.querySelector('img');
          if(!img.naturalWidth)return;
          var naturalHeight=figure.offsetWidth*(img.naturalHeight/img.naturalWidth);
          figure.style.gridRowEnd='span '+Math.max(1,Math.round((naturalHeight+gap)/(row+gap)));
          figure.style.aspectRatio='auto';
        });
      }
      galEl.querySelectorAll('img').forEach(function(img){
        if(img.complete)sizePerformanceGallery();
        else img.addEventListener('load',sizePerformanceGallery,{once:true});
      });
      window.addEventListener('resize',function(){
        window.clearTimeout(galleryResizeTimer);
        galleryResizeTimer=window.setTimeout(sizePerformanceGallery,120);
      });
    }
  }

  /* ---------- render press wall (data-press) ---------- */
  var prEl=document.querySelector('[data-press]');
  if(prEl){
    var pn=S.pressCount||18, ph='';
    for(var p=1;p<=pn;p++){
      var pf='assets/press/clip-'+String(p).padStart(2,'0')+'.jpg';
      ph+='<figure class="press-clipping" data-collection="'+Math.ceil(p/6)+'" data-lb="'+pf+'" role="button" tabindex="0" aria-label="Open press clipping '+p+'"><img loading="lazy" src="'+pf+'" alt="Press coverage of Sivaprasad NN"><span>'+String(p).padStart(2,'0')+'</span><b>Read</b></figure>';
    }
    prEl.innerHTML=ph;

    var pressFilters=document.querySelector('[data-press-filters]');
    var pressCount=document.querySelector('[data-press-result-count]');
    if(pressFilters){
      pressFilters.addEventListener('click',function(e){
        var button=e.target.closest('[data-press-filter]');
        if(!button)return;
        var filter=button.getAttribute('data-press-filter');
        pressFilters.querySelectorAll('[data-press-filter]').forEach(function(item){item.classList.toggle('active',item===button);});
        var visible=0;
        prEl.querySelectorAll('.press-clipping').forEach(function(figure){
          var show=filter==='all'||figure.getAttribute('data-collection')===filter;
          figure.classList.toggle('is-hidden',!show);
          if(show)visible++;
        });
        if(pressCount)pressCount.textContent=visible+' '+(visible===1?'item':'items');
      });
    }
  }

  /* ---------- interactive press quote reader ---------- */
  var pressQuoteReader=document.querySelector('[data-press-quotes]');
  if(pressQuoteReader){
    var pressQuotes=S.quotes||[];
    var pressQuoteStage=pressQuoteReader.querySelector('[data-press-quote-stage]');
    var pressQuoteCount=pressQuoteReader.querySelector('[data-press-quote-count]');
    var pressQuoteSources=document.querySelector('[data-press-quote-sources]');
    var pressQuoteIndex=0;
    function renderPressQuote(nextIndex){
      if(!pressQuotes.length)return;
      pressQuoteIndex=(nextIndex+pressQuotes.length)%pressQuotes.length;
      pressQuoteStage.classList.add('changing');
      window.setTimeout(function(){
        var quote=pressQuotes[pressQuoteIndex];
        pressQuoteStage.innerHTML='<blockquote>'+quote.q+'</blockquote><cite>'+quote.by+'</cite>';
        pressQuoteCount.textContent=String(pressQuoteIndex+1).padStart(2,'0')+' / '+String(pressQuotes.length).padStart(2,'0');
        if(pressQuoteSources)pressQuoteSources.querySelectorAll('button').forEach(function(button,index){button.classList.toggle('active',index===pressQuoteIndex);});
        pressQuoteStage.classList.remove('changing');
      },160);
    }
    if(pressQuoteSources){
      pressQuoteSources.innerHTML=pressQuotes.map(function(quote,index){return '<button type="button" data-quote-index="'+index+'">'+quote.by+'</button>';}).join('');
      pressQuoteSources.addEventListener('click',function(e){var button=e.target.closest('[data-quote-index]');if(button)renderPressQuote(parseInt(button.getAttribute('data-quote-index'),10));});
    }
    pressQuoteReader.querySelector('[data-press-quote-prev]').addEventListener('click',function(){renderPressQuote(pressQuoteIndex-1);});
    pressQuoteReader.querySelector('[data-press-quote-next]').addEventListener('click',function(){renderPressQuote(pressQuoteIndex+1);});
    renderPressQuote(0);
  }

  /* ---------- press honours without date-led presentation ---------- */
  var pressHonours=document.querySelector('[data-press-honours]');
  if(pressHonours){
    pressHonours.innerHTML=(S.awards||[]).map(function(item,index){
      return '<article><span>'+String(index+1).padStart(2,'0')+'</span><p>'+item.ti+'</p></article>';
    }).join('');
  }

  /* ---------- render videos (data-videos, optional data-group) ---------- */
  document.querySelectorAll('[data-videos]').forEach(function(box){
    var group=box.getAttribute('data-group');
    var vids=(S.videos||[]).filter(function(v){return !group||v.group===group;});
    box.innerHTML=vids.map(function(v){
      return '<div><div class="video video-thumb" data-yt="'+v.id+'" role="button" tabindex="0" aria-label="Play video">'
        +'<img loading="lazy" src="https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg" alt="'+v.title+'"></div>'
        +'<div class="vcaption">'+v.title+'</div></div>';
    }).join('');
  });

  /* ---------- combined YouTube + local music library ---------- */
  var musicLibrary=document.querySelector('[data-music-library]');
  var musicTabs=document.querySelector('[data-music-tabs]');
  if(musicLibrary&&musicTabs){
    var youtubeItems=(S.videos||[]).map(function(v){
      return {type:'youtube',id:v.id,title:v.title,group:v.group};
    });
    var localItems=(S.localVideos||[]).map(function(v){
      return {type:'local',src:v.src,title:v.title,group:v.group};
    });
    var musicItems=youtubeItems.concat(localItems);

    function musicGroupLabel(group){
      return group==='dance' ? 'Dance' : group==='fusion' ? 'Fusion' : group==='conversations' ? 'Conversations & Interviews' : 'Carnatic';
    }
    function renderMusicLibrary(group){
      var items=musicItems.filter(function(v){return group==='all'||v.group===group;});
      musicLibrary.innerHTML=items.map(function(v,index){
        var media=v.type==='youtube'
          ? '<div class="music-card__media video video-thumb" data-yt="'+v.id+'" role="button" tabindex="0" aria-label="Play video"><img loading="lazy" src="https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg" alt="'+v.title+'"><span class="music-card__play" aria-hidden="true">▶</span></div>'
          : '<div class="music-card__media"><video controls preload="metadata" playsinline src="'+v.src+'" aria-label="'+v.title+'"></video></div>';
        return '<article class="music-card" style="--music-delay:'+(index%6)*55+'ms">'+media
          +'<div class="music-card__body"><span>'+musicGroupLabel(v.group)+'</span><h3>'+v.title+'</h3></div></article>';
      }).join('');
      window.requestAnimationFrame(function(){
        musicLibrary.querySelectorAll('.music-card').forEach(function(card){card.classList.add('in');});
      });
    }
    musicTabs.addEventListener('click',function(e){
      var button=e.target.closest('[data-music-filter]');
      if(!button)return;
      musicTabs.querySelectorAll('[data-music-filter]').forEach(function(item){
        var active=item===button;
        item.classList.toggle('active',active);
        item.setAttribute('aria-selected',String(active));
      });
      renderMusicLibrary(button.getAttribute('data-music-filter'));
    });
    renderMusicLibrary('all');
  }
  // Click a video thumbnail to play it. YouTube cannot reliably embed from a
  // file:// preview because that protocol does not send a valid web referrer.
  function playVideoThumbnail(t){
    var id=t.getAttribute('data-yt');
    if(window.location.protocol==='file:'){
      window.open('https://www.youtube.com/watch?v='+encodeURIComponent(id),'_blank','noopener,noreferrer');
      return;
    }
    t.classList.remove('video-thumb');
    t.removeAttribute('role');
    t.removeAttribute('tabindex');
    t.removeAttribute('aria-label');
    t.innerHTML='<iframe title="YouTube video player" src="https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0&playsinline=1"'
      +' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"'
      +' referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
  }
  document.addEventListener('click',function(e){
    var t=e.target.closest('.video-thumb'); if(!t)return;
    playVideoThumbnail(t);
  });
  document.addEventListener('keydown',function(e){
    var t=e.target.closest('.video-thumb');
    if(!t||(e.key!=='Enter'&&e.key!==' '))return;
    e.preventDefault();
    playVideoThumbnail(t);
  });

  /* ---------- local performance video carousel ---------- */
  document.querySelectorAll('[data-video-carousel]').forEach(function(carousel){
    var track=carousel.querySelector('.video-carousel__track');
    var slides=[];
    var prev=carousel.querySelector('.video-carousel__arrow--prev');
    var next=carousel.querySelector('.video-carousel__arrow--next');
    var index=0;
    var homeCarousel=carousel.hasAttribute('data-home-video-carousel');
    var homeTabs=document.querySelector('[data-home-video-tabs]');
    var homeItems=(S.videos||[]).map(function(v){
      return {type:'youtube',id:v.id,title:v.title,group:v.group};
    }).concat((S.localVideos||[]).map(function(v){
      return {type:'local',src:v.src,title:v.title,group:v.group};
    }));

    function carouselGroupLabel(group){
      return group==='dance' ? 'Dance' : group==='fusion' ? 'Fusion' : group==='conversations' ? 'Conversations & Interviews' : 'Carnatic';
    }
    function renderHomeCarousel(group){
      var items=homeItems.filter(function(item){return group==='all'||item.group===group;});
      track.innerHTML=items.map(function(item){
        var media=item.type==='youtube'
          ? '<div class="video video-thumb vid-card" data-yt="'+item.id+'" role="button" tabindex="0" aria-label="Play video"><img loading="lazy" src="https://i.ytimg.com/vi/'+item.id+'/hqdefault.jpg" alt="'+item.title+'"><span class="home-video-card__play" aria-hidden="true">▶</span></div>'
          : '<video class="video vid-card" src="'+item.src+'" controls preload="metadata" playsinline aria-label="'+item.title+'"></video>';
        return '<article class="video-carousel__slide home-video-card" data-video-group="'+item.group+'">'+media
          +'<div class="home-video-card__body"><p class="vcaption">'+item.title+'</p></div></article>';
      }).join('');
      slides=[].slice.call(carousel.querySelectorAll('.video-carousel__slide'));
      index=0;
      update();
    }

    function visibleSlides(){return window.matchMedia('(max-width:700px)').matches ? 1 : 2;}
    function update(){
      var max=Math.max(0,slides.length-visibleSlides());
      index=Math.max(0,Math.min(index,max));
      var first=slides[0];
      if(first){
        var gap=parseFloat(window.getComputedStyle(track).gap)||0;
        track.style.transform='translate3d(-'+(index*(first.getBoundingClientRect().width+gap))+'px,0,0)';
      }
      prev.disabled=index===0;
      next.disabled=index===max;
    }
    function move(direction){
      carousel.querySelectorAll('video').forEach(function(video){video.pause();});
      carousel.querySelectorAll('[data-yt] iframe').forEach(function(frame){
        var holder=frame.closest('[data-yt]');
        var id=holder.getAttribute('data-yt');
        var caption=holder.closest('.video-carousel__slide').querySelector('.vcaption').textContent;
        holder.classList.add('video-thumb');
        holder.setAttribute('role','button');
        holder.setAttribute('tabindex','0');
        holder.setAttribute('aria-label','Play video');
        holder.innerHTML='<img loading="lazy" src="https://i.ytimg.com/vi/'+id+'/hqdefault.jpg" alt="'+caption+'">'
          +(homeCarousel?'<span class="home-video-card__play" aria-hidden="true">▶</span>':'');
      });
      index+=direction;
      update();
    }
    prev.addEventListener('click',function(){move(-1);});
    next.addEventListener('click',function(){move(1);});
    if(homeCarousel&&homeTabs){
      homeTabs.addEventListener('click',function(e){
        var button=e.target.closest('[data-home-video-filter]');
        if(!button)return;
        homeTabs.querySelectorAll('[data-home-video-filter]').forEach(function(tab){
          var active=tab===button;
          tab.classList.toggle('active',active);
          tab.setAttribute('aria-selected',String(active));
        });
        carousel.querySelectorAll('video').forEach(function(video){video.pause();});
        renderHomeCarousel(button.getAttribute('data-home-video-filter'));
      });
    }
    carousel.addEventListener('keydown',function(e){
      if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}
      if(e.key==='ArrowRight'){e.preventDefault();move(1);}
    });
    window.addEventListener('resize',update,{passive:true});
    if(homeCarousel)renderHomeCarousel('all');
    else {
      slides=[].slice.call(carousel.querySelectorAll('.video-carousel__slide'));
      update();
    }
  });

  /* ---------- render awards (data-awards) ---------- */
  var awEl=document.querySelector('[data-awards]');
  if(awEl){ awEl.innerHTML=(S.awards||[]).map(function(a){
    return '<li><span class="yr">'+a.yr+'</span><span class="ti">'+a.ti+'</span></li>';
  }).join(''); }

  /* ---------- render quotes (data-quotes grid, legacy) ---------- */
  var qEl=document.querySelector('[data-quotes]');
  if(qEl){ qEl.innerHTML=(S.quotes||[]).map(function(c){
    return '<div class="quote reveal"><p>&ldquo;'+c.q+'&rdquo;</p><cite>'+c.by+'</cite></div>';
  }).join(''); qEl.querySelectorAll('.reveal').forEach(reveal); }

  /* ---------- render quotes marquee ---------- */
  var mqEl=document.querySelector('[data-quotes-marquee]');
  if(mqEl){
    var quotes=S.quotes||[];
    function buildCard(c){
      return '<figure class="tcard">'
        +'<blockquote class="tcard__text">&ldquo;'+c.q+'&rdquo;</blockquote>'
        +'<figcaption class="tcard__source">'+c.by+'</figcaption>'
        +'</figure>';
    }
    var set='';
    quotes.forEach(function(c){ set+=buildCard(c); });
    mqEl.innerHTML=set;
  }

  /* ---------- lightbox ---------- */
  var imgs=[], idx=0, lastLightboxTrigger=null;
  function closeLB(){
    var d=document.getElementById('lb');
    if(!d||!d.classList.contains('open'))return;
    d.classList.remove('open');
    if(lastLightboxTrigger&&document.contains(lastLightboxTrigger))lastLightboxTrigger.focus({preventScroll:true});
  }
  function buildLB(){
    if(document.getElementById('lb'))return;
    var d=document.createElement('div'); d.id='lb'; d.className='lb';
    d.setAttribute('role','dialog');
    d.setAttribute('aria-modal','true');
    d.setAttribute('aria-label','Image viewer');
    d.innerHTML='<button class="x" type="button" aria-label="Close image viewer">&times;</button><button class="nav-a prev" type="button" aria-label="Previous image">&#8249;</button><img alt=""><button class="nav-a next" type="button" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(d);
    d.querySelector('.x').onclick=closeLB;
    d.onclick=function(e){if(e.target===d)closeLB();};
    d.querySelector('.prev').onclick=function(e){e.stopPropagation();idx=(idx-1+imgs.length)%imgs.length;show();};
    d.querySelector('.next').onclick=function(e){e.stopPropagation();idx=(idx+1)%imgs.length;show();};
    document.addEventListener('keydown',function(e){
      if(!d.classList.contains('open'))return;
      if(e.key==='Escape')closeLB();
      if(e.key==='ArrowLeft')d.querySelector('.prev').click();
      if(e.key==='ArrowRight')d.querySelector('.next').click();
      if(e.key==='Tab'){
        var controls=[].slice.call(d.querySelectorAll('button:not([hidden])'));
        var first=controls[0], last=controls[controls.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      }
    });
  }
  function show(){
    var d=document.getElementById('lb');
    var image=d.querySelector('img');
    image.src=imgs[idx];
    image.alt='Gallery image '+(idx+1)+' of '+imgs.length;
    d.querySelector('.prev').hidden=imgs.length<2;
    d.querySelector('.next').hidden=imgs.length<2;
  }
  function openLB(fig){
    buildLB();
    var scope=fig.closest('[data-gallery],[data-press]')||document;
    imgs=[].filter.call(scope.querySelectorAll('[data-lb]'),function(f){return !f.classList.contains('is-hidden');}).map(function(f){return f.getAttribute('data-lb');});
    idx=imgs.indexOf(fig.getAttribute('data-lb'));
    if(idx<0)idx=0;
    lastLightboxTrigger=fig;
    show();
    document.getElementById('lb').classList.add('open');
    document.getElementById('lb').querySelector('.x').focus({preventScroll:true});
  }
  document.addEventListener('click',function(e){
    var fig=e.target.closest('[data-lb]'); if(!fig)return;
    openLB(fig);
  });
  document.addEventListener('keydown',function(e){
    var fig=e.target.closest('[data-lb]');
    if(!fig||(e.key!=='Enter'&&e.key!==' '))return;
    e.preventDefault();
    openLB(fig);
  });

  /* ---------- CTA banner: staggered scroll reveal ---------- */
  var ctaAnims = document.querySelectorAll('.cta-anim');
  if(ctaAnims.length){
    var ctaObs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;
        var items = document.querySelectorAll('.cta-anim');
        var delay = 0;
        items.forEach(function(item){
          if(!item.classList.contains('in')){
            setTimeout(function(){ item.classList.add('in'); }, delay);
            delay += 150;
          }
        });
        ctaObs.unobserve(entry.target);
      });
    },{threshold:.2});
    ctaObs.observe(ctaAnims[0]);
  }

  /* ---------- CTA banner: parallax on background image ---------- */
  var ctaBg = document.querySelector('.cta-bg img');
  if(ctaBg){
    var ctaSec = document.querySelector('.section-cta');
    window.addEventListener('scroll',function(){
      var rect = ctaSec.getBoundingClientRect();
      var vh = window.innerHeight;
      if(rect.bottom < 0 || rect.top > vh) return;
      var progress = (vh - rect.top) / (vh + rect.height);
      ctaBg.style.transform = 'scale(1.08) translateY(' + ((progress - 0.5) * 30) + 'px)';
    },{passive:true});
  }

  /* ---------- dedicated performance enquiry form ---------- */
  var performanceForm=document.querySelector('[data-performance-enquiry-form]');
  if(performanceForm){
    var performanceRehearsalCount=performanceForm.querySelector('#performance-rehearsal-count');
    var performanceRehearsalsUnknown=performanceForm.querySelector('[data-rehearsals-unknown]');
    var performanceGallery=document.querySelector('.performance-gallery');
    var performanceAnchorObserver=null;
    var performanceAnchorTimers=[];

    function alignPerformanceEnquiry(){
      performanceForm.closest('#performance-enquiry').scrollIntoView({block:'start'});
    }

    function keepPerformanceEnquiryAligned(){
      if(performanceAnchorObserver)performanceAnchorObserver.disconnect();
      performanceAnchorTimers.forEach(function(timer){window.clearTimeout(timer);});
      performanceAnchorTimers=[];
      alignPerformanceEnquiry();

      if(performanceGallery&&'ResizeObserver' in window){
        performanceAnchorObserver=new ResizeObserver(alignPerformanceEnquiry);
        performanceAnchorObserver.observe(performanceGallery);
      }

      [180,480,900,1500,2400,3400].forEach(function(delay){
        performanceAnchorTimers.push(window.setTimeout(alignPerformanceEnquiry,delay));
      });
      performanceAnchorTimers.push(window.setTimeout(function(){
        if(performanceAnchorObserver)performanceAnchorObserver.disconnect();
        performanceAnchorObserver=null;
      },3600));
    }

    document.querySelectorAll('a[href="#performance-enquiry"]').forEach(function(link){
      link.addEventListener('click',function(){window.setTimeout(keepPerformanceEnquiryAligned,0);});
    });
    if(window.location.hash==='#performance-enquiry')window.setTimeout(keepPerformanceEnquiryAligned,0);

    function syncPerformanceRehearsals(){
      if(!performanceRehearsalCount||!performanceRehearsalsUnknown)return;
      var unknown=performanceRehearsalsUnknown.checked;
      performanceRehearsalCount.disabled=unknown;
      performanceRehearsalCount.setAttribute('aria-disabled',String(unknown));
      if(unknown)performanceRehearsalCount.value='';
    }

    if(performanceRehearsalsUnknown){
      performanceRehearsalsUnknown.addEventListener('change',syncPerformanceRehearsals);
      syncPerformanceRehearsals();
    }
  }

  /* ---------- dedicated ensemble enquiry form ---------- */
  var ensembleForm=document.querySelector('[data-ensemble-form]');
  if(ensembleForm){
    var ensembleDate=ensembleForm.querySelector('#ensemble-date');
    var ensembleDateUnconfirmed=ensembleForm.querySelector('[data-date-unconfirmed]');
    var artistGroup=ensembleForm.querySelector('[data-artist-group]');
    var artistOptions=artistGroup?[].slice.call(artistGroup.querySelectorAll('input[type="checkbox"]')):[];
    var artistError=ensembleForm.querySelector('#ensemble-artists-error');

    function syncEnsembleDate(){
      if(!ensembleDate||!ensembleDateUnconfirmed)return;
      var unconfirmed=ensembleDateUnconfirmed.checked;
      ensembleDate.disabled=unconfirmed;
      ensembleDate.required=!unconfirmed;
      ensembleDate.setAttribute('aria-required',String(!unconfirmed));
      if(unconfirmed)ensembleDate.value='';
    }

    function syncArtistSelection(showError){
      if(!artistOptions.length)return true;
      var selected=artistOptions.some(function(option){return option.checked;});
      artistOptions[0].setCustomValidity(selected?'':'Select at least one artist or choose not sure.');
      if(artistGroup){
        artistGroup.classList.toggle('has-error',Boolean(showError&&!selected));
        artistGroup.setAttribute('aria-invalid',String(Boolean(showError&&!selected)));
      }
      if(artistError)artistError.hidden=!showError||selected;
      return selected;
    }

    if(ensembleDateUnconfirmed){
      ensembleDateUnconfirmed.addEventListener('change',syncEnsembleDate);
      syncEnsembleDate();
    }
    artistOptions.forEach(function(option){
      option.addEventListener('change',function(){syncArtistSelection(false);});
    });
    if(artistOptions.length){
      artistOptions[0].addEventListener('invalid',function(){syncArtistSelection(true);});
      syncArtistSelection(false);
    }
  }

  /* ---------- contact form tabs ---------- */
  document.querySelectorAll('.contact-tabs').forEach(function(tabs){
    function activateContactTab(target,updateUrl){
      var selected=tabs.querySelector('.tab[data-tab="'+target+'"]');
      if(!selected)return;
      tabs.querySelectorAll('.tab').forEach(function(x){x.classList.remove('active');x.setAttribute('aria-selected','false');});
      selected.classList.add('active');
      selected.setAttribute('aria-selected','true');
      document.querySelectorAll('.tabpane').forEach(function(pane){
        pane.style.display = pane.getAttribute('data-pane')===target ? 'block':'none';
      });
      var subj=document.querySelector('input[name="_subject"]');
      if(subj) subj.value='Website enquiry: '+selected.textContent.trim();
      if(updateUrl && window.history && window.history.replaceState){
        var url=new URL(window.location.href);
        url.searchParams.set('intent',target);
        window.history.replaceState({},'',url.pathname+url.search+url.hash);
      }
    }
    tabs.addEventListener('click',function(e){
      var t=e.target.closest('.tab'); if(!t)return;
      activateContactTab(t.getAttribute('data-tab'),true);
    });
    var initial=new URLSearchParams(window.location.search).get('intent');
    if(['perform','classes','workshop','ensemble'].indexOf(initial)!==-1)activateContactTab(initial,false);
  });

})();
