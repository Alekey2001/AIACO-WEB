// JavaScript para funcionalidad adicional
document.addEventListener('DOMContentLoaded', function() {
    // Cambio de tema
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.className = 'fas fa-sun';
            document.body.style.setProperty('--dark', '#f5f7ff');
            document.body.style.setProperty('--dark-light', '#e6ecff');
            document.body.style.setProperty('--light', '#1a2238');
            document.body.style.setProperty('--white', '#0a0e17');
            document.body.style.setProperty('--gray', '#5a6175');
        } else {
            themeIcon.className = 'fas fa-moon';
            document.body.style.setProperty('--dark', '#0a0e17');
            document.body.style.setProperty('--dark-light', '#1a2238');
            document.body.style.setProperty('--light', '#e6f0ff');
            document.body.style.setProperty('--white', '#ffffff');
            document.body.style.setProperty('--gray', '#8b93a7');
        }
    });

    // Botón de volver arriba
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navegación suave en la página
    document.querySelectorAll('.sidebar-menu a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            document.querySelectorAll('.sidebar-menu a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Agregar clase active al enlace clickeado
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Manejo del formulario de contacto
    const privacyContactForm = document.getElementById('privacyContactForm');
    
    if (privacyContactForm) {
        privacyContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí normalmente enviarías los datos a un servidor
            // Por ahora, solo mostraremos una alerta
            alert('Gracias por su consulta. Nos pondremos en contacto con usted en un plazo de 48 horas.');
            
            // Resetear el formulario
            privacyContactForm.reset();
        });
    }

    // Actualizar automáticamente el año en el pie de página
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.privacy-footer p:first-child');
    
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }

    // Efecto de scroll para las secciones
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones
    document.querySelectorAll('.privacy-section').forEach(section => {
        observer.observe(section);
    });
});