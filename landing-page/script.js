document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips de Bootstrap (solo si existe el elemento)
    try {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    } catch (e) {
        console.log('Tooltips no inicializados:', e);
    }

    // Smooth scrolling for anchor links - más robusto
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
                
                // Si es un enlace de navegación, resaltarlo
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (this.classList.contains('nav-link')) {
                    this.classList.add('active');
                }
            }
        });
    });
      // Actualizar las animaciones para usar clases de Bootstrap
    const animateBootstrapElements = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .team-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade', 'show');
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateBootstrapElements);
    
    // Run once on page load
    animateBootstrapElements();    // Configuración mejorada para el formulario con FormSubmit
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        console.log('Formulario de newsletter encontrado');
        
        // Asegurarse de que los campos del formulario sean accesibles
        const emailInput = ctaForm.querySelector('input[type="email"]');
        const selectField = ctaForm.querySelector('select');
        const submitButton = ctaForm.querySelector('button[type="submit"]');
        
        if (emailInput && selectField && submitButton) {
            console.log('Campos del formulario encontrados y funcionales');
            
            // Añadir label accesible pero visualmente oculto
            if (!document.getElementById('email-label')) {
                const emailLabel = document.createElement('label');
                emailLabel.id = 'email-label';
                emailLabel.htmlFor = 'newsletter-email';
                emailLabel.textContent = 'Tu correo electrónico';
                emailLabel.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;';
                emailInput.parentNode.insertBefore(emailLabel, emailInput);
                emailInput.id = 'newsletter-email';
            }
            
            // Mejorar la experiencia de usuario al enviar el formulario
            ctaForm.addEventListener('submit', function(e) {
                // Verificar que el correo sea válido
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    e.preventDefault();
                    emailInput.classList.add('invalid');
                    
                    // Crear mensaje de error si no existe
                    let errorMsg = this.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#dc3545';
                        errorMsg.style.fontSize = '0.85rem';
                        errorMsg.style.marginTop = '5px';
                        emailInput.parentNode.insertBefore(errorMsg, emailInput.nextSibling);
                    }
                    errorMsg.textContent = 'Por favor, introduce un correo electrónico válido.';
                    
                    return;
                }
                
                // Todo está bien, continuar con el envío
                console.log('Enviando formulario a FormSubmit...');
                
                // Guardar preferencias del usuario
                localStorage.setItem('subscribed', 'true');
                localStorage.setItem('userType', selectField.value);
                
                // Cambiar el texto del botón para indicar que está procesando
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
                submitButton.disabled = true;
                
                // FormSubmit se encargará de la redirección, no necesitamos hacer más
            });
            
            // Limpiar errores cuando el usuario corrige la entrada
            emailInput.addEventListener('input', function() {
                this.classList.remove('invalid');
                const errorMsg = ctaForm.querySelector('.error-message');
                if (errorMsg) errorMsg.textContent = '';
            });
            
            // Prevenir múltiples envíos accidentales
            submitButton.addEventListener('click', function(e) {
                if (this.disabled) {
                    e.preventDefault();
                }
            });
        }
    }// Manejo mejorado de CTA buttons para garantizar su funcionamiento
    console.log('Inicializando botones CTA');
    
    // Primero, asegurar que podamos seleccionar todos los botones CTA
    const allCTAButtons = document.querySelectorAll('.btn-primary, .btn-outline-primary, .btn-pulse, .btn-light, .btn-outline-light');
    console.log('Botones CTA encontrados:', allCTAButtons.length);
    
    // Función para manejar el comportamiento de los CTA
    function handleCTAClick(e) {
        e.preventDefault();
        console.log('Botón CTA clickeado:', this.textContent.trim());
        
        // Efecto visual de confirmación
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
        
        // Determinar si es un botón de registro/login o uno genérico
        const isRegistroButton = this.textContent.trim().includes('Registr');
        const isLoginButton = this.textContent.trim().includes('Iniciar');
        
        if (isRegistroButton || isLoginButton || this.classList.contains('btn-pulse')) {
            // Desplazarse hasta la sección del formulario
            const ctaFormSection = document.querySelector('.final-cta');
            if (ctaFormSection) {
                console.log('Desplazándose al formulario CTA');
                window.scrollTo({
                    top: ctaFormSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Destacar el formulario brevemente para llamar la atención
                setTimeout(() => {
                    const formContainer = document.querySelector('.cta-form');
                    if (formContainer) {
                        console.log('Resaltando formulario');
                        formContainer.classList.add('highlight-form');
                        
                        // Hacer foco en el campo de correo electrónico para que sea más fácil empezar a escribir
                        const selectField = formContainer.querySelector('select');
                        if (selectField) {
                            selectField.focus();
                            
                            // Si es un botón de registro profesional, preseleccionar la opción
                            if (isRegistroButton && this.textContent.includes('profesional')) {
                                const profesionalOption = Array.from(selectField.options)
                                    .find(option => option.value === 'profesional');
                                if (profesionalOption) {
                                    profesionalOption.selected = true;
                                }
                            }
                        }
                        
                        setTimeout(() => {
                            formContainer.classList.remove('highlight-form');
                        }, 1500);
                    }
                }, 800);
            } else {
                console.warn('No se encontró la sección del formulario CTA');
            }
        } else {
            // Para otros botones como "Conocer más" o similares
            // Determinar a qué sección deberían ir según su texto
            let targetSectionId = null;
            
            if (this.textContent.includes('Conocer')) targetSectionId = '#caracteristicas';
            else if (this.textContent.includes('servicio')) targetSectionId = '#caracteristicas';
            
            if (targetSectionId) {
                const targetSection = document.querySelector(targetSectionId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        }
    }
    
    // Aplicar efectos visuales y manejo de clics a todos los botones
    allCTAButtons.forEach(button => {
        // Efecto visual al pasar el mouse
        button.addEventListener('mouseover', function() {
            this.classList.add('hover-effect');
        });
        
        button.addEventListener('mouseout', function() {
            this.classList.remove('hover-effect');
        });
        
        // Asegurarse de que el botón sea claramente clickeable
        button.style.cursor = 'pointer';
        button.style.position = 'relative';
        button.style.zIndex = '10';
        
        // Remover cualquier evento de clic existente y agregar uno nuevo
        button.removeEventListener('click', handleCTAClick);
        button.addEventListener('click', handleCTAClick);
        
        // Añadir accesibilidad con el teclado
        button.setAttribute('tabindex', '0');
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCTAClick.call(this, e);
            }
        });
    });    // Estilos mejorados para animaciones y efectos de los botones
    const ctaStyles = document.createElement('style');
    ctaStyles.textContent = `
        .btn-pulse.hover-effect,
        .btn-primary.hover-effect,
        .btn-light.hover-effect,
        .btn-outline-light.hover-effect,
        .btn-outline-primary.hover-effect {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(9, 15, 22, 0.5);
            transition: all 0.2s ease;
        }
        
        .btn-primary.clicked,
        .btn-light.clicked,
        .btn-outline-light.clicked,
        .btn-outline-primary.clicked,
        .btn-pulse.clicked {
            transform: scale(0.95);
            opacity: 0.9;
            transition: all 0.1s ease;
        }
        
        /* Hacer los botones más notorios como clickeables */
        .btn {
            cursor: pointer !important;
            position: relative;
            z-index: 5;
            user-select: none;
        }
        
        /* Asegurar que los botones estén siempre por encima de otros contenidos */
        .btn-primary, .btn-pulse {
            z-index: 10;
            position: relative;
        }
        
        /* Enfatizar el efecto hover en dispositivos de escritorio */
        @media (min-width: 992px) {
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
                transition: all 0.3s ease;
            }
        }
    `;
    document.head.appendChild(ctaStyles);// Tab functionality para sección Nosotros - Implementación completamente nueva
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Para la versión móvil, también sincronizamos las tarjetas
    const aboutCards = document.querySelectorAll('.about-card');
    
    // Función central para activar pestañas - mejorada para mayor robustez
    function activateTab(tabId) {
        console.log('Activando tab:', tabId);
        
        if (!tabId) {
            console.warn('No se proporcionó un ID de pestaña válido');
            tabId = 'vision'; // Valor predeterminado como respaldo
        }
        
        // Desactivar todas las pestañas y contenidos
        tabHeaders.forEach(h => {
            h.classList.remove('active');
            // Asegurar que los eventos de clic sigan funcionando
            h.style.pointerEvents = 'auto';
        });
        
        tabContents.forEach(c => c.classList.remove('active'));
        
        try {
            // Activar la pestaña seleccionada
            const selectedHeader = document.querySelector(`.tab-header[data-tab="${tabId}"]`);
            if (selectedHeader) {
                selectedHeader.classList.add('active');
                // Añadir un efecto visual para confirmar la interacción
                selectedHeader.style.transform = 'translateY(-3px)';
                setTimeout(() => {
                    selectedHeader.style.transform = '';
                }, 300);
            } else {
                console.warn(`No se encontró el encabezado de pestaña para: ${tabId}`);
            }
              // Desactivar definitivamente todos los contenidos primero
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                content.style.position = 'absolute';
                content.style.left = '-9999px';
            });
            
            // Activar solo el contenido correspondiente
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Asegurar que el contenido sea visible con una animación suave
                targetContent.style.position = 'static';
                targetContent.style.left = 'auto';
                targetContent.style.visibility = 'visible';
                targetContent.style.display = 'block';
                
                // Animar la aparición
                setTimeout(() => {
                    targetContent.style.opacity = '1';
                    targetContent.style.transition = 'opacity 0.3s ease';
                }, 10);
                
                console.log('Contenido activado:', tabId);
            } else {
                console.warn(`No se encontró el contenido de pestaña para: ${tabId}`);
            }
            
            // Sincronizar con la versión móvil
            aboutCards.forEach(card => {
                if (card.getAttribute('data-tab') === tabId) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        } catch (e) {
            console.error('Error al activar pestaña:', e);
        }    }
    
    // Añadir el evento de clic a cada pestaña - Mejorado para garantizar que funcione
    tabHeaders.forEach(header => {
        // Asegurarse de que el elemento sea clickeable visualmente
        header.style.cursor = 'pointer';
        
        // Remover listener existente si hubiera alguno y añadir uno nuevo
        header.removeEventListener('click', tabClickHandler);
        header.addEventListener('click', tabClickHandler);
        
        // También añadir evento en focus y keydown para accesibilidad
        header.setAttribute('tabindex', '0');
        header.addEventListener('keydown', function(e) {
            // Activar con Enter o Space
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tabToActivate = this.getAttribute('data-tab');
                activateTab(tabToActivate);
            }
        });
    });
    
    function tabClickHandler(e) {
        e.preventDefault();
        const tabToActivate = this.getAttribute('data-tab');
        console.log('Click en pestaña:', tabToActivate);
        activateTab(tabToActivate);
        
        // Reportar éxito
        console.log('Pestaña activada exitosamente:', tabToActivate);
    }
    
    // También añadimos eventos mejorados a las tarjetas para dispositivos móviles
    aboutCards.forEach(card => {
        const cardHeader = card.querySelector('.card-header');
        if (cardHeader) {
            // Asegurar que sea visiblemente clickeable
            cardHeader.style.cursor = 'pointer';
            
            // Remover listener existente si hubiera alguno
            cardHeader.removeEventListener('click', cardClickHandler);
            cardHeader.addEventListener('click', cardClickHandler);
        }
    });
    
    function cardClickHandler(e) {
        e.preventDefault();
        const card = this.closest('.about-card');
        const tabToActivate = card.getAttribute('data-tab');
        console.log('Click en tarjeta:', tabToActivate);
        activateTab(tabToActivate);
    }
      // Sistema de animación unificado para todos los elementos que deberían animarse al hacer scroll
    const animateOnScroll = function() {
        // Elementos de la sección "Nosotros"
        const aboutElements = document.querySelectorAll('.about-card, .valor-item, .tab-content, .tab-header');
        
        // Elementos generales de la página
        const generalElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card, .team-card');
        
        // Función para animar un conjunto de elementos
        function animateElements(elements, className = 'animate') {
            elements.forEach(element => {
                if (!element) return;
                
                try {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 100) {
                        element.classList.add(className);
                        
                        // Para las pestañas, asegurarse de que sean interactivas
                        if (element.classList.contains('tab-header')) {
                            element.style.pointerEvents = 'auto';
                            element.style.cursor = 'pointer';
                        }
                    }
                } catch (e) {
                    console.warn('Error al animar elemento:', e);
                }
            });
        }
        
        // Animar todos los grupos de elementos
        animateElements(aboutElements, 'animate');
        animateElements(generalElements, 'show');
    };
    
    // Ejecutar la animación en el scroll y una vez al cargar
    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 300); // Retraso inicial para asegurar que el DOM esté listo
      // Add CSS for the animation
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .about-card.animate, .valor-item.animate {
            animation: fadeIn 0.5s ease forwards;
        }
        
        @media (max-width: 767px) {
            .about-card {
                opacity: 0;
                transform: translateY(20px);
            }
            
            .about-card.animate {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (min-width: 768px) {
            .valor-item {
                opacity: 0;
                transform: translateY(20px);
            }
            
            .valor-item.animate {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyle);
      // Stagger animation for cards and valores
    const staggerAnimation = function() {
        const cards = document.querySelectorAll('.about-card');
        const valores = document.querySelectorAll('.valor-item');
        
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate');
            }, 100 * index);
        });
        
        valores.forEach((valor, index) => {
            setTimeout(() => {
                valor.classList.add('animate');
            }, 100 * index);
        });
    };
    
    // Run stagger animation after a short delay
    setTimeout(staggerAnimation, 300);      // Inicialización completamente mejorada para las pestañas de la sección "Nosotros"
    function initializeActiveTabs() {
        console.log('Inicializando pestañas activas');
        
        // Obtener el ID de la pestaña activa o usar "vision" como predeterminado
        const activeHeader = document.querySelector('.tab-header.active');
        const activeTabId = activeHeader ? activeHeader.getAttribute('data-tab') : 'vision';
        
        console.log('Pestaña activa inicial:', activeTabId);
        
        // Activar la pestaña usando la función activateTab que ya definimos
        activateTab(activeTabId);
        
        // Asegurarse de que los eventos de clic funcionen correctamente
        tabHeaders.forEach(header => {
            // Eliminar cualquier estilo en línea que pueda interferir
            header.style.position = '';
            header.style.zIndex = '10'; // Asegurarse de que esté por encima de otros elementos
            
            // Hacer visible que es clickeable
            header.addEventListener('mouseover', function() {
                this.style.opacity = '0.8';
            });
            
            header.addEventListener('mouseout', function() {
                this.style.opacity = '1';
            });
        });
    }
      // Asegurarse de que se inicialicen las pestañas correctamente al cargar la página
    document.addEventListener('DOMContentLoaded', function() {
        // Inicializar las pestañas una vez que el DOM esté completamente cargado
        initializeActiveTabs();
        
        // Y también inicializar con un pequeño retraso por si hubiera algún problema de carga asincrónica
        setTimeout(initializeActiveTabs, 100);
    });
    
    // Inicializar de inmediato para cubrir cualquier escenario
    initializeActiveTabs();
    
    // Actualizar las pestañas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', initializeActiveTabs);
    
    // Asegurarse de que las pestañas funcionen cuando se hace clic en enlaces de navegación
    document.querySelectorAll('a[href="#nosotros"]').forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(initializeActiveTabs, 500); // Dar tiempo para que el desplazamiento termine
        });
    });
    
    // También sincronizar las pestañas al desplazarse a la sección con IntersectionObserver
    const nosotrosSection = document.getElementById('nosotros');
    if (nosotrosSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Sección Nosotros visible, inicializando pestañas');
                    initializeActiveTabs();
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(nosotrosSection);
    }
    
    // Verificación final de todos los elementos interactivos
    console.log('Verificando elementos interactivos...');
    
    // Función para verificar y solucionar problemas de interactividad
    function verificarInteractividad() {
        // 1. Verificar tabs de la sección "Nosotros"
        const tabs = document.querySelectorAll('.tab-header');
        if (tabs.length > 0) {
            console.log(`${tabs.length} pestañas encontradas en la sección Nosotros`);
            
            // Asegurar que las pestañas sean clickeables
            tabs.forEach(tab => {
                // Eliminar cualquier estilo que pueda estar interfiriendo
                tab.style.pointerEvents = 'auto';
                tab.style.cursor = 'pointer';
                tab.style.zIndex = '50';
                tab.style.position = 'relative';
            });
            
            // Activar la pestaña inicial si ninguna está activa
            const activeTab = document.querySelector('.tab-header.active');
            if (!activeTab && tabs.length > 0) {
                setTimeout(() => activateTab('vision'), 300);
            }
        } else {
            console.warn('No se encontraron pestañas en la sección Nosotros');
        }
        
        // 2. Verificar botones CTA
        const ctaButtons = document.querySelectorAll('.btn-primary, .btn-pulse, .btn-light');
        if (ctaButtons.length > 0) {
            console.log(`${ctaButtons.length} botones CTA encontrados`);
            
            // Asegurar que sean clickeables
            ctaButtons.forEach(button => {
                button.style.pointerEvents = 'auto';
                button.style.cursor = 'pointer';
                button.style.position = 'relative';
                button.style.zIndex = '50';
            });
        } else {
            console.warn('No se encontraron botones CTA');
        }
        
        // 3. Verificar el formulario
        const form = document.querySelector('.cta-form');
        if (form) {
            console.log('Formulario de suscripción encontrado');
            
            // Verificar campos requeridos
            const emailInput = form.querySelector('input[type="email"]');
            const selectField = form.querySelector('select');
            
            if (emailInput && selectField) {
                console.log('Campos del formulario verificados correctamente');
                
                // Asegurar que sean accesibles y funcionales
                emailInput.tabIndex = 0;
                selectField.tabIndex = 0;
            }
        }
    }
    
    // Ejecutar la verificación después de un breve retraso
    setTimeout(verificarInteractividad, 1000);
    
    // Ejecutar nuevamente después de 3 segundos para resolver cualquier problema que pueda aparecer
    setTimeout(verificarInteractividad, 3000);
    
    // Usar el nosotrosSection que ya está declarado anteriormente
    if (nosotrosSection) {
        // Ampliar la observación de la sección Nosotros para verificar interactividad
        const observerInteractividad = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    verificarInteractividad();
                }
            });
        });
        
        observerInteractividad.observe(nosotrosSection);
    }
    
    // Función adicional para forzar la correcta visualización de las pestañas
    function forceTabsCorrectDisplay() {
        console.log('Forzando la correcta visualización de pestañas');
        
        // Primero identificar cuál es la pestaña activa
        const activeHeader = document.querySelector('.tab-header.active');
        if (!activeHeader) {
            console.log('No hay pestaña activa, seleccionando la primera');
            const firstTab = document.querySelector('.tab-header');
            if (firstTab) {
                activateTab(firstTab.getAttribute('data-tab'));
                return;
            }
        }
        
        const activeTabId = activeHeader.getAttribute('data-tab');
        console.log('Pestaña activa:', activeTabId);
        
        // Asegurarse de que solo el contenido activo sea visible
        const allContents = document.querySelectorAll('.tab-content');
        let activeContentFound = false;
        
        allContents.forEach(content => {
            if (content.id === activeTabId) {
                // Este es el contenido que debe estar visible
                content.classList.add('active');
                content.style.display = 'block';
                content.style.opacity = '1';
                content.style.visibility = 'visible';
                content.style.position = 'static';
                content.style.left = 'auto';
                content.style.height = 'auto';
                activeContentFound = true;
            } else {
                // Estos contenidos deben estar ocultos
                content.classList.remove('active');
                content.style.display = 'none';
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                content.style.position = 'absolute';
                content.style.left = '-9999px';
                content.style.height = '0';
            }
        });
        
        if (!activeContentFound) {
            console.warn('No se encontró el contenido activo para la pestaña:', activeTabId);
        }
    }
    
    // Llamar a la función después de inicializar las pestañas
    setTimeout(forceTabsCorrectDisplay, 200);
    
    // También llamarla cuando se hace clic en cualquier pestaña
    document.querySelectorAll('.tab-header').forEach(header => {
        header.addEventListener('click', function() {
            // Usar un pequeño retraso para asegurarse de que se ejecute después de activateTab
            setTimeout(forceTabsCorrectDisplay, 50);
        });
    });
    
    // Y en respuesta a eventos de cambio de tamaño/orientación
    window.addEventListener('resize', forceTabsCorrectDisplay);
    window.addEventListener('orientationchange', forceTabsCorrectDisplay);
});