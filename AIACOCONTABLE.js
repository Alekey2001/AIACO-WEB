(() => {
  // Icons
  if (window.lucide) window.lucide.createIcons();

  // Year
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  const root = document.documentElement;

  // Page load fade-in + blur
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove("is-loading");
    });
  });

  // Theme
  const themeBtn = document.querySelector(".theme-toggle");
  const storedTheme = localStorage.getItem("aiaco_theme");
  if (storedTheme === "light" || storedTheme === "dark") root.setAttribute("data-theme", storedTheme);

  const setTheme = (t) => {
    root.setAttribute("data-theme", t);
    localStorage.setItem("aiaco_theme", t);
  };

  themeBtn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });

  // Mobile menu
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.getElementById("mobileMenu");
  const closeBtn = document.querySelector(".close-btn");
  const backdrop = document.querySelector(".mobile-menu__backdrop");
  const mobileLinks = document.querySelectorAll(".nav--mobile a");

  const openMenu = () => {
    if (!menu) return;
    menu.hidden = false;
    menuBtn?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    if (!menu) return;
    menu.hidden = true;
    menuBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  menuBtn?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  backdrop?.addEventListener("click", closeMenu);
  mobileLinks.forEach((a) => a.addEventListener("click", closeMenu));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu && !menu.hidden) closeMenu();
  });

  // Smooth scroll (offset dinámico por header fijo)
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const getHeaderOffset = () => {
    const header = document.querySelector(".header");
    const h = header ? header.getBoundingClientRect().height : 74;
    // pequeño margen extra para que el título del section respire
    return Math.ceil(h + 12);
  };

  const smoothScrollTo = (targetY, duration = 650) => {
    const startY = window.scrollY;
    const diff = targetY - startY;
    const start = performance.now();

    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(p);
      window.scrollTo(0, startY + diff * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      smoothScrollTo(y);
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  revealEls.forEach((el) => io.observe(el));

  // Split text
  const splitTargets = document.querySelectorAll("[data-split]");
  splitTargets.forEach((el) => {
    if (el.querySelector(".w")) return;
    const text = el.textContent || "";
    const words = text.trim().split(/\s+/);

    el.setAttribute("aria-label", text.trim());
    el.innerHTML = words
      .map((w, i) => `<span class="w" style="--d:${i * 18}ms">${w}</span>`)
      .join(" ");

    el.classList.add("split");
  });

  const splitObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("split-in");
        splitObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.22 }
  );
  document.querySelectorAll(".split").forEach((el) => splitObserver.observe(el));

  const style = document.createElement("style");
  style.textContent = `
    .split .w{
      display:inline-block;
      transform: translateY(12px);
      opacity:0;
      filter: blur(6px);
      transition: transform .7s cubic-bezier(.2,.8,.2,1), opacity .7s cubic-bezier(.2,.8,.2,1), filter .7s cubic-bezier(.2,.8,.2,1);
      transition-delay: var(--d);
    }
    .split.split-in .w{transform: translateY(0); opacity:1; filter: blur(0)}
    @media (prefers-reduced-motion: reduce){
      .split .w{transition:none; opacity:1; transform:none; filter:none}
    }
  `;
  document.head.appendChild(style);

  // Top progress
  const progress = document.querySelector(".top-progress");
  const updateProgress = () => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    if (progress) progress.style.width = `${pct}%`;
  };

  // Parallax
  const parallaxEls = Array.from(document.querySelectorAll("[data-parallax]")).map((el) => ({
    el,
    k: parseFloat(el.getAttribute("data-parallax") || "0.12"),
  }));

  const tickParallax = () => {
    const vh = window.innerHeight || 800;
    parallaxEls.forEach(({ el, k }) => {
      const r = el.getBoundingClientRect();
      const t = (r.top + r.height * 0.5 - vh * 0.5) / vh;
      const y = -t * 28 * k;
      el.style.transform = `translateY(${y.toFixed(2)}px)`;
    });
  };

  // Hero subtle transform
  const heroMedia = document.getElementById("heroMedia");
  const tickHero = () => {
    if (!heroMedia) return;
    const r = heroMedia.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (120 - r.top) / 320));
    const scale = 1 + t * 0.018;
    const rotate = t * 0.28;
    heroMedia.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
  };

  const onScroll = () => {
    updateProgress();
    tickParallax();
    tickHero();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Spotlight hover
  const setPointerVars = (el, e) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };
  const pointerTargets = document.querySelectorAll(".cardfx, .btn--primary, .media-card");
  pointerTargets.forEach((el) => {
    el.addEventListener("pointermove", (e) => setPointerVars(el, e));
  });

  // Magnetic hover
  const magneticEls = document.querySelectorAll(".magnetic");
  magneticEls.forEach((el) => {
    let raf = null;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const tx = (dx / rect.width) * 10;
      const ty = (dy / rect.height) * 10;

      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
      });
    };

    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
  });

  // Count-up stats
  const countEls = document.querySelectorAll("[data-count]");
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-count") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
        const dur = 900;
        const t0 = performance.now();

        const step = (now) => {
          const p = Math.min(1, (now - t0) / dur);
          const v = Math.round(target * easeOutCubic(p));
          el.textContent = `${v}${suffix}`;
          if (p < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.35 }
  );
  countEls.forEach((el) => countObserver.observe(el));
})();
