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

  /* ---------- Learn page scroll storytelling ---------- */
  var learnStatement=document.querySelector('[data-scroll-text]');
  var learnProcess=document.querySelector('[data-learn-process]');
  if(learnStatement||learnProcess){
    var learnWords=[];
    if(learnStatement){
      var statementText=learnStatement.textContent.trim().split(/\s+/);
      learnStatement.textContent='';
      statementText.forEach(function(word,index){
        var span=document.createElement('span');
        span.className='scroll-word';
        span.textContent=word+(index<statementText.length-1?' ':'');
        learnStatement.appendChild(span);
        learnWords.push(span);
      });
    }
    var processLine=learnProcess&&learnProcess.querySelector('[data-process-line]');
    var processCards=learnProcess?[].slice.call(learnProcess.querySelectorAll('[data-process-card]')):[];
    var processMarkers=learnProcess?[].slice.call(learnProcess.querySelectorAll('[data-process-marker]')):[];
    var learnTicking=false;
    function updateLearnStory(){
      var vh=window.innerHeight;
      if(learnStatement){
        var textRect=learnStatement.getBoundingClientRect();
        var textTravel=textRect.height+(vh*.48);
        var textProgress=Math.max(0,Math.min(1,((vh*.8)-textRect.top)/textTravel));
        var activeWords=Math.ceil(textProgress*learnWords.length);
        learnWords.forEach(function(word,index){word.classList.toggle('active',index<activeWords);});
      }
      if(learnProcess&&window.innerWidth>620){
        var processRect=learnProcess.getBoundingClientRect();
        var processTravel=Math.max(1,processRect.height-vh);
        var processProgress=Math.max(0,Math.min(1,-processRect.top/processTravel));
        var activeStep=Math.min(2,Math.floor(processProgress*3));
        if(processLine)processLine.style.transform='scaleY('+processProgress+')';
        processCards.forEach(function(card,index){card.classList.toggle('active',index===activeStep);});
        processMarkers.forEach(function(marker,index){marker.classList.toggle('active',index<=activeStep);});
      }
      learnTicking=false;
    }
    function requestLearnStory(){
      if(!learnTicking){window.requestAnimationFrame(updateLearnStory);learnTicking=true;}
    }
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      learnWords.forEach(function(word){word.classList.add('active');});
    } else {
      window.addEventListener('scroll',requestLearnStory,{passive:true});
      window.addEventListener('resize',requestLearnStory,{passive:true});
      updateLearnStory();
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
        return '<figure class="performance-shot performance-shot--'+shape+' reveal" data-lb="'+f+'" style="--gallery-delay:'+(index%6)*70+'ms">'
          +'<img loading="lazy" src="'+f+'" alt="Sivaprasad NN in performance">'
          +'<span class="performance-shot__number">'+String(index+1).padStart(2,'0')+'</span>'
          +'<span class="performance-shot__view">View</span></figure>';
      }).join('');
    } else {
      var n = S.galleryCount || 42;
      var limit = parseInt(galEl.getAttribute('data-limit')) || n;
      for(var i=1;i<=Math.min(limit,n);i++){
        var f='assets/photos/gallery/perf-'+String(i).padStart(2,'0')+'.jpg';
        html+='<figure data-lb="'+f+'"><img loading="lazy" src="'+f+'" alt="Sivaprasad NN in performance"></figure>';
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
      ph+='<figure class="press-clipping" data-collection="'+Math.ceil(p/6)+'" data-lb="'+pf+'"><img loading="lazy" src="'+pf+'" alt="Press coverage of Sivaprasad NN"><span>'+String(p).padStart(2,'0')+'</span><b>Read</b></figure>';
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
      return '<div><div class="video video-thumb" data-yt="'+v.id+'">'
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
      return group==='dance' ? 'Dance' : group==='fusion' ? 'Fusion' : 'Carnatic';
    }
    function renderMusicLibrary(group){
      var items=musicItems.filter(function(v){return group==='all'||v.group===group;});
      musicLibrary.innerHTML=items.map(function(v,index){
        var media=v.type==='youtube'
          ? '<div class="music-card__media video video-thumb" data-yt="'+v.id+'"><img loading="lazy" src="https://i.ytimg.com/vi/'+v.id+'/hqdefault.jpg" alt="'+v.title+'"><span class="music-card__play" aria-hidden="true">▶</span></div>'
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
  // click a video thumb -> swap to iframe
  document.addEventListener('click',function(e){
    var t=e.target.closest('.video-thumb'); if(!t)return;
    var id=t.getAttribute('data-yt');
    t.classList.remove('video-thumb');
    t.innerHTML='<iframe src="https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  });

  /* ---------- local performance video carousel ---------- */
  document.querySelectorAll('[data-video-carousel]').forEach(function(carousel){
    var track=carousel.querySelector('.video-carousel__track');
    var slides=[].slice.call(carousel.querySelectorAll('.video-carousel__slide'));
    var prev=carousel.querySelector('.video-carousel__arrow--prev');
    var next=carousel.querySelector('.video-carousel__arrow--next');
    var index=0;

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
        holder.innerHTML='<img loading="lazy" src="https://i.ytimg.com/vi/'+id+'/hqdefault.jpg" alt="'+caption+'">';
      });
      index+=direction;
      update();
    }
    prev.addEventListener('click',function(){move(-1);});
    next.addEventListener('click',function(){move(1);});
    carousel.addEventListener('keydown',function(e){
      if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}
      if(e.key==='ArrowRight'){e.preventDefault();move(1);}
    });
    window.addEventListener('resize',update,{passive:true});
    update();
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
      var initials=c.by.split(' ').map(function(w){return w[0];}).join('').substring(0,2).toUpperCase();
      return '<div class="tcard">'
        +'<div class="tcard__head">'
        +'<span class="tcard__avatar">'+initials+'</span>'
        +'<span class="tcard__source">'+c.by+'</span>'
        +'</div>'
        +'<p class="tcard__text">&ldquo;'+c.q+'&rdquo;</p>'
        +'</div>';
    }
    var set='';
    for(var r=0;r<4;r++){
      quotes.forEach(function(c){ set+=buildCard(c); });
    }
    mqEl.innerHTML=set;
  }

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

  /* ---------- spotlight card glow tracking ---------- */
  document.querySelectorAll('.spotlight-card').forEach(function(card){
    card.addEventListener('pointermove',function(e){
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      card.style.setProperty('--glow-x', x + 'px');
      card.style.setProperty('--glow-y', y + 'px');
    });
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
