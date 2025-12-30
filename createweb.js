// createweb.js - Funcionalidad interactiva para la landing page AIACO WEB

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // 1. MENÚ MÓVIL
    // ====================
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Cambiar ícono del botón
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace (en móviles)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }
    
    // ====================
    // 2. FORMULARIO LEAD MAGNET
    // ====================
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const business = document.getElementById('business').value.trim();
            
            // Validación simple
            if (!name || !email) {
                alert('Por favor, completa al menos los campos de Nombre y Correo Electrónico.');
                return;
            }
            
            // Aquí normalmente enviarías los datos a un servidor
            // Para este ejemplo, simularemos un envío exitoso
            
            // Mostrar mensaje de éxito
            const originalButtonText = leadForm.querySelector('button[type="submit"]').innerHTML;
            leadForm.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            leadForm.querySelector('button[type="submit"]').disabled = true;
            
            // Simular demora de red
            setTimeout(() => {
                // Crear enlace de descarga simulado
                const downloadLink = document.createElement('a');
                downloadLink.href = '#';
                downloadLink.setAttribute('download', 'Checklist-Web-Que-Vende-AIACO-WEB.pdf');
                downloadLink.click();
                
                // Restaurar botón
                leadForm.querySelector('button[type="submit"]').innerHTML = originalButtonText;
                leadForm.querySelector('button[type="submit"]').disabled = false;
                
                // Mostrar mensaje de agradecimiento
                alert(`¡Gracias ${name}! Tu checklist "Web que Vende" ha sido enviado a ${email}. Revisa tu correo (incluye la carpeta de spam) para más consejos.`);
                
                // Opcional: Limpiar formulario
                leadForm.reset();
                
                // Aquí podrías enviar los datos a Google Analytics, etc.
                console.log('Lead capturado:', { name, email, business });
                
            }, 1500);
        });
    }
    
    // ====================
    // 3. AÑADIR AÑO ACTUAL AL FOOTER
    // ====================
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // ====================
    // 4. ANIMACIÓN SUAVE AL SCROLL
    // ====================
    // Esta funcionalidad ya está habilitada por "scroll-behavior: smooth" en el CSS
    // Pero añadimos un pequeño efecto adicional a las tarjetas al aparecer
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar tarjetas para animación
    const cards = document.querySelectorAll('.benefit-card, .pricing-card, .testimonial-card');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // ====================
    // 5. EFECTO "STICKY" MEJORADO PARA EL HEADER
    // ====================
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll hacia abajo
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll hacia arriba
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
    
    // ====================
    // 6. CONTADOR ESTADÍSTICAS (Ejemplo dinámico)
    // ====================
    // Podrías añadir contadores animados para estadísticas si lo deseas
    // Ejemplo: "Más de 150 sitios web creados"
    
    // ====================
    // 7. PREVENCIÓN DE ENVÍO DE FORMULARIO CON ENTER EN INPUTS NO-SUBMIT
    // ====================
    const formInputs = document.querySelectorAll('input');
    formInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.type !== 'submit') {
                e.preventDefault();
            }
        });
    });
    
    // ====================
    // 8. INICIALIZACIÓN ADICIONAL
    // ====================
    console.log('Landing page AIACO WEB cargada correctamente.');
    console.log('Diseño inspirado en principios de conversión de Landingi[citation:2][citation:9] y estética moderna de Squarespace/Shopify.');
});