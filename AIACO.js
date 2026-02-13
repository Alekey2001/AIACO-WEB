/* =========================================================
  AIACO — Interacciones UI premium
  Archivo: AIACO.js

  Incluye:
  - Menú móvil
  - Reveal animations (IntersectionObserver)
  - Contadores (stats)
  - Modal video (hero demo)
  - Tabs de capturas (Sitios Web / Contabilidad / Juegos)
  - Toast + copiar email
========================================================= */

(function () {
  // Icons
  if (window.lucide) lucide.createIcons();

  // ====== Helpers
  const $ = (q, el = document) => el.querySelector(q);
  const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));

  // ====== Footer year
  const yearNow = $("#yearNow");
  if (yearNow) yearNow.textContent = new Date().getFullYear();

  // ====== Mobile nav
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    $$("#navMenu a").forEach((a) => {
      a.addEventListener("click", () => {
        if (navMenu.classList.contains("is-open")) {
          navMenu.classList.remove("is-open");
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.setAttribute("aria-label", "Abrir menú");
        }
      });
    });
  }

  // ====== Toast
  const toast = $("#toast");
  let toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // ====== Copy email
  const EMAIL = "AIACO_E_M_P@hotmail.com";
  const copyEmail = $("#copyEmail");
  if (copyEmail) {
    copyEmail.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
        showToast("Email copiado ✅");
      } catch {
        showToast("No se pudo copiar (permiso del navegador).");
      }
    });
  }

  // ====== Reveal on scroll
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = $$(".reveal");

  if (!reduceMotion && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // ====== Counters
  const counters = $$("[data-count]");
  function animateCount(el, to) {
    const isYear = to >= 1000;
    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.floor(to * eased);

      // “+24” “+12” y “2025”
      el.textContent = isYear ? String(val) : `+${val}`;

      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  if (counters.length) {
    const ioCount = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const to = Number(el.getAttribute("data-count") || "0");
            animateCount(el, to);
            ioCount.unobserve(el);
          }
        }
      },
      { threshold: 0.35 }
    );

    counters.forEach((el) => ioCount.observe(el));
  }

  // ====== Video modal (hero)
  const openVideo = $("#openVideo");
  const modal = $("#videoModal");
  const closeVideo = $("#closeVideo");
  const closeVideoBtn = $("#closeVideoBtn");
  const modalVideo = $("#modalVideo");

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (modalVideo) {
      try {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      } catch {}
    }
  }

  function openModal() {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  if (openVideo && modal) {
    openVideo.addEventListener("click", () => {
      openModal();
      showToast("Abriendo demo…");
    });
  }
  if (closeVideo) closeVideo.addEventListener("click", closeModal);
  if (closeVideoBtn) closeVideoBtn.addEventListener("click", closeModal);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) closeModal();
  });

  // ====== Capturas tabs (Sitios Web / Contabilidad / Juegos)
  const shotTitle = $("#shotTitle");
  const shotDesc = $("#shotDesc");
  const shotBullets = $("#shotBullets");
  const shotDesktopName = $("#shotDesktopName");
  const shotPhoneName = $("#shotPhoneName");

  const SHOTS = {
    web: {
      title: "Sitios Web que convierten",
      desc: "UI premium, copy claro, SEO técnico y performance. Listo para captar clientes.",
      bullets: [
        "Landing / multi-page",
        "Optimización Core Web Vitals",
        "Integraciones (WhatsApp, forms, analytics)"
      ],
      desktop: "web-desktop.jpg",
      phone: "web-phone.jpg"
    },
    conta: {
      title: "Contabilidad clara y controlada",
      desc: "Orden administrativo, reportes y procesos para que tu negocio funcione con tranquilidad.",
      bullets: [
        "Paquetes por tipo de negocio",
        "Reportes y control financiero",
        "Documentación y seguimiento"
      ],
      desktop: "conta-desktop.jpg",
      phone: "conta-phone.jpg"
    },
    games: {
      title: "AIACO Juegos: prototipos a releases",
      desc: "De concepto a producto con dirección, prototipado y plan de lanzamiento.",
      bullets: [
        "Prototipado rápido",
        "UI/UX para juegos",
        "Roadmap de publicación"
      ],
      desktop: "games-desktop.jpg",
      phone: "games-phone.jpg"
    }
  };

  function setShot(key) {
    const s = SHOTS[key];
    if (!s) return;

    if (shotTitle) shotTitle.textContent = s.title;
    if (shotDesc) shotDesc.textContent = s.desc;

    if (shotBullets) {
      shotBullets.innerHTML = "";
      s.bullets.forEach((txt) => {
        const li = document.createElement("li");
        li.innerHTML = `<i data-lucide="check"></i> ${txt}`;
        shotBullets.appendChild(li);
      });
      // re-render icons
      if (window.lucide) lucide.createIcons();
    }

    if (shotDesktopName) shotDesktopName.textContent = s.desktop;
    if (shotPhoneName) shotPhoneName.textContent = s.phone;

    // TODO opcional (si usas imágenes reales):
    // const desktop = document.getElementById("shotDesktop");
    // const phone = document.getElementById("shotPhone");
    // desktop.style.backgroundImage = `url(/images/screens/${s.desktop})`;
    // desktop.style.backgroundSize = "cover";
    // phone.style.backgroundImage = `url(/images/screens/${s.phone})`;
    // phone.style.backgroundSize = "cover";
  }

  const chips = $$(".shot-controls .chip");
  if (chips.length) {
    chips.forEach((btn) => {
      btn.addEventListener("click", () => {
        chips.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const key = btn.getAttribute("data-shot");
        setShot(key);
      });
    });

    // default
    setShot("web");
  }

  // ====== Form validation (sin backend)
  const form = $("#contactForm");
  const formNote = $("#formNote");

  function setNote(msg, ok = true) {
    if (!formNote) return;
    formNote.textContent = msg;
    formNote.style.color = ok ? "" : "rgba(239,68,68,.95)";
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const service = String(data.get("service") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !email || !service || !message) {
        setNote("Completa todos los campos, por favor.", false);
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        setNote("Email inválido. Verifica e inténtalo de nuevo.", false);
        return;
      }

      setNote("Listo ✅ (demo). Conecta este formulario a Netlify Forms o tu API para envío real.");
      showToast("Mensaje listo ✅");
      form.reset();
    });
  }
})();
