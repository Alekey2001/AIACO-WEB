// Servicio.js - Funcionalidades para la página de Términos de Servicio

document.addEventListener('DOMContentLoaded', function() {
    // ===== VARIABLES GLOBALES =====
    const acceptButton = document.getElementById('acceptButton');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const quickNavCards = document.querySelectorAll('.nav-card');
    
    // ===== FUNCIÓN PARA INICIALIZAR TODO =====
    function init() {
        setupEventListeners();
        setupScrollSpy();
        setupAnimations();
        updateActiveSection();
        checkMobileMenu();
        enhanceAccessibility();
        
        // Mostrar confirmación de que la página está lista
        console.log('Página de Términos de Servicio AIACO-WEB cargada correctamente');
    }
    
    // ===== CONFIGURAR EVENT LISTENERS =====
    function setupEventListeners() {
        // Botón de aceptación de términos
        if (acceptButton) {
            acceptButton.addEventListener('click', handleAcceptTerms);
        }
        
        // Menú móvil
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Cerrar menú móvil al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Navegación rápida
        quickNavCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                scrollToSection(targetId);
            });
        });
        
        // Botón de descarga PDF
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // ruta relativa al PDF en la carpeta PDF/
                downloadPDF('PDF/AIACO_Terminos_y_Politica_Privacidad.pdf');
            });
        }
        
        // Actualizar sección activa al hacer scroll
        window.addEventListener('scroll', updateActiveSection);
        
        // Cerrar menú móvil al redimensionar la ventana
        window.addEventListener('resize', checkMobileMenu);
    }
    
     // ===== MANEJADOR DE ACEPTACIÓN DE TÉRMINOS =====
   function handleAcceptTerms() {
    const endpoint = '/api/accept-terms'; // Cambia según tu backend
    const modal = document.createElement('div');
    modal.className = 'terms-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
        <div class="modal-content" role="document" aria-labelledby="terms-title">
            <div class="modal-header">
                <h3 id="terms-title"><i class="fas fa-check-circle" aria-hidden="true"></i> Confirmar aceptación</h3>
                <button class="modal-close" aria-label="Cerrar diálogo">&times;</button>
            </div>
            <div class="modal-body">
                <p>¿Deseas aceptar los Términos de Servicio de AIACO-WEB? Esta acción será registrada.</p>
                <div class="modal-actions">
                    <button class="btn-primary confirm-btn">Aceptar</button>
                    <button class="btn-secondary cancel-btn">Cancelar</button>
                </div>
            </div>
        </div>
        <div class="modal-overlay" tabindex="-1" aria-hidden="true"></div>
    `;

    // Estilos mejorados y focus states
    const style = document.createElement('style');
    style.textContent = `
        .terms-modal { position: fixed; inset: 0; z-index: 2000; display:flex; align-items:center; justify-content:center; }
        .modal-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.55); z-index:1; }
        .modal-content { position:relative; background:#fff; border-radius:10px; width:90%; max-width:520px; box-shadow:0 20px 30px rgba(0,0,0,0.2); outline: none; z-index:2; }
        .modal-header { display:flex; justify-content:space-between; align-items:center; padding:1.25rem; background:linear-gradient(135deg,#2563eb,#7c3aed); color:#fff; }
        .modal-header h3 { margin:0; font-size:1.125rem; }
        .modal-close { background:none; border:none; color:#fff; font-size:1.5rem; cursor:pointer; }
        .modal-body { padding:1.5rem; color:#374151; }
        .modal-actions { display:flex; gap:0.75rem; justify-content:flex-end; }
        .btn-primary { background:#2563eb; color:#fff; border:none; padding:0.6rem 0.9rem; border-radius:6px; cursor:pointer; }
        .btn-primary:focus { outline:3px solid rgba(37,99,235,0.25); }
        .btn-secondary { background:#e5e7eb; color:#111827; border:none; padding:0.6rem 0.9rem; border-radius:6px; cursor:pointer; }
        .btn-secondary:focus { outline:3px solid rgba(0,0,0,0.08); }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);

    // Accessibility: focus trap
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = modal.querySelectorAll(focusableSelector);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];
    const previouslyFocused = document.activeElement;
    if (firstFocusable) firstFocusable.focus();

    function trapFocus(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { if (document.activeElement === firstFocusable) { e.preventDefault(); lastFocusable.focus(); } }
            else { if (document.activeElement === lastFocusable) { e.preventDefault(); firstFocusable.focus(); } }
        }
        if (e.key === 'Escape') closeModal();
    }

    function closeModal() {
        document.removeEventListener('keydown', trapFocus);
        if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
        if (previouslyFocused) previouslyFocused.focus();
    }

    document.addEventListener('keydown', trapFocus);

    modal.querySelector('.cancel-btn').addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    const confirmBtn = modal.querySelector('.confirm-btn');
    if (!confirmBtn) {
        console.error('Botón de confirmar no encontrado en el modal');
        return;
    }
    confirmBtn.addEventListener('click', function() {
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'Enviando...';
        // Enviar al servidor la aceptación
        fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accepted: true, timestamp: new Date().toISOString() })
        }).then(res => {
            if (!res.ok) throw new Error('Error en el servidor');
            return res.json().catch(() => ({}));
        }).then(() => {
            showNotification('Términos aceptados y registrados.', 'success');
            setTimeout(() => { closeModal(); window.location.href = 'https://aiacoweb.netlify.app/createweb'; }, 900);
        }).catch(err => {
            console.error('Error al enviar aceptación:', err);
            // Fallback: guardar localmente si el servidor no está disponible
            try {
                const key = 'aiaco_acceptances';
                const list = JSON.parse(localStorage.getItem(key) || '[]');
                list.push({ accepted: true, timestamp: new Date().toISOString(), fallback: true });
                localStorage.setItem(key, JSON.stringify(list));
                showNotification('Aceptación guardada localmente (sin conexión).', 'success');
                setTimeout(() => { closeModal(); window.location.href = 'https://aiacoweb.netlify.app/createweb'; }, 900);
            } catch (e2) {
                console.error('Fallback local fallo:', e2);
                showNotification('No se pudo registrar la aceptación. Intenta de nuevo.', 'error');
                confirmBtn.disabled = false;
                confirmBtn.textContent = 'Aceptar';
            }
        });
    });
}

    // ===== FUNCIONES AUXILIARES FALTANTES (implementaciones sencillas) =====
    function toggleMobileMenu() {
        if (!navLinks || !menuToggle) return;
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        navLinks.setAttribute('aria-hidden', String(!isOpen));
        if (isOpen) {
            const firstLink = navLinks.querySelector('.nav-link');
            if (firstLink) firstLink.focus();
        } else {
            menuToggle.focus();
        }
    }

    function closeMobileMenu() {
        if (navLinks) navLinks.classList.remove('open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    }

    function scrollToSection(targetId) {
        if (!targetId) return;
        const id = targetId.startsWith('#') ? targetId : `#${targetId.replace(/^#/, '')}`;
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Intentar descargar un PDF desde la ruta indicada.
     * Si el servidor responde con 200 (HEAD), fuerza la descarga usando el atributo download.
     * Si falla la verificación, abre el PDF en nueva pestaña como fallback.
     */
    function downloadPDF(path) {
        const filePath = path || 'PDF/AIACO_Terminos_y_Politica_Privacidad.pdf';
        showNotification('Preparando descarga...', 'info');

        // Crear enlace temporal con atributo download
        const a = document.createElement('a');
        a.href = filePath;
        a.setAttribute('download', filePath.split('/').pop());
        a.style.display = 'none';
        document.body.appendChild(a);

        // Intentar comprobar existencia con HEAD (si el servidor lo permite)
        fetch(filePath, { method: 'HEAD' }).then(res => {
            if (res.ok) {
                a.click();
                showNotification('Descarga iniciada.', 'success');
            } else {
                showNotification('Archivo no encontrado en el servidor. Abriendo en nueva pestaña...', 'error');
                window.open(filePath, '_blank');
            }
        }).catch(() => {
            // Si la comprobación falla (p. ej. archivos locales), intentar descargar directamente
            try { a.click(); showNotification('Descarga iniciada.', 'success'); } catch (e) { window.open(filePath, '_blank'); }
        }).finally(() => {
            setTimeout(() => a.remove(), 1000);
        });
    }

    function setupScrollSpy() {
        // Simple scroll spy: actualizar sección activa al hacer scroll
        // No hace nada complejo; updateActiveSection ya se enlaza al scroll.
        updateActiveSection();
    }

    function setupAnimations() {
        const els = document.querySelectorAll('.fade-in');
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        io.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            els.forEach(e => io.observe(e));
        } else {
            els.forEach(e => e.classList.add('visible'));
        }
    }

    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 80;
        let currentId = null;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentId = sec.id;
            }
        });
        // Actualizar enlaces de la barra lateral y navegación
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href')?.replace(/^#/, '');
            if (href === currentId) link.classList.add('active'); else link.classList.remove('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href')?.replace(/^#/, '');
            if (href === currentId) link.classList.add('active'); else link.classList.remove('active');
        });
    }

    function checkMobileMenu() {
        if (window.innerWidth > 768) {
            if (navLinks) navLinks.classList.remove('open');
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        }
    }

    function enhanceAccessibility() {
        // Ensure nav has an id for aria-controls
        if (navLinks && !navLinks.id) navLinks.id = 'primary-navigation';
        if (menuToggle) {
            menuToggle.setAttribute('aria-controls', navLinks ? navLinks.id : '');
            if (!menuToggle.hasAttribute('aria-expanded')) menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMobileMenu();
                }
                if (e.key === 'Escape') {
                    closeMobileMenu();
                }
            });
        }
        // Improve notifications for screen readers
        const existing = document.querySelector('.sr-live');
        if (!existing) {
            const live = document.createElement('div');
            live.className = 'sr-live';
            live.setAttribute('aria-live', 'polite');
            live.setAttribute('aria-atomic', 'true');
            Object.assign(live.style, { position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' });
            document.body.appendChild(live);
        }
    }

    function showNotification(message, type = 'info') {
        const n = document.createElement('div');
        n.className = `app-notification ${type}`;
        n.textContent = message;
        n.setAttribute('role', 'status');
        n.setAttribute('aria-live', 'polite');
        Object.assign(n.style, {
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            padding: '0.75rem 1rem',
            background: type === 'success' ? '#16a34a' : (type === 'error' ? '#dc2626' : '#2563eb'),
            color: 'white',
            borderRadius: '8px',
            zIndex: 3000,
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
        });
        document.body.appendChild(n);
        // Announce for screen readers
        const sr = document.querySelector('.sr-live');
        if (sr) sr.textContent = message;
        setTimeout(() => n.classList.add('show'), 10);
        setTimeout(() => { n.classList.remove('show'); n.remove(); }, 3000);
    }

    // ===== INICIALIZAR =====
    init();
});