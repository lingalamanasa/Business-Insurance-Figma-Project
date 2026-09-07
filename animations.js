/**
 * Stackly — Animations Module
 * AOS + GSAP for all 5 pages
 * Loaded after AOS and GSAP CDN scripts
 */

'use strict';

/* ══════════════════════════════════════════════════════
   AOS INITIALIZATION
   ══════════════════════════════════════════════════════ */
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 750,
    easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    once: true,
    offset: 60,
    delay: 0
  });
}

/* ══════════════════════════════════════════════════════
   GSAP REGISTRATION & PRELOADER SYSTEM
   ══════════════════════════════════════════════════════ */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function initStacklyPreloader() {
  const pathname = window.location.pathname.toLowerCase();
  let pageTagline = 'STACKLY HOME';
  if (pathname.includes('about')) pageTagline = 'STACKLY ABOUT';
  else if (pathname.includes('services')) pageTagline = 'STACKLY SERVICES';
  else if (pathname.includes('blog')) pageTagline = 'STACKLY BLOG';
  else if (pathname.includes('contact')) pageTagline = 'STACKLY CONTACT';

  let preloader = document.getElementById('stackly-preloader');

  // If not statically in HTML, dynamically inject for seamless experience
  if (!preloader) {
    preloader = document.createElement('div');
    preloader.id = 'stackly-preloader';
    preloader.className = 'stackly-preloader';
    preloader.setAttribute('aria-hidden', 'false');
    preloader.innerHTML = `
      <div class="stackly-preloader__curtain stackly-preloader__curtain--top"></div>
      <div class="stackly-preloader__curtain stackly-preloader__curtain--bottom"></div>
      <div class="stackly-preloader__content">
        <div class="stackly-preloader__logo-wrap">
          <div class="stackly-preloader__icon-ring">
            <svg class="stackly-preloader__ring-svg" viewBox="0 0 100 100">
              <circle class="stackly-preloader__ring-bg" cx="50" cy="50" r="44"></circle>
              <circle class="stackly-preloader__ring-bar" id="preloader-ring-bar" cx="50" cy="50" r="44"></circle>
            </svg>
            <img src="assets/stackly-icon-white.webp" alt="Stackly" class="stackly-preloader__icon" />
          </div>
          <div class="stackly-preloader__brand">
            <span class="stackly-preloader__wordmark">STACKLY</span>
            <span class="stackly-preloader__tagline">${pageTagline}</span>
          </div>
        </div>
        <div class="stackly-preloader__progress-box">
          <div class="stackly-preloader__bar">
            <div class="stackly-preloader__fill" id="preloader-fill"></div>
          </div>
          <div class="stackly-preloader__counter">
            <span id="preloader-percent">0</span>%
          </div>
        </div>
      </div>
    `;
    document.body.insertBefore(preloader, document.body.firstChild);
  } else {
    const taglineEl = preloader.querySelector('.stackly-preloader__tagline');
    if (taglineEl && pageTagline) {
      taglineEl.textContent = pageTagline;
    }
  }

  const ringBar = document.getElementById('preloader-ring-bar') || preloader.querySelector('.stackly-preloader__ring-bar');
  const fill = document.getElementById('preloader-fill') || preloader.querySelector('.stackly-preloader__fill');
  const percentEl = document.getElementById('preloader-percent') || preloader.querySelector('#preloader-percent');

  const obj = { val: 0 };
  const totalLength = 276.46; // 2 * PI * 44

  if (typeof gsap !== 'undefined') {
    gsap.to(obj, {
      val: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        const rounded = Math.round(obj.val);
        if (percentEl) percentEl.textContent = rounded;
        if (fill) fill.style.width = rounded + '%';
        if (ringBar) {
          const offset = totalLength - (obj.val / 100) * totalLength;
          ringBar.style.strokeDashoffset = offset;
        }
      },
      onComplete: () => {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.classList.add('is-hidden');
          if (typeof AOS !== 'undefined') AOS.refresh();
        }, 750);
      }
    });
  } else {
    // Graceful fallback
    setTimeout(() => {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.classList.add('is-hidden'), 600);
    }, 900);
  }
}

/* ══════════════════════════════════════════════════════
   GSAP HERO ANIMATIONS (runs on every page that has .page-hero or .hero)
   ══════════════════════════════════════════════════════ */
function initHeroGSAP() {
  if (typeof gsap === 'undefined') return;

  // Home hero
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero__badge',       { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo('.hero__heading',     { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo('.hero__body',        { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .fromTo('.hero__buttons',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo('.hero__phone-mockup',{ opacity: 0, x: 60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 1 }, '-=0.8');
  }

  // Inner page heroes
  const pageHero = document.querySelector('.page-hero__inner');
  if (pageHero) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.page-hero__eyebrow',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
      .fromTo('.page-hero__heading',  { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo('.page-hero__sub',      { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .fromTo('.page-hero__actions',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
  }
}

/* ══════════════════════════════════════════════════════
   GSAP COUNTER ANIMATION
   ══════════════════════════════════════════════════════ */
function initCounterGSAP() {
  if (typeof gsap === 'undefined') return;

  // Home stats (from existing JS counters via IntersectionObserver)
  // GSAP counters for inner pages (.stat-counter-num)
  const counterEls = document.querySelectorAll('.stat-counter-num[data-target]');
  if (!counterEls.length) return;

  counterEls.forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            const v = Math.round(this.targets()[0].val);
            el.textContent = v.toLocaleString() + suffix;
          }
        });
      }
    });
  });
}

/* ══════════════════════════════════════════════════════
   GSAP PARALLAX FOR SPLIT SECTION IMAGES
   ══════════════════════════════════════════════════════ */
function initParallax() {
  if (typeof gsap === 'undefined') return;

  document.querySelectorAll('.split-section__img').forEach(img => {
    gsap.fromTo(img,
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.split-section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      }
    );
  });
}

/* ══════════════════════════════════════════════════════
   GSAP STAGGER FOR CARD GRIDS
   ══════════════════════════════════════════════════════ */
function initCardStagger() {
  if (typeof gsap === 'undefined') return;

  const grids = [
    { selector: '.services-grid', children: '.service-card' },
    { selector: '.blog-grid',     children: '.blog-card' },
    { selector: '.feature-grid',  children: '.feature-card' }
  ];

  grids.forEach(({ selector, children }) => {
    const grid = document.querySelector(selector);
    if (!grid) return;
    const cards = grid.querySelectorAll(children);
    if (!cards.length) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true
        }
      }
    );
  });
}

/* ══════════════════════════════════════════════════════
   GSAP HOVER MICRO-INTERACTION ON SERVICE CARDS
   ══════════════════════════════════════════════════════ */
function initCardHovers() {
  if (typeof gsap === 'undefined') return;

  document.querySelectorAll('.service-card').forEach(card => {
    const icon = card.querySelector('.service-card__icon');
    if (!icon) return;

    card.addEventListener('mouseenter', () => {
      gsap.to(icon, { scale: 1.1, rotate: -5, duration: 0.3, ease: 'back.out(2)' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
}

/* ══════════════════════════════════════════════════════
   GSAP CTA SECTION REVEAL
   ══════════════════════════════════════════════════════ */
function initCTAReveal() {
  if (typeof gsap === 'undefined') return;

  document.querySelectorAll('.cta-section').forEach(section => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        once: true
      }
    });

    tl.fromTo(section.querySelector('.cta-section__eyebrow'),
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0)
      .fromTo(section.querySelector('.cta-section__heading'),
        { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.15)
      .fromTo(section.querySelector('.cta-section__sub'),
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.3)
      .fromTo(section.querySelector('.cta-section__buttons'),
        { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.45);
  });
}

/* ══════════════════════════════════════════════════════
   GSAP PAGE TRANSITION (subtle fade between pages)
   ══════════════════════════════════════════════════════ */
function initPageTransition() {
  if (typeof gsap === 'undefined') return;

  // Fade in on load
  gsap.fromTo('body', { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power1.out' });

  // Fade out on internal link click
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only internal .html links
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
    if (!href.endsWith('.html') && !href.match(/^[a-zA-Z0-9_-]+\.html/)) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      gsap.to('body', {
        opacity: 0,
        duration: 0.3,
        ease: 'power1.in',
        onComplete: () => { window.location.href = href; }
      });
    });
  });
}

/* ══════════════════════════════════════════════════════
   GSAP FEATURED BLOG REVEAL
   ══════════════════════════════════════════════════════ */
function initFeaturedBlog() {
  if (typeof gsap === 'undefined') return;

  const featured = document.querySelector('.featured-blog');
  if (!featured) return;

  gsap.fromTo(featured.querySelector('.featured-blog__img-wrap'),
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.1,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: featured, start: 'top 75%', once: true }
    }
  );

  gsap.fromTo(featured.querySelector('.featured-blog__body'),
    { opacity: 0, x: 30 },
    {
      opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: featured, start: 'top 75%', once: true }
    }
  );
}

/* ══════════════════════════════════════════════════════
   GSAP CONTACT INFO STAGGER
   ══════════════════════════════════════════════════════ */
function initContactReveal() {
  if (typeof gsap === 'undefined') return;

  const items = document.querySelectorAll('.contact-info__item');
  if (!items.length) return;

  gsap.fromTo(items,
    { opacity: 0, x: -30 },
    {
      opacity: 1, x: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.contact-info', start: 'top 75%', once: true }
    }
  );
}

/* ══════════════════════════════════════════════════════
   GSAP STATS SECTION (home page yellow banner)
   ══════════════════════════════════════════════════════ */
function initStatsGSAP() {
  if (typeof gsap === 'undefined') return;

  const stats = document.querySelector('.stats');
  if (!stats) return;

  gsap.fromTo('.stats__item',
    { opacity: 0, y: 30 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: { trigger: stats, start: 'top 75%', once: true }
    }
  );
}

/* ══════════════════════════════════════════════════════
   GSAP MISSION/VISION CARDS
   ══════════════════════════════════════════════════════ */
function initMVCards() {
  if (typeof gsap === 'undefined') return;

  const grid = document.querySelector('.mv-grid');
  if (!grid) return;

  gsap.fromTo('.mv-card',
    { opacity: 0, scale: 0.95 },
    {
      opacity: 1, scale: 1,
      duration: 0.7,
      stagger: 0.2,
      ease: 'back.out(1.4)',
      scrollTrigger: { trigger: grid, start: 'top 75%', once: true }
    }
  );
}

/* ══════════════════════════════════════════════════════
   GSAP GRAVITY FORM ANIMATION
   Physically realistic gravitational drop, bounce, magnetic pull, and particles
   ══════════════════════════════════════════════════════ */
function initGravityFormAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const quoteSection = document.querySelector('.quote-section');
  const quoteForm = document.querySelector('.quote-form');
  if (!quoteSection || !quoteForm) return;

  const quoteFormWrap = document.querySelector('.quote-section__form-wrap');
  const quoteText = document.querySelector('.quote-section__text');

  // Prevent CSS animation conflicts by stripping default fade-right/fade-left classes
  if (quoteFormWrap) quoteFormWrap.classList.remove('animate-fade-right');
  if (quoteText) quoteText.classList.remove('animate-fade-left');

  // 1. Gravitational Entrance Timeline
  const gravityTL = gsap.timeline({
    scrollTrigger: {
      trigger: quoteSection,
      start: 'top 75%',
      once: true
    }
  });

  // Left text slides in smoothly
  if (quoteText) {
    gravityTL.fromTo(quoteText,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
      0
    );
  }

  // The yellow quote card drops down under heavy gravity with realistic physics bounce
  gravityTL.fromTo(quoteForm,
    { y: -160, opacity: 0, scaleY: 0.88, scaleX: 1.06 },
    {
      y: 0,
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      duration: 1.25,
      ease: 'bounce.out'
    },
    0.1
  );

  // Staggered drop-in of form children (title, each input group, submit button)
  const formElements = quoteForm.querySelectorAll('.quote-form__title, .form-group, .quote-form__submit');
  if (formElements.length) {
    gravityTL.fromTo(formElements,
      { y: -50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        stagger: 0.09,
        ease: 'bounce.out'
      },
      0.45
    );
  }

  // 2. Gravitational Magnetic Pull on Submit Button
  const submitBtn = quoteForm.querySelector('.quote-form__submit');
  if (submitBtn) {
    submitBtn.addEventListener('mousemove', (e) => {
      const rect = submitBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(submitBtn, {
        x: x * 0.35,
        y: y * 0.4,
        duration: 0.25,
        ease: 'power2.out'
      });
    });

    submitBtn.addEventListener('mouseleave', () => {
      gsap.to(submitBtn, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: 'elastic.out(1.2, 0.4)'
      });
    });
  }

  // 3. Anti-Gravity Float on Input Focus
  const inputs = quoteForm.querySelectorAll('.form-input');
  inputs.forEach(input => {
    const parent = input.closest('.form-group');
    if (!parent) return;

    input.addEventListener('focus', () => {
      gsap.to(parent, {
        y: -4,
        duration: 0.25,
        ease: 'power2.out'
      });
    });

    input.addEventListener('blur', () => {
      gsap.to(parent, {
        y: 0,
        duration: 0.4,
        ease: 'bounce.out'
      });
    });
  });

  // 4. Gravitational Particle Explosion on Form Submit
  quoteForm.addEventListener('submit', () => {
    const allFilled = Array.from(inputs).every(inp => inp.value.trim().length > 0);
    if (allFilled && submitBtn) {
      triggerGravityParticles(submitBtn);
    }
  });
}

/**
 * Creates particles that shoot upward and fall back down under gravity
 */
function triggerGravityParticles(originEl) {
  const container = document.createElement('div');
  container.className = 'gravity-particles-container';
  container.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:99999;overflow:hidden;';
  document.body.appendChild(container);

  const rect = originEl.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  const colors = ['#F4D35E', '#111111', '#FFFFFF', '#E6C245', '#D4AF37'];
  const particleCount = 36;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 8 + 6;
    const isCircle = Math.random() > 0.4;
    p.style.cssText = `
      position: absolute;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${isCircle ? '50%' : '2px'};
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    `;
    container.appendChild(p);

    const angle = (Math.random() * Math.PI) - (Math.PI / 2); // -90deg to +90deg upward cone
    const force = Math.random() * 220 + 130;
    const destX = Math.sin(angle) * force;
    const peakY = -Math.cos(angle) * force;
    const gravityDropY = peakY + (Math.random() * 450 + 380);

    const tl = gsap.timeline({
      onComplete: () => {
        if (i === particleCount - 1 && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      }
    });

    // 1. Upward explosion against gravity
    tl.to(p, {
      x: destX * 0.65,
      y: peakY,
      rotation: Math.random() * 360,
      duration: 0.4,
      ease: 'power2.out'
    })
    // 2. Acceleration downwards under gravity
    .to(p, {
      x: destX,
      y: gravityDropY,
      opacity: 0,
      rotation: Math.random() * 720,
      duration: 0.9,
      ease: 'power2.in'
    });
  }
}

/* ══════════════════════════════════════════════════════
   REDUCED MOTION SUPPORT
   ══════════════════════════════════════════════════════ */
function respectReducedMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (typeof gsap !== 'undefined') {
      gsap.globalTimeline.timeScale(20); // fast-forward everything
    }
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 1, once: true, offset: 0 });
    }
  }
}

/* ══════════════════════════════════════════════════════
   GSAP CHARACTER ANIMATION (TESTIMONIAL SECTION)
   Splits quote text into individual characters and animates them with 3D wave & stagger.
   Also animates the restaurant scene characters (lamp swing, glow pulse, steam).
   ══════════════════════════════════════════════════════ */
function initTestimonialCharacterAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const quoteEl = document.querySelector('.testimonial__quote p');
  const testimonialSection = document.querySelector('.testimonial');
  if (!quoteEl || !testimonialSection) return;

  // 1. Split text into words and individual characters
  const rawText = quoteEl.textContent.trim();
  const words = rawText.split(' ');
  quoteEl.innerHTML = '';

  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';

    Array.from(word).forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'char';
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    });

    quoteEl.appendChild(wordSpan);
    if (wordIndex < words.length - 1) {
      quoteEl.appendChild(document.createTextNode(' '));
    }
  });

  const chars = quoteEl.querySelectorAll('.char');

  // 2. GSAP ScrollTrigger Character Animation
  const charTL = gsap.timeline({
    scrollTrigger: {
      trigger: testimonialSection,
      start: 'top 70%',
      once: true
    }
  });

  // Animate each character into view with 3D rotation and bounce wave
  charTL.fromTo(chars,
    {
      opacity: 0,
      y: 35,
      rotateX: -80,
      scale: 0.8
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.65,
      stagger: 0.012,
      ease: 'back.out(2)'
    }
  );

  // Animate author cite and divider smoothly after quote reveals
  charTL.fromTo('.testimonial__cite',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.3'
  );

  charTL.fromTo('.testimonial__logos span',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
    '-=0.4'
  );

  // 3. Interactive Mouse Wave Effect on Characters
  quoteEl.addEventListener('mousemove', (e) => {
    const target = e.target;
    if (target && target.classList.contains('char')) {
      gsap.to(target, {
        y: -8,
        color: '#F4D35E',
        scale: 1.25,
        duration: 0.15,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(target, {
            y: 0,
            color: '#111111',
            scale: 1,
            duration: 0.45,
            ease: 'elastic.out(1.2, 0.4)'
          });
        }
      });
    }
  });

  // 4. Ambient SVG Restaurant Elements Animation (Pendulum Lamp, Light Glow, Steaming Pot)
  const lamp = document.getElementById('svg-lamp');
  if (lamp) {
    gsap.to(lamp, {
      rotation: 3.5,
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  const glow = document.getElementById('svg-lamp-glow');
  if (glow) {
    gsap.to(glow, {
      scale: 1.14,
      opacity: 0.85,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  const tallItem = document.getElementById('svg-tall-item');
  if (tallItem) {
    gsap.to(tallItem, {
      rotation: 2.5,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  const steamLines = document.querySelectorAll('.steam-line');
  if (steamLines.length) {
    gsap.to(steamLines, {
      y: -10,
      opacity: 0.25,
      duration: 1.3,
      stagger: 0.35,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }
}

/* ══════════════════════════════════════════════════════
   GSAP MASONRY CASCADE IMAGE ANIMATION (INDUSTRIES SECTION)
   Dynamic multi-speed cascade entrance, differential parallax depth,
   and interactive 3D perspective hover focus.
   ══════════════════════════════════════════════════════ */
function initMasonryCascadeAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const industriesSection = document.querySelector('.industries');
  const cards = document.querySelectorAll('.industry__card');
  if (!industriesSection || !cards.length) return;

  // 1. Cascading Waterfall Entrance
  const cascadeTL = gsap.timeline({
    scrollTrigger: {
      trigger: industriesSection,
      start: 'top 75%',
      once: true
    }
  });

  // Header reveals
  cascadeTL.fromTo('.industries__heading',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    0
  );
  cascadeTL.fromTo('.industries__subtext',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    0.15
  );

  // Cards cascade in asymmetrically (masonry wave)
  const cardConfigs = [
    { y: 80, scale: 0.93, delay: 0.2 },
    { y: 150, scale: 0.88, delay: 0.38 }, // Center card drops deeper for masonry feel
    { y: 100, scale: 0.93, delay: 0.55 }
  ];

  cards.forEach((card, index) => {
    const config = cardConfigs[index] || { y: 90, scale: 0.92, delay: 0.2 + index * 0.15 };
    const img = card.querySelector('img');

    // Card boundary cascade
    cascadeTL.fromTo(card,
      { opacity: 0, y: config.y, scale: config.scale },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.15,
        ease: 'power3.out'
      },
      config.delay
    );

    // Inner image zoom out into place
    if (img) {
      cascadeTL.fromTo(img,
        { scale: 1.22 },
        { scale: 1.04, duration: 1.3, ease: 'power2.out' },
        config.delay
      );
    }
  });

  // 2. Continuous Scroll-Tied Masonry Parallax Cascade (Desktop)
  if (window.innerWidth >= 900) {
    // Card 1: subtle steady drift
    gsap.to(cards[0], {
      y: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: industriesSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });

    // Card 2 (Center): deeper cascade parallax drift
    if (cards[1]) {
      gsap.to(cards[1], {
        y: -65,
        ease: 'none',
        scrollTrigger: {
          trigger: industriesSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // Card 3: counter-balanced drift
    if (cards[2]) {
      gsap.to(cards[2], {
        y: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: industriesSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    // Inner image parallax inside masks
    cards.forEach((card) => {
      const img = card.querySelector('img');
      if (img) {
        gsap.fromTo(img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          }
        );
      }
    });
  }

  // 3. Interactive 3D Tilt & Magnetic Focus
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(card, {
        rotationY: x * 0.04,
        rotationX: -y * 0.04,
        transformPerspective: 900,
        boxShadow: '0 28px 60px rgba(0,0,0,0.22)',
        duration: 0.35,
        ease: 'power1.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  });
}

/* ══════════════════════════════════════════════════════
   SERVICES PAGE GSAP ANIMATIONS
   ══════════════════════════════════════════════════════ */
function initServicesAnimations() {
  if (typeof gsap === 'undefined') return;

  // 1. Hardhat floating + mouse parallax
  const hardhatWrap = document.querySelector('.srv-hero__img-wrap');
  const hardhatImg = document.getElementById('srv-hardhat-img');
  if (hardhatWrap && hardhatImg) {
    // Gentle continuous float
    gsap.to(hardhatImg, {
      y: -12,
      rotation: 1.5,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Mouse movement interactive 3D tilt
    const heroSection = document.getElementById('srv-hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(hardhatImg, {
          rotationY: x * 18,
          rotationX: -y * 18,
          transformPerspective: 900,
          duration: 0.4,
          ease: 'power1.out'
        });
      });

      heroSection.addEventListener('mouseleave', () => {
        gsap.to(hardhatImg, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
    }
  }

  // 2. Interactive 3D tilt on claim cards
  const claimCards = document.querySelectorAll('.srv-claim-card');
  claimCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, {
        rotationY: x * 0.04,
        rotationX: -y * 0.04,
        transformPerspective: 800,
        boxShadow: '0 16px 36px rgba(0,0,0,0.12)',
        duration: 0.3,
        ease: 'power1.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });

  // 3. Matrix Table Growth Plan Hover Elevation
  const growthCol = document.querySelector('.srv-matrix__plan-col--growth');
  if (growthCol) {
    growthCol.addEventListener('mouseenter', () => {
      gsap.to(growthCol, {
        scale: 1.03,
        boxShadow: '0 24px 50px rgba(244, 211, 94, 0.55)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    growthCol.addEventListener('mouseleave', () => {
      gsap.to(growthCol, {
        scale: 1.0,
        boxShadow: '0 16px 40px rgba(244, 211, 94, 0.4)',
        duration: 0.4,
        ease: 'power2.out'
      });
    });
  }

  // 4. Policy Rows Image Parallax on Scroll
  if (typeof ScrollTrigger !== 'undefined') {
    document.querySelectorAll('.srv-policy-row').forEach(row => {
      const img = row.querySelector('.srv-policy-row__img');
      if (img) {
        gsap.fromTo(img, 
          { scale: 1.08, yPercent: -4 },
          {
            scale: 1.0,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'bottom 15%',
              scrub: 1
            }
          }
        );
      }
    });
  }
}

/* ══════════════════════════════════════════════════════
   BLOG PAGE GSAP ANIMATIONS
   ══════════════════════════════════════════════════════ */
function initBlogAnimations() {
  if (typeof gsap === 'undefined') return;

  // 1. Skyscraper Hero Floating & Cursor Parallax
  const skyImg = document.getElementById('blog-sky-img');
  const heroSection = document.getElementById('blog-hero');
  if (skyImg && heroSection) {
    gsap.to(skyImg, {
      y: -10,
      scale: 1.02,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(skyImg, {
        rotationY: x * 14,
        rotationX: -y * 14,
        transformPerspective: 900,
        duration: 0.4,
        ease: 'power1.out'
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      gsap.to(skyImg, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }

  // 2. Carousel Dots Switcher
  const dots = document.querySelectorAll('.blog-dark-hero__dot');
  if (dots.length) {
    let activeIndex = 0;
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        activeIndex = idx;
      });
    });

    setInterval(() => {
      dots[activeIndex].classList.remove('active');
      activeIndex = (activeIndex + 1) % dots.length;
      dots[activeIndex].classList.add('active');
    }, 4500);
  }

  // 3. GSAP Masonry Cascade Animation for 8-Card Latest Articles Grid
  const blogLatestSection = document.getElementById('latest-articles');
  const latestGrid = document.querySelector('.blog-latest__grid');
  const latestCards = document.querySelectorAll('.blog-card');
  const latestTitle = document.querySelector('.blog-latest__title');

  if (blogLatestSection && latestCards.length && typeof ScrollTrigger !== 'undefined') {
    // Title reveal
    if (latestTitle) {
      gsap.fromTo(latestTitle,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: blogLatestSection,
            start: 'top 82%',
            once: true
          }
        }
      );
    }

    // Masonry waterfall cascade timeline
    const masonryTL = gsap.timeline({
      scrollTrigger: {
        trigger: latestGrid,
        start: 'top 82%',
        once: true
      }
    });

    // Multi-speed cascade configuration for 4x2 grid (alternating column drop heights)
    const cascadeOffsets = [
      { y: 70, delay: 0.0, scale: 0.92 },
      { y: 120, delay: 0.14, scale: 0.88 }, // Col 2 deeper drop
      { y: 85, delay: 0.26, scale: 0.91 },
      { y: 135, delay: 0.38, scale: 0.87 }, // Col 4 deeper drop
      { y: 75, delay: 0.48, scale: 0.92 },
      { y: 125, delay: 0.58, scale: 0.88 },
      { y: 90, delay: 0.68, scale: 0.91 },
      { y: 140, delay: 0.78, scale: 0.87 }
    ];

    latestCards.forEach((card, i) => {
      const cfg = cascadeOffsets[i] || { y: 90, delay: i * 0.1, scale: 0.9 };
      const img = card.querySelector('.blog-card__img');

      masonryTL.fromTo(card,
        {
          opacity: 0,
          y: cfg.y,
          scale: cfg.scale,
          rotationX: 10
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.05,
          ease: 'power3.out'
        },
        cfg.delay
      );

      if (img) {
        masonryTL.fromTo(img,
          { scale: 1.25 },
          { scale: 1, duration: 1.15, ease: 'power2.out' },
          cfg.delay
        );

        // Differential scroll parallax (alternating column speeds)
        const isEvenCol = (i % 4 === 1 || i % 4 === 3);
        gsap.to(img, {
          yPercent: isEvenCol ? -12 : 8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3
          }
        });
      }
    });
  }

  // 4. Interactive 3D tilt on 8 Blog cards and 2 Featured cards
  const blogCards = document.querySelectorAll('.blog-card, .blog-featured-card');
  blogCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, {
        rotationY: x * 0.04,
        rotationX: -y * 0.04,
        transformPerspective: 800,
        boxShadow: '0 18px 40px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power1.out'
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

/* ══════════════════════════════════════════════════════
   CONTACT PAGE GSAP GRAVITY ANIMATIONS & FORM
   ══════════════════════════════════════════════════════ */
function initContactPageAnimations() {
  if (typeof gsap === 'undefined') return;

  const heroSection = document.getElementById('contact-hero');
  const title = document.getElementById('contact-title');
  const sub = document.querySelector('.contact-hero__sub');
  const fields = document.querySelectorAll('.contact-form__field');
  const submitBtn = document.getElementById('contact-submit-btn');
  const skaterCard = document.querySelector('.contact-hero__img-card');

  // 1. GSAP Gravity Drop & Bounce Entrance Timeline
  if (heroSection) {
    const gravityTL = gsap.timeline({
      defaults: { ease: 'bounce.out' },
      delay: 0.3
    });

    if (title) {
      gravityTL.fromTo(title, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 });
    }
    if (sub) {
      gravityTL.fromTo(sub, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5');
    }
    if (fields.length) {
      gravityTL.fromTo(fields, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.08 }, '-=0.4');
    }
    if (submitBtn) {
      gravityTL.fromTo(submitBtn, { y: -55, scale: 0.88, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.95 }, '-=0.3');
    }
    if (skaterCard) {
      gravityTL.fromTo(skaterCard, { y: -140, rotation: -3, opacity: 0 }, {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 1.25,
        onComplete: () => {
          // Continuous suspension float after gravity landing
          gsap.to(skaterCard, {
            y: -10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        }
      }, '-=1.1');
    }

    // Interactive 3D Cursor Physics on Hero
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (skaterCard) {
        gsap.to(skaterCard, {
          rotationY: x * 14,
          rotationX: -y * 14,
          transformPerspective: 900,
          duration: 0.35,
          ease: 'power1.out'
        });
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      if (skaterCard) {
        gsap.to(skaterCard, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.7,
          ease: 'power2.out'
        });
      }
    });
  }

  // 2. Salem Map 3D Hover Tilt
  const mapContainer = document.querySelector('.salem-map-container');
  if (mapContainer) {
    mapContainer.addEventListener('mousemove', (e) => {
      const rect = mapContainer.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(mapContainer, {
        rotationY: x * 0.02,
        rotationX: -y * 0.02,
        transformPerspective: 900,
        boxShadow: '0 30px 70px rgba(0,0,0,0.8)',
        duration: 0.3,
        ease: 'power1.out'
      });
    });
    mapContainer.addEventListener('mouseleave', () => {
      gsap.to(mapContainer, {
        rotationY: 0,
        rotationX: 0,
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  }

  // 3. Service Level Standards (Guarantees Section) Scroll Animations
  const guaranteesSection = document.getElementById('response-guarantees');
  const guaranteeCards = document.querySelectorAll('.guarantee-card');
  const guaranteesHeader = document.querySelector('.guarantees-section__header');

  if (guaranteesSection && guaranteeCards.length && typeof ScrollTrigger !== 'undefined') {
    // Header Reveal on Scroll
    if (guaranteesHeader) {
      gsap.fromTo(guaranteesHeader, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: guaranteesSection,
            start: 'top 82%',
            once: true
          }
        }
      );
    }

    // 4-Card Cascading Stagger Drop & GSAP Clip-Path Image Reveal on Scroll
    const revealTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.guarantees-grid',
        start: 'top 85%',
        once: true
      }
    });

    revealTL.fromTo(guaranteeCards,
      {
        opacity: 0,
        y: 80,
        scale: 0.9,
        rotationX: 12
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out'
      }
    );

    // GSAP Clip-Path Image Reveal Sequence per Card
    guaranteeCards.forEach((card, index) => {
      const img = card.querySelector('.guarantee-card__img');
      const curtain = card.querySelector('.guarantee-card__curtain');
      const badge = card.querySelector('.guarantee-card__badge-icon');

      if (img && curtain) {
        // Set initial clip-path and zoom state
        gsap.set(img, {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          scale: 1.25
        });
        gsap.set(curtain, { scaleX: 1, transformOrigin: 'left center' });

        revealTL.to(curtain, {
          scaleX: 0,
          transformOrigin: 'right center',
          duration: 0.75,
          ease: 'power3.inOut'
        }, 0.2 + index * 0.12)
        .to(img, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          scale: 1,
          duration: 0.9,
          ease: 'power3.inOut'
        }, 0.25 + index * 0.12);
      }

      if (badge) {
        revealTL.fromTo(badge,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(2)',
            onComplete: () => {
              // Floating oscillation after entrance
              gsap.to(badge, {
                y: -4,
                duration: 2 + index * 0.3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
              });
            }
          },
          0.6 + index * 0.12
        );
      }

      // Interactive 3D Card Hover Physics
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(card, {
          rotationY: x * 10,
          rotationX: -y * 10,
          transformPerspective: 800,
          y: -8,
          duration: 0.25,
          ease: 'power1.out'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
  }

  // 4. FAQ Accordion Toggle Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(other => {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 4. Contact form handler with Gravity Particle Burst
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('contact-toast');
  if (contactForm && toast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
        // Trigger realistic upward gravity burst of particles
        triggerGravityParticles(submitBtn);
      }
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Get My Quote';
        }
        contactForm.reset();
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 4500);
      }, 700);
    });
  }
}

/* ══════════════════════════════════════════════════════
   ABOUT PAGE — GSAP GRAVITY CARD DROP (4 RULES SECTION)
   ══════════════════════════════════════════════════════ */
function initAboutRulesGravityAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const rulesSection = document.getElementById('about-rules');
  const rulesGrid = document.querySelector('.about-rules__grid');
  const ruleCards = document.querySelectorAll('.about-rule-card');
  const rulesTitle = document.querySelector('.about-rules__title');
  const rulesSubtitle = document.querySelector('.about-rules__subtitle');

  if (!rulesSection || !ruleCards.length) return;

  // Header Reveal
  const headerTL = gsap.timeline({
    scrollTrigger: {
      trigger: rulesSection,
      start: 'top 82%',
      once: true
    }
  });

  if (rulesTitle) {
    headerTL.fromTo(rulesTitle,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }
  if (rulesSubtitle) {
    headerTL.fromTo(rulesSubtitle,
      { opacity: 0, y: -25 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    );
  }

  // 4 Cards Gravity Drop with Bounce Physics
  const gravityTL = gsap.timeline({
    scrollTrigger: {
      trigger: rulesGrid,
      start: 'top 80%',
      once: true
    }
  });

  const dropDistances = [-130, -170, -140, -180]; // Varied drop heights for natural weight physics

  ruleCards.forEach((card, index) => {
    const dropY = dropDistances[index] || -150;
    gravityTL.fromTo(card,
      {
        opacity: 0,
        y: dropY,
        scaleY: 0.88,
        scaleX: 1.04
      },
      {
        opacity: 1,
        y: 0,
        scaleY: 1,
        scaleX: 1,
        duration: 1.15,
        ease: 'bounce.out'
      },
      index * 0.12
    );

    // Interactive Anti-Gravity Float on Hover
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        backgroundColor: '#FAFAFA',
        borderColor: '#000000',
        boxShadow: '0 18px 40px rgba(0, 0, 0, 0.12), 0 0 0 2px #F4D35E',
        duration: 0.35,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
        duration: 0.6,
        ease: 'bounce.out'
      });
    });
  });
}

/* ══════════════════════════════════════════════════════
   ABOUT PAGE — GSAP SLIDING IMAGE ANIMATION (LEADERSHIP TEAM)
   ══════════════════════════════════════════════════════ */
function initAboutTeamSlidingImageAnimation() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const teamSection = document.getElementById('about-team');
  const teamGrid = document.querySelector('.about-team__grid');
  const teamCards = document.querySelectorAll('.about-team-card');
  const teamTitle = document.querySelector('.about-team__title');

  if (!teamSection || !teamCards.length) return;

  // Title slide & reveal
  if (teamTitle) {
    gsap.fromTo(teamTitle,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teamSection,
          start: 'top 82%',
          once: true
        }
      }
    );
  }

  // Sliding Image Reveal Timeline
  const slideTL = gsap.timeline({
    scrollTrigger: {
      trigger: teamGrid,
      start: 'top 80%',
      once: true
    }
  });

  const slideOffsets = [
    { x: -90, y: 0, delay: 0.0 },   // Marcus slides in from left
    { x: 0, y: 80, delay: 0.15 },   // Sarah slides in with upward glide
    { x: 90, y: 0, delay: 0.3 }     // Teo slides in from right
  ];

  teamCards.forEach((card, index) => {
    const offset = slideOffsets[index] || { x: 0, y: 60, delay: index * 0.15 };
    const curtain = card.querySelector('.about-team-card__curtain');
    const img = card.querySelector('.about-team-card__img');

    // Card frame slide-in
    slideTL.fromTo(card,
      {
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale: 0.94
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out'
      },
      offset.delay
    );

    // Sliding curtain unmask & inner image glide
    if (curtain && img) {
      gsap.set(curtain, { scaleX: 1, transformOrigin: 'left center' });
      gsap.set(img, { xPercent: index === 0 ? 20 : (index === 2 ? -20 : 0), scale: 1.18 });

      slideTL.to(curtain, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.85,
        ease: 'power3.inOut'
      }, offset.delay + 0.15)
      .to(img, {
        xPercent: 0,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out'
      }, offset.delay + 0.2);

      // Continuous subtle scroll sliding parallax
      gsap.to(img, {
        xPercent: (index % 2 === 0 ? -6 : 6),
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4
        }
      });
    }

    // 3D Tilt & Glide on Mousemove
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotationY: x * 12,
        rotationX: -y * 12,
        transformPerspective: 900,
        y: -10,
        duration: 0.3,
        ease: 'power1.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  });
}

/* ══════════════════════════════════════════════════════
   BLOG PAGE: CHARACTER ANIMATION & CURSOR HOVER EFFECT
   ══════════════════════════════════════════════════════ */
function initBlogAnimations() {
  const blogHero = document.getElementById('blog-hero');
  if (!blogHero) return;

  // 1. Dynamic Split-Text Character Typography
  const charLines = blogHero.querySelectorAll('[data-char-anim="true"]');
  const allCharElements = [];

  charLines.forEach(line => {
    const rawText = line.textContent.trim();
    line.innerHTML = '';
    const words = rawText.split(/\s+/);

    words.forEach((wordText, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'blog-char-word';

      const letters = wordText.split('');
      letters.forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.className = 'blog-char';
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
        allCharElements.push(charSpan);
      });

      line.appendChild(wordSpan);

      if (wordIdx < words.length - 1) {
        line.appendChild(document.createTextNode(' '));
      }
    });
  });

  // GSAP 3D Kinetic Character Stagger Entrance
  if (typeof gsap !== 'undefined' && allCharElements.length) {
    gsap.set(allCharElements, {
      opacity: 0,
      y: 40,
      rotateX: -85,
      scale: 0.85,
      transformPerspective: 1000
    });

    gsap.to(allCharElements, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.85,
      stagger: 0.022,
      ease: 'back.out(1.8)',
      delay: 0.15
    });
  }

  // Interactive Character Hover Magnetic Elastic Bounce & Neighbor Wave
  allCharElements.forEach((charEl, idx) => {
    charEl.addEventListener('mouseenter', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(charEl, {
          y: -10,
          scale: 1.22,
          rotateZ: (Math.random() * 8 - 4),
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        // Subtly affect adjacent characters for fluid wave
        const prevChar = allCharElements[idx - 1];
        const nextChar = allCharElements[idx + 1];
        if (prevChar) {
          gsap.to(prevChar, { y: -4, scale: 1.08, duration: 0.25, ease: 'power2.out' });
        }
        if (nextChar) {
          gsap.to(nextChar, { y: -4, scale: 1.08, duration: 0.25, ease: 'power2.out' });
        }
      }
    });

    charEl.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(charEl, {
          y: 0,
          scale: 1,
          rotateZ: 0,
          duration: 0.5,
          ease: 'elastic.out(1.2, 0.4)',
          overwrite: 'auto'
        });

        const prevChar = allCharElements[idx - 1];
        const nextChar = allCharElements[idx + 1];
        if (prevChar) {
          gsap.to(prevChar, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
        }
        if (nextChar) {
          gsap.to(nextChar, { y: 0, scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
        }
      }
    });
  });

  // 2. Custom Cursor Follower in Blog Hero
  const heroCursor = document.getElementById('blogHeroCursor');
  const cursorLabel = document.getElementById('blogHeroCursorLabel');

  if (heroCursor) {
    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let isInside = false;

    blogHero.addEventListener('mouseenter', () => {
      isInside = true;
      heroCursor.classList.add('active');
    });

    blogHero.addEventListener('mouseleave', () => {
      isInside = false;
      heroCursor.classList.remove('active', 'hovering', 'hovering--btn');
    });

    blogHero.addEventListener('mousemove', (e) => {
      const rect = blogHero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    function renderHeroCursor() {
      if (isInside) {
        curX += (mouseX - curX) * 0.18;
        curY += (mouseY - curY) * 0.18;
        heroCursor.style.left = `${curX.toFixed(1)}px`;
        heroCursor.style.top = `${curY.toFixed(1)}px`;
      }
      requestAnimationFrame(renderHeroCursor);
    }
    requestAnimationFrame(renderHeroCursor);

    // Interactive Hover Targets for Cursor
    const cursorTargets = blogHero.querySelectorAll('[data-cursor-text]');
    cursorTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        const text = target.getAttribute('data-cursor-text');
        if (text && cursorLabel) {
          cursorLabel.textContent = text;
        }
        if (target.id === 'blog-hero-cta' || target.classList.contains('btn')) {
          heroCursor.classList.add('hovering--btn');
        } else {
          heroCursor.classList.add('hovering');
        }
      });

      target.addEventListener('mouseleave', () => {
        heroCursor.classList.remove('hovering', 'hovering--btn');
      });
    });
  }

  // 3. 3D Card Parallax Tilt & Specular Cursor Glare & Follower Pill
  const cardHolder = document.getElementById('blogHeroCard');
  const cardGlare = document.getElementById('blogHeroGlare');
  const skyImg = document.getElementById('blog-sky-img');
  const cardPill = document.getElementById('blogHeroCardPill');

  if (cardHolder) {
    let cardTargetX = 0, cardTargetY = 0;
    let cardCurRotX = 0, cardCurRotY = 0;
    let pillX = 0, pillY = 0;
    let pillCurX = 0, pillCurY = 0;
    let isCardHovered = false;

    cardHolder.addEventListener('mouseenter', () => {
      isCardHovered = true;
      if (cardPill) cardPill.classList.add('active');
      if (cardGlare) cardGlare.style.opacity = '1';
    });

    cardHolder.addEventListener('mousemove', (e) => {
      const rect = cardHolder.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalized tilt angles (-11 to 11 deg)
      cardTargetX = ((relY - centerY) / centerY) * -11;
      cardTargetY = ((relX - centerX) / centerX) * 11;

      // Pill target
      pillX = relX;
      pillY = relY;

      // Specular spotlight gradient
      if (cardGlare) {
        const glarePercentX = (relX / rect.width) * 100;
        const glarePercentY = (relY / rect.height) * 100;
        cardGlare.style.background = `radial-gradient(circle 240px at ${glarePercentX}% ${glarePercentY}%, rgba(255, 255, 255, 0.45) 0%, rgba(244, 211, 94, 0.15) 38%, rgba(255, 255, 255, 0) 70%)`;
      }
    });

    cardHolder.addEventListener('mouseleave', () => {
      isCardHovered = false;
      cardTargetX = 0;
      cardTargetY = 0;
      if (cardPill) cardPill.classList.remove('active');
      if (cardGlare) cardGlare.style.opacity = '0';
      if (skyImg && typeof gsap !== 'undefined') {
        gsap.to(skyImg, { scale: 1, x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
      }
    });

    function animateBlogCard() {
      cardCurRotX += (cardTargetX - cardCurRotX) * 0.14;
      cardCurRotY += (cardTargetY - cardCurRotY) * 0.14;

      if (isCardHovered) {
        cardHolder.style.transform = `perspective(1200px) rotateX(${cardCurRotX.toFixed(2)}deg) rotateY(${cardCurRotY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`;

        // Image counter-parallax
        if (skyImg) {
          const shiftX = (cardCurRotY * -0.7).toFixed(2);
          const shiftY = (cardCurRotX * 0.7).toFixed(2);
          skyImg.style.transform = `scale(1.09) translate3d(${shiftX}px, ${shiftY}px, 0)`;
        }

        // Pill smooth follower
        if (cardPill) {
          pillCurX += (pillX - pillCurX) * 0.22;
          pillCurY += (pillY - pillCurY) * 0.22;
          cardPill.style.left = `${pillCurX.toFixed(1)}px`;
          cardPill.style.top = `${pillCurY.toFixed(1)}px`;
        }
      } else if (Math.abs(cardCurRotX) > 0.05 || Math.abs(cardCurRotY) > 0.05) {
        cardHolder.style.transform = `perspective(1200px) rotateX(${cardCurRotX.toFixed(2)}deg) rotateY(${cardCurRotY.toFixed(2)}deg) scale3d(1, 1, 1)`;
      } else {
        cardHolder.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }

      requestAnimationFrame(animateBlogCard);
    }
    requestAnimationFrame(animateBlogCard);
  }
}

/* ══════════════════════════════════════════════════════
   INIT ALL
   ══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initStacklyPreloader();
  respectReducedMotion();
  initPageTransition();
  initHeroGSAP();
  initCounterGSAP();
  initParallax();
  initCardStagger();
  initCardHovers();
  initCTAReveal();
  initFeaturedBlog();
  initContactReveal();
  initStatsGSAP();
  initMVCards();
  initGravityFormAnimation();
  initAboutRulesGravityAnimation();
  initAboutTeamSlidingImageAnimation();
  initTestimonialCharacterAnimation();
  initMasonryCascadeAnimation();
  initServicesAnimations();
  initBlogAnimations();
  initContactPageAnimations();
});






