/*!
 * AIACOCONTABLE.js — v3
 * Stack: Lenis (smooth scroll) · GSAP 3 + ScrollTrigger
 *        Lucide icons · Vanilla JS
 *
 * Sections:
 *  1. Init order
 *  2. Lucide icons
 *  3. Page loader
 *  4. Lenis smooth scroll
 *  5. Custom cursor
 *  6. Navbar stuck + scroll spy
 *  7. Hamburger / mobile drawer
 *  8. GSAP hero entrance
 *  9. GSAP scroll reveals
 * 10. KPI counter
 * 11. FAQ accordion
 * 12. Contact form
 * 13. Pricing tilt (desktop)
 */

/* ═══════════════════════════════════════
   1. INIT ORDER
═══════════════════════════════════════ */
(function () {
  'use strict';

  // Kick off after DOM is parsed (scripts are deferred inline)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

  function bootstrap () {
    initLucide();
    initLoader();
    initLenis();
    initCursor();
    initNavbar();
    initHamburger();
    initHeroGSAP();
    initScrollReveal();
    initKPICounter();
    initFAQ();
    initForm();
    initPricingTilt();
  }

  /* ═══════════════════════════════════════
     2. LUCIDE ICONS
  ═══════════════════════════════════════ */
  function initLucide () {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /* ═══════════════════════════════════════
     3. PAGE LOADER
  ═══════════════════════════════════════ */
  function initLoader () {
    const loader = document.getElementById('loader');
    const fill   = document.getElementById('loaderFill');
    const pct    = document.getElementById('loaderPct');
    if (!loader) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20 + 5;
      if (progress >= 100) { progress = 100; clearInterval(interval); }
      const val = Math.floor(progress);
      if (fill) fill.style.width = val + '%';
      if (pct)  pct.textContent  = val + '%';
    }, 80);

    // Hide on full load
    function hide () {
      clearInterval(interval);
      if (fill) fill.style.width = '100%';
      if (pct)  pct.textContent  = '100%';
      setTimeout(() => loader.classList.add('gone'), 250);
    }

    if (document.readyState === 'complete') {
      setTimeout(hide, 400);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 300));
    }
    // Hard fallback
    setTimeout(hide, 3000);
  }

  /* ═══════════════════════════════════════
     4. LENIS SMOOTH SCROLL
  ═══════════════════════════════════════ */
  let lenis;

  function initLenis () {
    if (typeof Lenis === 'undefined') return;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;

    lenis = new Lenis({
      duration: 1.15,
      easing:   t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth:   true,
      smoothTouch: false,
    });

    // Connect GSAP ticker → Lenis
    if (typeof gsap !== 'undefined') {
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      // Fallback RAF
      (function raf (time) { lenis.raf(time); requestAnimationFrame(raf); })(0);
    }

    // Anchor smooth scroll with offset for fixed nav
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -78, duration: 1.2 });
      });
    });
  }

  /* ═══════════════════════════════════════
     5. CUSTOM CURSOR
  ═══════════════════════════════════════ */
  function initCursor () {
    // Skip custom cursor on touch devices
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      const dot0  = document.getElementById("curDot");
      const ring0 = document.getElementById("curRing");
      if (dot0) dot0.style.display = "none";
      if (ring0) ring0.style.display = "none";
      document.body.style.cursor = "";
      return;
    }

    const dot  = document.getElementById('curDot');
    const ring = document.getElementById('curRing');
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

    // RAF loop for butter-smooth follower
    (function loop () {
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
      rx += (mx - rx) * 0.095;
      ry += (my - ry) * 0.095;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();

    // Expand on interactive elements
    const interactives = document.querySelectorAll(
      'a, button, .srv-card, .pkg-card, .faq-trigger, input, select, textarea, .ch-card'
    );
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('expand'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
    });
  }

  /* ═══════════════════════════════════════
     6. NAVBAR STUCK + SCROLL SPY
  ═══════════════════════════════════════ */
  function initNavbar () {
    const nav     = document.getElementById('navbar');
    const links   = document.querySelectorAll('.nav-link, .drawer-link');
    const sections = document.querySelectorAll('section[id]');
    if (!nav) return;

    // Stuck class
    const onScroll = () => {
      nav.classList.toggle('stuck', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Scroll spy
    if (!sections.length || !links.length) return;
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = '#' + e.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
      });
    }, { rootMargin: '-35% 0px -58% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ═══════════════════════════════════════
     7. HAMBURGER / MOBILE DRAWER
  ═══════════════════════════════════════ */
  function initHamburger () {
    const btn    = document.getElementById('hamBtn');
    const drawer = document.getElementById('navDrawer');
    const scrim  = document.getElementById('navScrim');
    if (!btn || !drawer) return;

    let lastFocus = null;
    let trapHandler = null;

    const focusablesSelector = 'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])';

    function setScrim (show) {
      if (!scrim) return;
      if (show) {
        scrim.style.display = 'block';
        requestAnimationFrame(() => scrim.classList.add('show'));
      } else {
        scrim.classList.remove('show');
        setTimeout(() => { scrim.style.display = ''; }, 260);
      }
    }

    function trapFocus () {
      const focusables = Array.from(drawer.querySelectorAll(focusablesSelector))
        .filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);

      if (!focusables.length) return;

      const first = focusables[0];
      const last  = focusables[focusables.length - 1];

      trapHandler = (e) => {
        if (e.key === 'Escape') { close(); return; }
        if (e.key !== 'Tab') return;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };

      drawer.addEventListener('keydown', trapHandler);
    }

    function open () {
      lastFocus = document.activeElement;
      btn.classList.add('is-open');
      drawer.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('nav-open');
      setScrim(true);

      // Focus drawer (accessibility)
      setTimeout(() => {
        drawer.focus();
        const firstLink = drawer.querySelector('.drawer-link, .drawer-cta');
        if (firstLink) firstLink.focus();
        trapFocus();
      }, 0);

      // Animate list items with GSAP if available
      if (typeof gsap !== 'undefined') {
        gsap.fromTo('.drawer-list li',
          { x: 22, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.42, stagger: 0.06, ease: 'power3.out', delay: 0.08, overwrite: true }
        );
      }
    }

    function close () {
      btn.classList.remove('is-open');
      drawer.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('nav-open');
      setScrim(false);

      if (trapHandler) {
        drawer.removeEventListener('keydown', trapHandler);
        trapHandler = null;
      }
      if (lastFocus && typeof lastFocus.focus === 'function') {
        lastFocus.focus();
      }
    }

    btn.addEventListener('click', () => {
      btn.getAttribute('aria-expanded') === 'true' ? close() : open();
    });

    if (scrim) scrim.addEventListener('click', close);

    drawer.querySelectorAll('.drawer-link, .drawer-cta').forEach(a => {
      a.addEventListener('click', close);
    });

    window.addEventListener('resize', () => {
      // Close drawer when switching to desktop
      if (window.innerWidth > 768 && drawer.classList.contains('open')) close();
    }, { passive: true });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) close();
    });
  }

  /* ═══════════════════════════════════════
     8. GSAP HERO ENTRANCE
  ═══════════════════════════════════════ */
  function initHeroGSAP () {
    if (typeof gsap === 'undefined') {
      // CSS fallback
      document.querySelectorAll('.gsap-fadeup').forEach((el, i) => {
        el.style.transition = `opacity .7s ${i * .12}s ease, transform .7s ${i * .12}s ease`;
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 100);
      });
      return;
    }

    const tl = gsap.timeline({ delay: 0.35 });

    // Glows
    tl.from('.hbg-glow', { opacity: 0, scale: 0.6, duration: 1.6, ease: 'power3.out', stagger: 0.25 }, 0);

    // Hero elements stagger
    const heroEls = document.querySelectorAll('.gsap-fadeup');
    heroEls.forEach((el, i) => {
      tl.to(el,
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
        0.1 + i * 0.11
      );
    });

    // Ticker fade
    tl.from('.ticker-wrap', { opacity: 0, y: 12, duration: 0.6, ease: 'power2.out' }, 0.95);

    // Scroll cue
    tl.from('.scroll-cue', { opacity: 0, x: 14, duration: 0.55, ease: 'power2.out' }, 1.0);
  }

  /* ═══════════════════════════════════════
     9. GSAP SCROLL REVEALS
  ═══════════════════════════════════════ */
  function initScrollReveal () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      fallbackReveal();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Helper
    const reveal = (selector, vars, triggerVars) => {
      const els = document.querySelectorAll(selector);
      if (!els.length) return;
      els.forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 38,
          duration: 0.75,
          delay: (vars.staggerBase || 0) * i,
          ease: 'power3.out',
          ...vars,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
            ...triggerVars,
          },
        });
      });
    };

    // Trust items
    gsap.from('.trust-item', {
      opacity: 0, y: 20, stagger: 0.08, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: '.trust', start: 'top 88%', once: true },
    });

    // Section headers
    reveal('.sec-head', { y: 30, duration: 0.8 });

    // Service cards — fan in
    document.querySelectorAll('.srv-card').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 44, scale: 0.97,
        duration: 0.72, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 89%', once: true },
      });
    });

    // Pricing cards
    document.querySelectorAll('.pkg-card').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 52,
        duration: 0.82, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    // Process steps — slide in from left
    document.querySelectorAll('.proc-step').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, x: -36,
        duration: 0.72, delay: i * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    // FAQ items
    document.querySelectorAll('.faq-item').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: 20,
        duration: 0.58, delay: i * 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    // Contact channels
    document.querySelectorAll('.ch-card').forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, x: -24,
        duration: 0.6, delay: i * 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    });

    // Contact form
    const ctForm = document.querySelector('.ct-form');
    if (ctForm) {
      gsap.from(ctForm, {
        opacity: 0, y: 32, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ctForm, start: 'top 88%', once: true },
      });
    }

    // Footer
    gsap.from('.foot-brand, .foot-col', {
      opacity: 0, y: 24, stagger: 0.09, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: '.footer', start: 'top 90%', once: true },
    });
  }

  // Intersection Observer fallback (no GSAP)
  function fallbackReveal () {
    const targets = document.querySelectorAll(
      '.sec-head,.srv-card,.pkg-card,.proc-step,.faq-item,.ch-card,.trust-item'
    );
    targets.forEach(el => {
      el.style.cssText += 'opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease;';
    });
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'none';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    targets.forEach(el => obs.observe(el));
  }

  /* ═══════════════════════════════════════
     10. KPI COUNTER
  ═══════════════════════════════════════ */
  function initKPICounter () {
    const nums = document.querySelectorAll('.kpi-num[data-count]');
    if (!nums.length) return;

    function animateNum (el) {
      const target = parseInt(el.dataset.count, 10);
      const dur    = 1800;
      const start  = performance.now();
      function step (now) {
        const t    = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 4); // ease out quart
        el.textContent = Math.round(ease * target);
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    }

    const seen = new Set();
    const obs  = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && !seen.has(e.target)) {
          seen.add(e.target);
          animateNum(e.target);
        }
      });
    }, { threshold: 0.7 });
    nums.forEach(el => obs.observe(el));
  }

  /* ═══════════════════════════════════════
     11. FAQ ACCORDION
  ═══════════════════════════════════════ */
  function initFAQ () {
    document.querySelectorAll('.faq-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        const panel  = btn.nextElementSibling;

        // Close all
        document.querySelectorAll('.faq-trigger').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          const p = b.nextElementSibling;
          if (p) p.classList.remove('open');
        });

        // Toggle
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          if (panel) panel.classList.add('open');
        }
      });
    });
  }

  /* ═══════════════════════════════════════
     12. CONTACT FORM
  ═══════════════════════════════════════ */
  function initForm () {
    const form    = document.getElementById('ctForm');
    const success = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('ctSubmit');
    if (!form) return;

    // Inject shake keyframe once
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes field-shake {
        0%,100%{transform:translateX(0)}
        20%,60%{transform:translateX(-7px)}
        40%,80%{transform:translateX(7px)}
      }
      .err{animation:field-shake .38s ease}
    `;
    document.head.appendChild(styleEl);

    // Remove error on user input
    form.querySelectorAll('input,textarea').forEach(el => {
      el.addEventListener('input', () => {
        el.classList.remove('err');
        el.style.animation = '';
      });
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();

      // Honeypot
      if (form.querySelector('[name="_trap"]')?.value) return;

      const nombre = form.querySelector('#f-nombre');
      const email  = form.querySelector('#f-email');
      const msg    = form.querySelector('#f-msg');
      const pkg    = form.querySelector('#f-pkg');
      const tel    = form.querySelector('#f-tel');

      // Validate
      let ok = true;
      [nombre, email, msg].forEach(el => {
        el.classList.remove('err');
        if (!el.value.trim()) {
          el.classList.add('err');
          ok = false;
          // Re-trigger animation
          void el.offsetWidth;
        }
      });
      if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('err');
        void email.offsetWidth;
        ok = false;
      }
      if (!ok) { form.querySelector('.err')?.focus(); return; }

      // Loading state
      const origContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="width:1em;height:1em;animation:spin 1s linear infinite" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
        </svg>
        Enviando…
      `;

      // Inject spin keyframe
      if (!document.getElementById('spin-style')) {
        const ss = document.createElement('style');
        ss.id = 'spin-style';
        ss.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
        document.head.appendChild(ss);
      }

      await sleep(900);

      // Build WhatsApp message
      const waLines = [
        'Hola, vi su página y quiero cotizar un servicio contable.',
        '',
        `• Nombre: ${nombre.value.trim()}`,
        `• Email: ${email.value.trim()}`,
        tel.value  ? `• Teléfono: ${tel.value.trim()}` : '',
        pkg.value  ? `• Paquete: ${pkg.value}` : '',
        '',
        msg.value.trim(),
      ].filter(Boolean).join('\n');

      // Show success
      submitBtn.style.display = 'none';
      if (success) {
        success.style.display = 'flex';
        if (typeof lucide !== 'undefined') lucide.createIcons(); // re-render icon inside
      }
      form.reset();

      // Open WhatsApp
      setTimeout(() => {
        window.open(
          `https://wa.me/525570669666?text=${encodeURIComponent(waLines)}`,
          '_blank', 'noopener,noreferrer'
        );
      }, 800);
    });
  }

  /* ═══════════════════════════════════════
     13. PRICING TILT (desktop only)
  ═══════════════════════════════════════ */
  function initPricingTilt () {
    if (window.innerWidth < 1024) return;
    document.querySelectorAll('.pkg-card').forEach(card => {
      const reset = () => (card.style.transform = '');
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const x  = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
        const y  = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
        card.style.transform = `perspective(800px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', reset);
    });
  }

  /* ── Utility ── */
  function sleep (ms) { return new Promise(r => setTimeout(r, ms)); }

})();
