/**
 * Archivo: load-components.js
 * Descripción: Carga dinámicamente los componentes reutilizables (header y footer) en las páginas.
 * Funcionalidad: 
 *   1. Carga el header al inicio del body
 *   2. Carga el footer al final del body
 *   3. Inicializa el menú móvil después de cargar el header
 */

// Función para cargar Font Awesome
document.addEventListener('DOMContentLoaded', function() {
    // Cargar Font Awesome
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(fontAwesome);
    
    // 1. Cargar header
    fetch('../components/header.html')
        .then(response => response.text())
        .then(data => {
            // Inserta el header al inicio del body
            document.querySelector('body').insertAdjacentHTML('afterbegin', data);
            // Inicializa el menú móvil después de cargar el header
            initMobileMenu();
        });

    // 2. Cargar footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            // Inserta el footer al final del body
            document.querySelector('body').insertAdjacentHTML('beforeend', data);
        });

    // 3. Función para inicializar el menú móvil
    function initMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuToggle && navMenu) {
            // Agrega evento click al botón de menú móvil
            menuToggle.addEventListener('click', function() {
                // Alterna la clase 'active' en el menú de navegación
                navMenu.classList.toggle('active');
                // Alterna la clase 'active' en el botón de menú
                menuToggle.classList.toggle('active');
            });
        }
    }
});
