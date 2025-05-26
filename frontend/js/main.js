/**
 * Archivo: main.js
 * Descripción: Contiene la lógica principal de la aplicación.
 * Funcionalidades:
 *   1. Manejo de la navegación en la sección "Nosotros"
 *   2. Menú móvil
 *   3. Scroll suave
 *   4. Funciones de autenticación
 *   5. Funciones de la tienda
 */

// 1. Manejo de la navegación en la sección "Nosotros"
document.addEventListener('DOMContentLoaded', () => {
    const nosotrosLinks = document.querySelectorAll('.nosotros-nav .nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    // Configura los eventos de clic para los enlaces de navegación
    nosotrosLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Actualiza los estados activos
            nosotrosLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Muestra/oculta las secciones correspondientes
            contentSections.forEach(section => {
                section.classList.toggle('active', section.id === targetId);
            });
        });
    });

    // 2. Menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        
        // Anima el ícono de hamburguesa a X
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Cierra el menú móvil al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (navMenu?.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('#menu-toggle')) {
            navMenu.classList.remove('active');
            const spans = menuToggle?.querySelectorAll('span');
            spans?.[0].style.transform = 'none';
            spans?.[1].style.opacity = '1';
            spans?.[2].style.transform = 'none';
        }
    });

    // 3. Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Cierra el menú móvil después de hacer clic en un enlace
                if (navMenu?.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const spans = menuToggle?.querySelectorAll('span');
                    spans?.[0].style.transform = 'none';
                    spans?.[1].style.opacity = '1';
                    spans?.[2].style.transform = 'none';
                }
            }
        });
    });
});

// 4. Funciones de autenticación
/**
 * Intenta autenticar a un usuario con correo y contraseña
 * @param {string} email - Correo electrónico del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<Object>} Respuesta del servidor
 */
async function login(email, password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        return await response.json();
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        return { status: 'error', message: 'Error en la conexión' };
    }
}

// 5. Funciones de la tienda
/**
 * Agrega un producto al carrito
 * @param {string|number} productId - ID del producto a agregar
 */
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

/**
 * Actualiza la interfaz de usuario del carrito
 */
function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

/**
 * Formatea una fecha para mostrarla en el blog
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Inicialización
updateCartUI();
