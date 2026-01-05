// createweb.js - Versión para Carrusel Infinito (Simplificado)

document.addEventListener('DOMContentLoaded', function() {
    
    // ====================
    // 1. MENÚ MÓVIL
    // ====================
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
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
    // 2. CARRUSEL INFINITO CORREGIDO (SIMPLIFICADO)
    // ====================
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    if (carouselTrack && carouselWrapper) {
        let carouselInterval;
        let currentIndex = 0;
        let isAnimating = false;
        
        // Obtener todos los slides
        const slides = Array.from(carouselTrack.querySelectorAll('.carousel-slide'));
        const originalSlidesCount = 6; // Tus 6 slides originales
        const totalSlides = slides.length;
        
        // Calcular el ancho de cada slide
        let slideWidth = 0;
        if (slides[0]) {
            slideWidth = slides[0].getBoundingClientRect().width + 
                        parseInt(getComputedStyle(slides[0]).marginRight || 0) +
                        parseInt(getComputedStyle(slides[0]).marginLeft || 0);
        }
        
        // Función para actualizar el ancho en resize
        function updateSlideWidth() {
            if (slides[0]) {
                slideWidth = slides[0].getBoundingClientRect().width + 
                            parseInt(getComputedStyle(slides[0]).marginRight || 0) +
                            parseInt(getComputedStyle(slides[0]).marginLeft || 0);
            }
        }
        
        // Función para mover al siguiente slide
        function nextSlide() {
            if (isAnimating) return;
            
            isAnimating = true;
            currentIndex++;
            
            // Aplicar la transición
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
            carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            
            // Si llegamos al final de los slides duplicados, resetear sin animación
            if (currentIndex >= originalSlidesCount) {
                setTimeout(() => {
                    carouselTrack.style.transition = 'none';
                    currentIndex = 0;
                    carouselTrack.style.transform = `translateX(0px)`;
                    isAnimating = false;
                }, 500);
            } else {
                setTimeout(() => {
                    isAnimating = false;
                }, 500);
            }
        }
        
        // Función para iniciar el carrusel automático
        function startAutoSlide() {
            clearInterval(carouselInterval);
            carouselInterval = setInterval(nextSlide, 3000); // Cambia cada 3 segundos
        }
        
        // Inicializar carrusel
        function initCarousel() {
            updateSlideWidth();
            startAutoSlide();
            
            // Configurar el ancho del track para que contenga todos los slides
            carouselTrack.style.width = `${totalSlides * slideWidth}px`;
            
            console.log('Carrusel infinito inicializado - Modo automático');
        }
        
        // Inicializar cuando todo esté cargado
        setTimeout(initCarousel, 100);
        
        // Pausar al hacer hover (opcional)
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carouselWrapper.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
        
        // Ajustar en resize
        window.addEventListener('resize', function() {
            updateSlideWidth();
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            carouselTrack.style.width = `${totalSlides * slideWidth}px`;
        });
        
        // Transición cuando termine la animación
        carouselTrack.addEventListener('transitionend', function() {
            isAnimating = false;
        });
        
        console.log('Carrusel infinito listo - Funcionamiento automático');
    }
    
    // ====================
    // 3. EFECTOS 3D EN TARJETAS
    // ====================
    const benefitCards = document.querySelectorAll('.benefit-card, .pricing-card, .testimonial-card');
    
    benefitCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            // Efecto de iluminación
            const shadowX = (x - centerX) / 10;
            const shadowY = (y - centerY) / 10;
            const shadowBlur = 30;
            const shadowColor = `rgba(0, 0, 0, 0.1)`;
            
            this.style.boxShadow = `
                ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor},
                0 20px 40px rgba(0, 0, 0, 0.1)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            this.style.boxShadow = 'var(--shadow-3d)';
        });
    });
    
    // ====================
    // 4. ANIMACIONES AL SCROLL
    // ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in-up, .benefit-card, .pricing-card, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // ====================
    // 5. FORMULARIO LEAD MAGNET
    // ====================
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const business = document.getElementById('business').value.trim();
            
            if (!name || !email) {
                showNotification('Por favor, completa al menos los campos de Nombre y Correo Electrónico.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, introduce un correo electrónico válido.', 'error');
                return;
            }
            
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                const downloadLink = document.createElement('a');
                downloadLink.href = 'pdf/Checklist-Web-Que-Genera-Clientes.pdf';
                downloadLink.setAttribute('download', 'Checklist-Web-Que-Genera-Clientes.pdf');
                downloadLink.click();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                showNotification(`¡Gracias ${name}! Tu checklist ha sido enviado a ${email}.`, 'success');
                leadForm.reset();
                
                createConfetti();
                
            }, 1500);
        });
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Función para efecto confeti
    function createConfetti() {
        const confettiCount = 100;
        const colors = ['#f59e0b', '#1a56db', '#10b981', '#7c3aed', '#ec4899'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -20px;
                left: ${Math.random() * 100}vw;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                opacity: ${Math.random() * 0.5 + 0.5};
                z-index: 9999;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(confetti);
            
            const animation = confetti.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 1000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // ====================
    // 6. AÑADIR AÑO ACTUAL
    // ====================
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    console.log('AIACO WEB - Sitio cargado correctamente');
    console.log('🎯 Carrusel infinito: Funcionamiento automático');
    console.log('🎯 Efectos 3D: Activados en tarjetas');
    console.log('🎯 Formulario: Listo para capturar leads');
});