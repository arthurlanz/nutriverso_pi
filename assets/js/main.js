/**
 * main.js
 * Script de interações principais do site NutriVita
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------
    // 1. Lógica do Menu Hamburguer Responsivo
    // ---------------------------------------------
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        // Função para alternar o estado do menu
        const toggleMenu = () => {
            const isExpanded = navMenu.classList.toggle('is-active');
            navToggle.setAttribute('aria-expanded', isExpanded);

            // Controle de estilo no mobile (para sobrepor o resto da tela)
            if (window.innerWidth < 768) {
                navMenu.style.display = isExpanded ? 'flex' : 'none';
                if (isExpanded) {
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%'; 
                    navMenu.style.left = '0';
                    navMenu.style.width = '100%';
                    navMenu.style.backgroundColor = 'white'; 
                    navMenu.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
                    navMenu.style.padding = '1rem 5%';
                } else {
                    navMenu.removeAttribute('style'); // Limpa o estilo inline para garantir o display: none
                }
            }
        };

        navToggle.addEventListener('click', toggleMenu);

        // Garante que o menu volta ao estado desktop se a tela for redimensionada
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                navMenu.removeAttribute('style'); // Remove estilos inline de mobile
                navMenu.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', false);
            }
        });
    }

    // ---------------------------------------------
    // 2. Lógica de Validação Simples de Formulário (Newsletter)
    // ---------------------------------------------
    const newsletterForm = document.querySelector('.cta-newsletter__form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput.value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                alert('✅ Obrigado por assinar! Você receberá nossas novidades em breve.');
                emailInput.value = ''; 
            } else {
                alert('⚠️ Por favor, insira um endereço de e-mail válido.');
                emailInput.focus();
            }
        });
    }

    // ---------------------------------------------
    // 3. Lógica do Formulário de Contato (contato.html)
    // ---------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulação de validação mais complexa
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;

            if (nome.length < 3) {
                formStatus.textContent = '⚠️ Por favor, insira seu nome completo.';
                formStatus.style.color = '#D32F2F'; // Vermelho de erro
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                formStatus.textContent = '⚠️ E-mail inválido. Por favor, corrija.';
                formStatus.style.color = '#D32F2F';
                return;
            }

            if (mensagem.length < 10) {
                formStatus.textContent = '⚠️ A mensagem deve ter pelo menos 10 caracteres.';
                formStatus.style.color = '#D32F2F';
                return;
            }

            // Simulação de envio com sucesso (Sem backend real)
            formStatus.textContent = '✅ Mensagem enviada com sucesso! Em breve entraremos em contato.';
            formStatus.style.color = '#4CAF50'; // Verde de sucesso
            contactForm.reset(); // Limpa o formulário
        });
    }
});