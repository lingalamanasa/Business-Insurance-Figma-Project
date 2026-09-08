/**
 * Stackly — Business Insurance Website
 * JavaScript: Animations, Interactions, Form Validation
 */

'use strict';

/* ══════════════════════════════════════════════════════
   UTILITY HELPERS & BCACHE RESTORATION
   ══════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function resetAllFormButtons() {
  const quoteBtn = document.getElementById('get-quote-btn');
  if (quoteBtn) {
    quoteBtn.classList.remove('loading');
    quoteBtn.disabled = false;
  }

  const contactBtn = document.getElementById('contact-submit-btn');
  if (contactBtn) {
    contactBtn.disabled = false;
    contactBtn.innerHTML = 'Get My Quote';
  }

  const newsletterBtns = document.querySelectorAll('.footer__newsletter-btn');
  newsletterBtns.forEach(btn => {
    btn.disabled = false;
    btn.style.opacity = '';
  });

  const blogSearchBtn = document.getElementById('blog-search-btn');
  if (blogSearchBtn) {
    blogSearchBtn.disabled = false;
  }
}

window.addEventListener('pageshow', (event) => {
  document.body.style.opacity = '1';
  resetAllFormButtons();
});

document.addEventListener('DOMContentLoaded', () => {
  resetAllFormButtons();
});

/* ══════════════════════════════════════════════════════
   1. HEADER SCROLL BEHAVIOUR
   ══════════════════════════════════════════════════════ */
(function initHeaderScroll() {
  const header = $('#header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ══════════════════════════════════════════════════════
   2. MOBILE NAVIGATION (Spring-Board Physics & Focus Trap)
   ══════════════════════════════════════════════════════ */
(function initMobileNav() {
  const hamburger = $('#hamburger-btn');
  const mobileMenu = $('#mobile-menu');
  const mobileOverlay = $('#mobile-overlay');
  const mobileClose = $('#mobile-close-btn');
  const mobileLinks = $$('.nav__mobile-link, .nav__mobile-actions a, .nav__mobile-links a');

  if (!hamburger || !mobileMenu) return;

  // Stagger indices for items
  const menuItems = $$('.nav__mobile-links > li, .nav__mobile-actions');
  menuItems.forEach((item, idx) => {
    if (!item.style.getPropertyValue('--item-idx')) {
      item.style.setProperty('--item-idx', idx);
    }
  });

  const openMenu = () => {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.removeAttribute('aria-hidden');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    document.documentElement.classList.add('menu-open');

    // Focus first link or close button
    setTimeout(() => {
      const firstFocusable = mobileMenu.querySelector('a, button');
      if (firstFocusable) firstFocusable.focus();
    }, 150);
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  if (mobileClose) mobileClose.addEventListener('click', () => {
    closeMenu();
    hamburger.focus();
  });

  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Escape key to close & Trap Tab key inside menu
  document.addEventListener('keydown', (e) => {
    if (!mobileMenu.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeMenu();
      hamburger.focus();
    } else if (e.key === 'Tab') {
      const focusables = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', mobileMenu);
      if (!focusables.length) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        lastEl.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    }
  });

  // Auto-close on resize if viewport expands beyond mobile breakpoint (1024px)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════
   3. TASTEFUL WOBBLE CARDS & SCROLL REVEALS
   ══════════════════════════════════════════════════════ */
(function initWobbleAndScroll() {
  // 1. Standard Scroll Animations
  const animatedEls = $$([
    '.animate-fade-up',
    '.animate-fade-left',
    '.animate-fade-right',
    '.animate-scale-in',
    '.animate-on-scroll',
    '.workflow__slide-left',
    '.workflow__slide-right',
    '.workflow__slide-step'
  ].join(','));

  if (animatedEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    animatedEls.forEach(el => observer.observe(el));
  }

  // 2. Tasteful Wobble Cards Entrance
  const cardSelectors = [
    '.wobble-card',
    '[data-wobble]',
    '.policy__item',
    '.workflow__step',
    '.industry__card',
    '.diff__card',
    '.guarantee-card',
    '.about-rule-card',
    '.srv-claim-card',
    '.blog-card',
    '.about-team-card',
    '.about-val-card',
    '.policy-card'
  ].join(',');

  const cards = $$(cardSelectors);
  if (!cards.length) return;

  // Stagger siblings in their grid containers
  const parents = new Set(cards.map(c => c.parentElement).filter(Boolean));
  parents.forEach(parent => {
    const siblings = $$(':scope > ' + cardSelectors.split(',').join(', :scope > '), parent);
    siblings.forEach((card, idx) => {
      if (!card.style.getPropertyValue('--wobble-delay')) {
        card.style.setProperty('--wobble-delay', idx % 4);
      }
      card.classList.add('wobble-card');
    });
  });

  const wobbleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('wobble-revealed');
          wobbleObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );

  cards.forEach(card => {
    card.classList.add('wobble-card');
    wobbleObserver.observe(card);
  });
})();

/* ══════════════════════════════════════════════════════
   4. ANIMATED NUMBER COUNTERS
   ══════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = $$('.stats__number[data-target]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();
    const startVal = 0;

    // Easing: ease-out cubic
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      const current = Math.round(startVal + (target - startVal) * eased);
      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();

/* ══════════════════════════════════════════════════════
   5. ACTIVE NAV LINK ON SCROLL (Highlight)
   ══════════════════════════════════════════════════════ */
(function initActiveNav() {
  const sections = $$('section[id], div[id="workflow"]');
  const navLinks = $$('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ══════════════════════════════════════════════════════
   6. SMOOTH SCROLL FOR ANCHOR LINKS
   ══════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === '#') return;

    const target = $(href);
    if (!target) return;

    e.preventDefault();
    const headerH = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

/* ══════════════════════════════════════════════════════
   7. QUOTE FORM — REAL-TIME & SUBMISSION VALIDATION
   ══════════════════════════════════════════════════════ */
(function initQuoteForm() {
  const form = $('#quote-form');
  if (!form || form.dataset.initialized) return;
  form.dataset.initialized = 'true';

  const submitBtn = $('#get-quote-btn');
  const successMsg = $('#quote-success');

  const fields = [
    {
      id: 'business-name',
      errorId: 'business-name-error',
      validate: (v) => {
        if (!v.trim()) return 'Please fill this field.';
        if (v.trim().length < 2) return 'Business name must be at least 2 characters.';
        return null;
      }
    },
    {
      id: 'industry',
      errorId: 'industry-error',
      validate: (v) => {
        if (!v.trim()) return 'Please fill this field.';
        if (v.trim().length < 2) return 'Industry must be at least 2 characters.';
        return null;
      }
    },
    {
      id: 'employees',
      errorId: 'employees-error',
      validate: (v) => {
        if (!v.trim()) return 'Please fill this field.';
        const num = parseInt(v, 10);
        if (isNaN(num) || num < 1) return 'Please enter 1 or more employees.';
        return null;
      }
    },
    {
      id: 'work-email',
      errorId: 'email-error',
      validate: (v) => {
        if (!v.trim()) return 'Please fill this field.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(v.trim())) return 'Please enter a valid work email address.';
        return null;
      }
    }
  ];

  function validateField(f) {
    const input = $(`#${f.id}`);
    const errorEl = $(`#${f.errorId}`);
    if (!input) return true;

    const error = f.validate(input.value);
    if (error) {
      input.classList.add('error', 'is-invalid');
      input.classList.remove('is-valid');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = error;
        errorEl.style.opacity = '1';
      }
      return false;
    } else {
      input.classList.remove('error', 'is-invalid');
      if (input.value.trim().length > 0) {
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
      }
      input.removeAttribute('aria-invalid');
      if (errorEl) {
        errorEl.textContent = '';
      }
      return true;
    }
  }

  // Real-time validation listeners
  fields.forEach(f => {
    const input = $(`#${f.id}`);
    if (!input) return;

    input.addEventListener('blur', () => validateField(f));
    input.addEventListener('input', () => {
      if (input.classList.contains('error') || input.classList.contains('is-invalid')) {
        validateField(f);
      }
      const qAlert = $('#quote-alert');
      if (qAlert && !qAlert.hasAttribute('hidden')) {
        const allValid = fields.every(item => {
          const el = $(`#${item.id}`);
          return el && item.validate(el.value) === null;
        });
        if (allValid) qAlert.setAttribute('hidden', '');
      }
    });
  });

  function navigateTo404() {
    const loc = window.location;
    const pathname = loc.pathname;
    let target404 = '404.html';
    
    // If hosted under a subpath like /Business-Insurance-Figma-Project/
    if (pathname.endsWith('.html')) {
      target404 = pathname.substring(0, pathname.lastIndexOf('/') + 1) + '404.html';
    } else if (pathname.endsWith('/')) {
      target404 = pathname + '404.html';
    } else if (pathname.length > 0) {
      target404 = pathname + '/404.html';
    }
    window.location.href = target404;
  }

  function handleQuoteSubmit(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    let isFormValid = true;
    let firstInvalid = null;

    fields.forEach(f => {
      const isValid = validateField(f);
      if (!isValid) {
        isFormValid = false;
        if (!firstInvalid) {
          firstInvalid = $(`#${f.id}`);
        }
      }
    });

    const qAlert = $('#quote-alert');
    if (!isFormValid) {
      if (qAlert) {
        const qAlertText = $('#quote-alert-text');
        if (qAlertText) {
          qAlertText.textContent = 'Please fill this field in all highlighted rows.';
        }
        qAlert.removeAttribute('hidden');
      }
      form.classList.remove('form-shake');
      void form.offsetWidth;
      form.classList.add('form-shake');
      if (firstInvalid) {
        firstInvalid.focus();
        if (typeof firstInvalid.reportValidity === 'function') {
          firstInvalid.reportValidity();
        }
      }
      return false;
    }

    if (qAlert) qAlert.setAttribute('hidden', '');
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
      navigateTo404();
    }, 450);

    return true;
  }

  form.addEventListener('submit', handleQuoteSubmit);

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      // If clicking button, run submission handler
      handleQuoteSubmit(e);
    });
  }
})();

/* ══════════════════════════════════════════════════════
   7B. FOOTER NEWSLETTER FORMS — VALIDATION & FEEDBACK
   ══════════════════════════════════════════════════════ */
(function initNewsletterForms() {
  const forms = $$('.footer__newsletter-form');
  if (!forms.length) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  forms.forEach(form => {
    form.removeAttribute('onsubmit');
    const input = $('.footer__newsletter-input', form);
    const submitBtn = $('.footer__newsletter-btn', form);
    const feedback = $('.footer__newsletter-feedback', form);

    const showFeedback = (msg, isSuccess = false) => {
      if (!feedback) return;
      feedback.textContent = msg;
      feedback.className = `footer__newsletter-feedback visible ${isSuccess ? 'is-success' : 'is-error'}`;
    };

    const clearFeedback = () => {
      if (!feedback) return;
      feedback.textContent = '';
      feedback.className = 'footer__newsletter-feedback';
    };

    if (input) {
      input.addEventListener('input', () => {
        if (feedback && feedback.classList.contains('is-error')) {
          clearFeedback();
        }
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!input) return;

      const email = input.value.trim();
      if (!email) {
        showFeedback('Please enter your email address.', false);
        input.focus();
        return;
      }

      if (!emailRegex.test(email)) {
        showFeedback('Please enter a valid email address (e.g. name@company.com).', false);
        input.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '';
        }
        window.location.href = '404.html';
      }, 400);
    });
  });
})();

/* ══════════════════════════════════════════════════════
   7C. CONTACT PAGE FORM — REAL-TIME & SUBMIT VALIDATION
   ══════════════════════════════════════════════════════ */
(function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  const submitBtn = $('#contact-submit-btn');
  const toast = $('#contact-toast');

  const fields = [
    {
      id: 'contact-name',
      errorId: 'contact-name-error',
      validate: (v) => {
        if (!v.trim()) return 'Please enter your full name.';
        if (v.trim().length < 2) return 'Full name must be at least 2 characters.';
        return null;
      }
    },
    {
      id: 'contact-business',
      errorId: 'contact-business-error',
      validate: (v) => {
        if (!v.trim()) return 'Please enter your business name.';
        if (v.trim().length < 2) return 'Business name must be at least 2 characters.';
        return null;
      }
    },
    {
      id: 'contact-email',
      errorId: 'contact-email-error',
      validate: (v) => {
        if (!v.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(v.trim())) return 'Please enter a valid email address.';
        return null;
      }
    },
    {
      id: 'contact-phone',
      errorId: 'contact-phone-error',
      validate: (v) => {
        if (!v.trim()) return 'Please enter your work phone number.';
        const digits = v.replace(/[\s\-\(\)\+]/g, '');
        if (digits.length < 7) return 'Please enter a valid phone number (at least 7 digits).';
        return null;
      }
    },
    {
      id: 'contact-message',
      errorId: 'contact-message-error',
      validate: (v) => {
        if (v.trim() && v.trim().length < 5) return 'Message must be at least 5 characters.';
        return null;
      }
    }
  ];

  function validateField(f) {
    const input = $(`#${f.id}`);
    const errorEl = $(`#${f.errorId}`);
    if (!input) return true;

    const error = f.validate(input.value);
    if (error) {
      input.classList.add('error');
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) {
        errorEl.textContent = error;
        errorEl.style.opacity = '1';
      }
      return false;
    } else {
      input.classList.remove('error');
      input.removeAttribute('aria-invalid');
      if (errorEl) {
        errorEl.textContent = '';
      }
      return true;
    }
  }

  // Real-time listeners
  fields.forEach(f => {
    const input = $(`#${f.id}`);
    if (!input) return;

    input.addEventListener('blur', () => validateField(f));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(f);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalid = null;

    fields.forEach(f => {
      const isValid = validateField(f);
      if (!isValid) {
        isFormValid = false;
        if (!firstInvalid) {
          firstInvalid = $(`#${f.id}`);
        }
      }
    });

    if (!isFormValid) {
      form.classList.remove('form-shake');
      void form.offsetWidth;
      form.classList.add('form-shake');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    }

    if (typeof triggerGravityParticles === 'function' && submitBtn) {
      try { triggerGravityParticles(submitBtn); } catch (err) {}
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Get My Quote';
      }
      window.location.href = '404.html';
    }, 400);
  });
})();

/* ══════════════════════════════════════════════════════
   7D. BLOG SEARCH FORM — VALIDATION & ARTICLE FILTERING
   ══════════════════════════════════════════════════════ */
(function initBlogSearch() {
  const form = $('#blog-search-form');
  if (!form) return;

  const input = $('#blog-search-input');
  const feedback = $('#blog-search-feedback');
  const cards = $$('.blog-card');

  const showFeedback = (html, type = 'info') => {
    if (!feedback) return;
    feedback.innerHTML = html;
    feedback.className = `blog-search__feedback show is-${type}`;
  };

  const clearFeedback = () => {
    if (!feedback) return;
    feedback.innerHTML = '';
    feedback.className = 'blog-search__feedback';
  };

  const resetFilter = () => {
    cards.forEach(card => {
      card.style.display = '';
      card.style.opacity = '1';
    });
    if (input) {
      input.value = '';
      input.style.borderColor = '';
      input.style.boxShadow = '';
    }
    clearFeedback();
  };

  if (input) {
    input.addEventListener('input', () => {
      if (feedback && feedback.classList.contains('is-error')) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
        clearFeedback();
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input) return;

    const query = input.value.trim().toLowerCase();

    // Validation: Empty query
    if (!query) {
      input.style.borderColor = '#EF4444';
      input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.25)';
      showFeedback('<i class="fa-solid fa-circle-exclamation"></i> Please enter a keyword to search (e.g. "Property", "Risk", "Commercial", "Policy").', 'error');
      input.focus();
      return;
    }

    // Validation: Query too short
    if (query.length < 2) {
      input.style.borderColor = '#EF4444';
      input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.25)';
      showFeedback('<i class="fa-solid fa-circle-exclamation"></i> Please enter at least 2 characters to search.', 'error');
      input.focus();
      return;
    }

    input.style.borderColor = '';
    input.style.boxShadow = '';

    window.location.href = '404.html';
  });
})();

/* ══════════════════════════════════════════════════════
   8. INDUSTRY CARD PARALLAX ON MOUSE MOVE
   ══════════════════════════════════════════════════════ */
(function initCardParallax() {
  const cards = $$('.industry__card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
})();

/* ══════════════════════════════════════════════════════
   9. POLICY ITEMS HOVER RIPPLE EFFECT
   ══════════════════════════════════════════════════════ */
(function initRipple() {
  $$('.policy__item').forEach(item => {
    item.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        background: rgba(244,211,94,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim 0.6s ease-out;
        pointer-events: none;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Inject ripple keyframe
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(2.5); opacity: 0; }
    }
  `;
  document.head.appendChild(styleEl);
})();

/* ══════════════════════════════════════════════════════
   10. HERO: TILT EFFECT ON PHONE MOCKUP
   ══════════════════════════════════════════════════════ */
(function initHeroTilt() {
  const visual = $('.hero__phone-mockup');
  const hero = $('.hero');
  if (!visual || !hero) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    visual.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateY(${Math.sin(Date.now() / 2000) * 12}px)`;
    visual.style.transition = 'transform 0.15s ease';
  });

  hero.addEventListener('mouseleave', () => {
    visual.style.transform = '';
    visual.style.transition = 'transform 0.7s ease';
  });
})();

/* ══════════════════════════════════════════════════════
   11. STATISTICS SECTION: STAGGERED ENTRANCE
   ══════════════════════════════════════════════════════ */
(function initStatsStagger() {
  const statsSection = $('.stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        const items = $$('.stats__item', statsSection);
        items.forEach((item, i) => {
          item.style.transitionDelay = `${i * 0.12}s`;
        });
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(statsSection);
})();

/* ══════════════════════════════════════════════════════
   12. TESTIMONIAL AUTO-SCROLL INDICATOR
   ══════════════════════════════════════════════════════ */
(function initTestimonialEffect() {
  const card = $('.testimonial__card');
  if (!card) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // Animate the room SVG elements with staggered delays
        const svgParts = $$('line, path, rect, ellipse, circle', card);
        svgParts.forEach((part, i) => {
          part.style.opacity = '0';
          part.style.transition = `opacity 0.5s ease ${0.1 + i * 0.03}s`;
          requestAnimationFrame(() => {
            part.style.opacity = '1';
          });
        });
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  observer.observe(card);
})();

/* ══════════════════════════════════════════════════════
   13. SCROLL PROGRESS INDICATOR (thin top bar)
   ══════════════════════════════════════════════════════ */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress-bar';
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #F4D35E, #E6C245);
    z-index: 2000;
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (scrollTop / docH) * 100 : 0;
    bar.style.width = `${pct}%`;
  }, { passive: true });
})();

/* ══════════════════════════════════════════════════════
   14. WORKFLOW STEPS SEQUENTIAL ANIMATION
   ══════════════════════════════════════════════════════ */
(function initWorkflowSteps() {
  const steps = $$('.workflow__step');
  if (!steps.length) return;

  steps.forEach((step, i) => {
    step.style.setProperty('--delay', `${0.1 + i * 0.15}s`);
  });
})();

/* ══════════════════════════════════════════════════════
   15. BUTTON MAGNETIC HOVER EFFECT
   ══════════════════════════════════════════════════════ */
(function initMagneticButtons() {
  const buttons = $$('.btn--dark:not(.quote-form__submit), .btn--outline');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.25;

      btn.style.transform = `translate(${x * strength}px, ${y * strength}px) translateY(-1px)`;
      btn.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease';
    });
  });
})();

/* ══════════════════════════════════════════════════════
   16. INITIALISE ON DOM READY
   ══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Add active class to CSS nav links
  const style = document.createElement('style');
  style.textContent = `
    .nav__link.active::after { right: 0; }
    .nav__link.active { font-weight: 600; }
  `;
  document.head.appendChild(style);

  // Ensure body scroll position is at top on load
  if (window.location.hash === '') {
    window.scrollTo(0, 0);
  }

  console.info('%cStackly Business Insurance — Loaded', 'color: #F4D35E; font-weight: bold; font-size: 14px;');
});

/* ══════════════════════════════════════════════════════
   17. BLOG — READ THE ARTICLE & READ MORE → 404
   ══════════════════════════════════════════════════════ */
(function initBlogArticleButtons() {
  // Targets: .open-article-btn (all "Read the Article" and "Read More" buttons on blog.html)
  const articleBtns = document.querySelectorAll('.open-article-btn');
  articleBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });
})();

/* ══════════════════════════════════════════════════════
   18. CONTACT PAGE — DETAIL STRIP, SLA BADGES & DESK
       CONTACT LINKS → 404
   ══════════════════════════════════════════════════════ */
(function initContactPageButtons() {
  // 1. Contact detail strip items (Office Address, Phone, Email, Office Hours)
  const detailItems = document.querySelectorAll('.contact-detail-item');
  detailItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });

  // 2. SLA badges on each dept card
  const slaBadges = document.querySelectorAll('.dept-card__sla');
  slaBadges.forEach((badge) => {
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });

  // 3. Dept card Direct Line & Email contact links
  const deptContactLinks = document.querySelectorAll('.dept-contact-link');
  deptContactLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '404.html';
    });
  });
})();
