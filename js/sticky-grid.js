/* ============================================================
   Sticky Grid Scroll — Sivaprasad NN
   Adapted from: https://github.com/theoplawinski/codrops-sticky-grid-scroll
   by Theo Plawinski / Codrops
   ============================================================ */
(function () {
    'use strict';

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    class StickyGridScroll {
        constructor() {
            this.getElements();
            if (!this.block) return;
            this.initContent();
            this.groupItemsByColumn();
            this.addParallaxOnScroll();
            this.animateTitleOnScroll();
            this.animateGridOnScroll();
        }

        getElements() {
            this.block = document.querySelector('.sgs-block--main');
            if (!this.block) return;
            this.wrapper  = this.block.querySelector('.sgs-wrapper');
            this.content  = this.block.querySelector('.sgs-content');
            this.title    = this.block.querySelector('.sgs-content__title');
            this.description = this.block.querySelector('.sgs-content__description');
            this.button   = this.block.querySelector('.sgs-content__button');
            this.grid     = this.block.querySelector('.sgs-gallery__grid');
            this.items    = this.block.querySelectorAll('.sgs-gallery__item');
        }

        initContent() {
            if (this.description && this.button) {
                gsap.set([this.description, this.button], { opacity: 0, pointerEvents: 'none' });
            }
            if (this.content && this.title) {
                const dy = (this.content.offsetHeight - this.title.offsetHeight) / 2;
                this.titleOffsetY = (dy / this.content.offsetHeight) * 100;
                gsap.set(this.title, { yPercent: this.titleOffsetY });
            }
        }

        groupItemsByColumn() {
            this.numColumns = 3;
            this.columns = Array.from({ length: this.numColumns }, () => []);
            this.items.forEach((item, index) => {
                this.columns[index % this.numColumns].push(item);
            });
        }

        addParallaxOnScroll() {
            gsap.from(this.wrapper, {
                yPercent: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: this.block,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true,
                },
            });
        }

        animateTitleOnScroll() {
            gsap.from(this.title, {
                opacity: 0,
                duration: 0.7,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: this.block,
                    start: 'top 57%',
                    toggleActions: 'play none none reset',
                },
            });
        }

        gridRevealTimeline() {
            const tl = gsap.timeline();
            const wh = window.innerHeight;
            const dy = wh - (wh - this.grid.offsetHeight) / 2;

            this.columns.forEach((column, colIndex) => {
                const fromTop = colIndex % 2 === 0;
                tl.from(
                    column,
                    {
                        y: dy * (fromTop ? -1 : 1),
                        stagger: {
                            each: 0.06,
                            from: fromTop ? 'end' : 'start',
                        },
                        ease: 'power1.inOut',
                    },
                    'grid-reveal'
                );
            });

            return tl;
        }

        gridZoomTimeline() {
            const tl = gsap.timeline({ defaults: { duration: 1, ease: 'power3.inOut' } });

            tl.to(this.grid, { scale: 2.05 });
            tl.to(this.columns[0], { xPercent: -40 }, '<');
            tl.to(this.columns[2], { xPercent: 40 }, '<');
            tl.to(
                this.columns[1],
                {
                    yPercent: (index) =>
                        (index < Math.floor(this.columns[1].length / 2) ? -1 : 1) * 40,
                    duration: 0.5,
                    ease: 'power1.inOut',
                },
                '-=0.5'
            );

            return tl;
        }

        toggleContent(isVisible) {
            if (!this.title || !this.description || !this.button) return;

            gsap.timeline({ defaults: { overwrite: true } })
                .to(this.title, {
                    yPercent: isVisible ? 0 : this.titleOffsetY,
                    duration: 0.7,
                    ease: 'power2.inOut',
                })
                .to(
                    [this.description, this.button],
                    {
                        opacity: isVisible ? 1 : 0,
                        duration: 0.4,
                        ease: 'power1.' + (isVisible ? 'inOut' : 'out'),
                        pointerEvents: isVisible ? 'all' : 'none',
                    },
                    isVisible ? '-=90%' : '<'
                );
        }

        animateGridOnScroll() {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: this.block,
                    start: 'top 25%',
                    end: 'bottom bottom',
                    scrub: true,
                },
            });

            timeline
                .add(this.gridRevealTimeline())
                .add(this.gridZoomTimeline(), '-=0.6')
                .add(() => this.toggleContent(timeline.scrollTrigger.direction === 1), '-=0.32');
        }
    }

    function initSmoothScrolling() {
        if (typeof Lenis === 'undefined') return;

        const lenis = new Lenis({
            lerp: 0.08,
            wheelMultiplier: 1.4,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    }

    function preloadSGSImages() {
        return new Promise((resolve) => {
            const images = document.querySelectorAll('.sgs-block img');
            const total  = images.length;
            let loaded   = 0;

            if (total === 0) { resolve(); return; }

            function onLoad() {
                loaded++;
                if (loaded === total) resolve();
            }

            images.forEach((img) => {
                if (img.complete && img.naturalHeight !== 0) {
                    onLoad();
                } else {
                    img.addEventListener('load',  onLoad);
                    img.addEventListener('error', onLoad);
                }
            });
        });
    }

    preloadSGSImages().then(() => {
        initSmoothScrolling();
        new StickyGridScroll();
    });
}());
