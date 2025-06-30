// Aplicación principal del panel de administración
// Importaciones relativas
import { Navigation } from './components/Navigation.js';
import { showNotification } from './utils/helpers.js';
import { DashboardView } from './views/DashboardView.js';
import { ProductosView } from './views/ProductosView.js';
import { PromocionesView } from './views/PromocionesView.js';
import { BannersView } from './views/BannersView.js';
import { NuevaPromocionView } from './views/NuevaPromocionView.js';
import { NuevoBannerView } from './views/NuevoBannerView.js';
import { NuevoClienteView } from './views/NuevoClienteView.js';

class App {
    constructor() {
        this.views = {};
        this.currentView = null;
        this.init();
    }

    /**
     * Inicializa la aplicación
     */
    async init() {
        // Verificar autenticación
        if (!this.checkAuth()) {
            return;
        }

        // Registrar vistas
        this.registerView('dashboard', new DashboardView());
        this.registerView('productos', new ProductosView());
        this.registerView('promociones', new PromocionesView());
        this.registerView('banners', new BannersView());
        this.registerView('listar-productos', new ProductosView());
        this.registerView('listar-promociones', new PromocionesView());
        this.registerView('listar-banners', new BannersView());
        this.registerView('nueva-promocion', new NuevaPromocionView());
        this.registerView('nuevo-banner', new NuevoBannerView());
        this.registerView('nuevo-cliente', new NuevoClienteView());
        
        console.log('Vistas registradas:', Object.keys(this.views));

        // Inicializar componentes principales
        this.initNavigation();
        this.initTopBar();
        
        // Cargar la vista por defecto
        this.loadView('dashboard');
        
        // Configurar el enrutamiento del navegador
        this.setupRouting();
    }

    /**
     * Verifica si el usuario está autenticado
     * @returns {boolean} true si está autenticado, false en caso contrario
     */
    checkAuth() {
        const token = localStorage.getItem('authToken');
        if (!token && !window.location.pathname.endsWith('login.html')) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    /**
     * Inicializa la barra de navegación superior
     */
    initTopBar() {
        const toggleBtn = document.querySelector('.toggle-sidebar');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('collapsed');
                document.querySelector('.main-content').classList.toggle('expanded');
                
                // Guardar preferencia
                localStorage.setItem(
                    'sidebarCollapsed', 
                    document.querySelector('.sidebar').classList.contains('collapsed')
                );
            });
        }

        // Configurar búsqueda
        const searchForm = document.querySelector('.search-bar');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchTerm = searchForm.querySelector('input').value.trim();
                if (searchTerm) {
                    this.performSearch(searchTerm);
                }
            });
        }
    }

    /**
     * Realiza una búsqueda global
     * @param {string} term - Término de búsqueda
     */
    performSearch(term) {
        // Implementar lógica de búsqueda
        console.log('Buscando:', term);
        showNotification(`Búsqueda: ${term}`, 'info');
    }

    /**
     * Inicializa la navegación
     */
    initNavigation() {
        const navigation = new Navigation();
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebar) {
            sidebar.innerHTML = '';
            sidebar.appendChild(navigation.render());
            
            // Aplicar preferencia de menú colapsado
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
                document.querySelector('.main-content').classList.add('expanded');
            }
        }
        
        // Escuchar eventos de cambio de vista
        document.addEventListener('viewChange', (e) => {
            this.loadView(e.detail.view);
        });
    }

    /**
     * Configura el enrutamiento del navegador
     */
    setupRouting() {
        // Manejar el botón de retroceso/avance del navegador
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.view) {
                this.loadView(e.state.view);
            }
        });
    }

    /**
     * Registra una nueva vista
     * @param {string} name - Nombre de la vista
     * @param {Object} view - Objeto de la vista
     */
    registerView(name, view) {
        this.views[name] = view;
    }

    /**
     * Carga una vista específica
     * @param {string} viewName - Nombre de la vista a cargar
     * @param {Object} params - Parámetros adicionales para la vista (opcional)
     */
    async loadView(viewName, params = {}) {
        // Si no se especifica una vista, cargar el dashboard
        if (!viewName) {
            viewName = 'dashboard';
        }

        try {
            // Verificar si la vista existe
            if (!this.views[viewName]) {
                console.warn(`La vista '${viewName}' no está registrada. Redirigiendo al dashboard.`);
                viewName = 'dashboard';
            }

            console.log(`Cargando vista: ${viewName}`);
            
            // Obtener la vista
            const view = this.views[viewName];
            
            // Renderizar la vista
            const contentArea = document.getElementById('contentArea');
            if (contentArea) {
                // Mostrar indicador de carga
                contentArea.innerHTML = `
                    <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                `;
                
                // 1. Renderizar la estructura inicial de la vista
                contentArea.innerHTML = view.render ? view.render() : '';

                // Usamos setTimeout para asegurar que el DOM se actualice antes de manipularlo
                setTimeout(async () => {
                    // 2. Cargar datos y actualizar la vista, pasando el scope del DOM
                    if (view.loadData) {
                        try {
                            await view.loadData(contentArea);
                        } catch (error) {
                            console.error(`Error al cargar datos de la vista ${viewName}:`, error);
                        }
                    }

                    // 3. Inicializar eventos de la vista, pasando el scope del DOM
                    if (view.initEvents) {
                        view.initEvents(contentArea);
                    }
                }, 0);

                // Actualizar la URL del navegador sin recargar la página
                window.history.pushState({ view: viewName }, '', `#${viewName}`);

                // Actualizar la vista actual
                this.currentView = viewName;

                // Actualizar el menú activo
                this.updateActiveMenu();

                // Actualizar el título de la página
                document.title = `${viewName.charAt(0).toUpperCase() + viewName.slice(1)} | Panel de Administración`;

                // Desplazarse al principio de la página
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error('Error al cargar la vista:', error);
            
            // Mostrar mensaje de error al usuario
            const contentArea = document.getElementById('contentArea');
            if (contentArea) {
                contentArea.innerHTML = `
                    <div class="alert alert-danger m-4">
                        <h4>Error al cargar la página</h4>
                        <p>${error.message || 'La página solicitada no existe o no está disponible en este momento.'}</p>
                        <button class="btn btn-primary mt-2" onclick="window.app.loadView('dashboard')">
                            <i class="fas fa-home me-2"></i>Volver al Inicio
                        </button>
                    </div>
                `;
            }
        }
    }

    /**
     * Actualiza el menú activo según la vista actual
     */
    updateActiveMenu() {
        // Obtener todos los elementos del menú
        const menuItems = document.querySelectorAll('.nav-menu li');
        
        // Remover la clase 'active' de todos los elementos del menú
        menuItems.forEach(item => {
            item.classList.remove('active');
            
            // Si el elemento tiene un submenú, también remover la clase 'active' de los submenús
            const submenu = item.querySelector('.submenu');
            if (submenu) {
                submenu.classList.remove('show');
            }
        });
        
        // Si no hay vista actual, salir
        if (!this.currentView) return;
        
        // Buscar el elemento del menú que coincide con la vista actual
        const currentMenuItem = document.querySelector(`.nav-menu li[data-view="${this.currentView}"]`);
        
        // Si se encontró el elemento del menú, agregar la clase 'active'
        if (currentMenuItem) {
            currentMenuItem.classList.add('active');
            
            // Si el elemento tiene un padre con submenú, mostrarlo
            const parentMenu = currentMenuItem.closest('.submenu');
            if (parentMenu) {
                parentMenu.classList.add('show');
                
                // También activar el elemento padre
                const parentItem = parentMenu.previousElementSibling;
                if (parentItem && parentItem.tagName === 'A') {
                    parentItem.parentElement.classList.add('active');
                }
            }
        }
    }

    /**
     * Inicializa la aplicación
     */
    async init() {
        // Verificar autenticación
        if (!this.checkAuth()) {
            return;
        }

        // Registrar vistas
        this.registerView('dashboard', new DashboardView());

        // Inicializar componentes principales
        this.initNavigation();
        this.initTopBar();
        
        // Cargar la vista por defecto
        this.loadView('dashboard');
        
        // Configurar el enrutamiento del navegador
        this.setupRouting();
    }

    /**
     * Verifica si el usuario está autenticado
     * @returns {boolean} true si está autenticado, false en caso contrario
     */
    checkAuth() {
        const token = localStorage.getItem('authToken');
        if (!token && !window.location.pathname.endsWith('login.html')) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    /**
     * Inicializa la barra de navegación superior
     */
    initTopBar() {
        const toggleBtn = document.querySelector('.toggle-sidebar');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('collapsed');
                document.querySelector('.main-content').classList.toggle('expanded');
                
                // Guardar preferencia
                localStorage.setItem(
                    'sidebarCollapsed', 
                    document.querySelector('.sidebar').classList.contains('collapsed')
                );
            });
        }

        // Configurar búsqueda
        const searchForm = document.querySelector('.search-bar');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchTerm = searchForm.querySelector('input').value.trim();
                if (searchTerm) {
                    this.performSearch(searchTerm);
                }
            });
        }
    }

    /**
     * Realiza una búsqueda global
     * @param {string} term - Término de búsqueda
     */
    performSearch(term) {
        // Implementar lógica de búsqueda
        console.log('Buscando:', term);
        showNotification(`Búsqueda: ${term}`, 'info');
    }

    /**
     * Inicializa la navegación
     */
    initNavigation() {
        const navigation = new Navigation();
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebar) {
            sidebar.innerHTML = '';
            sidebar.appendChild(navigation.render());
            
            // Aplicar preferencia de menú colapsado
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
                document.querySelector('.main-content').classList.add('expanded');
            }
        }
        
        // Escuchar eventos de cambio de vista
        document.addEventListener('viewChange', (e) => {
            this.loadView(e.detail.view);
        });
    }

    /**
     * Configura el enrutamiento del navegador
     */
    setupRouting() {
        // Manejar el botón de retroceso/avance del navegador
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.view) {
                this.loadView(e.state.view);
            }
        });
    }

    /**
     * Registra una nueva vista
     * @param {string} name - Nombre de la vista
     * @param {Object} view - Objeto de la vista
     */
    registerView(name, view) {
        this.views[name] = view;
    }

    /**
     * Carga una vista específica
     * @param {string} viewName - Nombre de la vista a cargar
     * @param {Object} params - Parámetros adicionales para la vista (opcional)
     */
    async loadView(viewName, params = {}) {
        try {
            // Mostrar indicador de carga
            const contentArea = document.getElementById('contentArea');
            if (contentArea) {
                contentArea.innerHTML = `
                    <div class="d-flex justify-content-center align-items-center" style="height: 300px;">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                `;
            }

            // Limpiar la vista actual
            if (this.currentView && typeof this.currentView.destroy === 'function') {
                this.currentView.destroy();
            }

            // Verificar si la vista existe
            if (!this.views[viewName]) {
                throw new Error(`La vista '${viewName}' no está registrada.`);
            }

            // Obtener la vista
            const view = this.views[viewName];
            this.currentView = view;
            
            // Renderizar la vista
            if (contentArea && typeof view.render === 'function') {
                contentArea.innerHTML = view.render();
                
                // Inicializar eventos de la vista
                if (typeof view.initEvents === 'function') {
                    view.initEvents();
                }
                
                // Cargar datos de la vista
                if (typeof view.loadData === 'function') {
                    await view.loadData();
                }
            }
            
            // Actualizar el menú activo
            if (typeof window.updateActiveMenuItem === 'function') {
                window.updateActiveMenuItem(viewName);
            }
            
            // Actualizar el historial del navegador
            if (window.history && window.history.pushState) {
                const state = { view: viewName };
                window.history.pushState(state, '', `#${viewName}`);
            }
            
            // Actualizar el título de la página
            document.title = `${viewName.charAt(0).toUpperCase() + viewName.slice(1)} | Panel de Administración`;
            
        } catch (error) {
            console.error('Error al cargar la vista:', error);
            const contentArea = document.getElementById('contentArea');
            if (contentArea) {
                contentArea.innerHTML = `
                    <div class="alert alert-danger m-3">
                        <h4>Error al cargar la vista</h4>
                        <p>${error.message || 'Ha ocurrido un error inesperado.'}</p>
                        <button class="btn btn-primary" onclick="window.location.reload()">
                            <i class="fas fa-sync-alt me-2"></i>Recargar
                        </button>
                    </div>
                `;
            }
        }
    }
}

// Crear una instancia global de la aplicación
window.app = new App();
export { App };
export default window.app;
