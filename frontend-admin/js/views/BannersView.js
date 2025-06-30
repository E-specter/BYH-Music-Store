/**
 * Vista de Banners
 */
export class BannersView {
    constructor() {
        this.currentPage = 1;
        this.bannersPerPage = 6;
        this.banners = [];
    }

    async render() {
        // Cargar el contenido HTML desde el archivo
        try {
            const response = await fetch('pages/banners.html');
            if (!response.ok) {
                throw new Error('No se pudo cargar la vista de banners');
            }
            return await response.text();
        } catch (error) {
            console.error('Error al cargar la vista de banners:', error);
            return `
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Error al cargar la vista de banners. Por favor, recarga la página.
                </div>
            `;
        }
    }

    initEvents() {
        // Inicializar eventos
        this.initializeBannerActions();
        this.setupEventListeners();
        // Cargar datos de banners
        this.loadBanners();
    }

    setupEventListeners() {
        // Evento para el botón de nuevo banner
        document.getElementById('nuevoBannerBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showBannerForm();
        });

        // Evento para el botón de cancelar en el formulario
        document.getElementById('cancelBannerBtn')?.addEventListener('click', () => {
            this.hideBannerForm();
            this.loadBanners();
        });

        // Evento para el envío del formulario
        document.getElementById('bannerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveBanner();
        });
    }

    async loadBanners() {
        const container = document.getElementById('bannersContainer');
        if (!container) return;

        try {
            // Mostrar spinner de carga
            container.innerHTML = `
                <div class="col-12 text-center my-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                    </div>
                    <p class="mt-2">Cargando banners...</p>
                </div>
            `;

            // Simular carga de datos de la API
            // En un caso real, aquí harías una llamada a tu API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Datos de ejemplo
            this.banners = [
                {
                    id: 1,
                    title: 'Oferta de Verano',
                    position: 'Principal - Desktop',
                    image: './img/default-banner.svg',
                    status: 'active',
                    endDate: '31/08/2024'
                },
                {
                    id: 2,
                    title: 'Nuevos Ingresos',
                    position: 'Secundario - Desktop',
                    image: './img/default-banner.svg',
                    status: 'active',
                    endDate: '30/09/2024'
                }
                // Agregar más banners según sea necesario
            ];

            // Renderizar banners
            this.renderBanners();
        } catch (error) {
            console.error('Error al cargar los banners:', error);
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger" role="alert">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Error al cargar los banners. Por favor, inténtalo de nuevo más tarde.
                    </div>
                </div>
            `;
        }
    }

    renderBanners() {
        const container = document.getElementById('bannersContainer');
        if (!container) return;

        if (this.banners.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center my-5">
                    <i class="fas fa-image fa-3x text-muted mb-3"></i>
                    <h5>No hay banners creados</h5>
                    <p class="text-muted">Comienza creando tu primer banner</p>
                    <button class="btn btn-primary" id="createFirstBannerBtn">
                        <i class="fas fa-plus me-2"></i>Crear Banner
                    </button>
                </div>
            `;

            // Agregar evento al botón de crear primer banner
            document.getElementById('createFirstBannerBtn')?.addEventListener('click', () => {
                this.showBannerForm();
            });
            
            return;
        }

        // Renderizar la lista de banners
        container.innerHTML = this.banners.map(banner => `
            <div class="col-md-6 col-lg-4 mb-4" data-banner-id="${banner.id}">
                <div class="card h-100">
                    <img src="${banner.image}" class="card-img-top" alt="${banner.title}" 
                         style="height: 160px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${banner.title}</h5>
                        <p class="card-text">${banner.position}</p>
                        <p class="card-text">
                            <small class="text-muted">Activo hasta: ${banner.endDate}</small>
                        </p>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="badge ${banner.status === 'active' ? 'bg-success' : 'bg-secondary'}">
                                ${banner.status === 'active' ? 'Activo' : 'Inactivo'}
                            </span>
                            <div class="btn-group">
                                <button class="btn btn-sm btn-outline-primary" data-action="edit" 
                                        data-banner-id="${banner.id}">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" data-action="delete" 
                                        data-banner-id="${banner.id}">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Inicializar eventos de los botones de acción
        this.initializeBannerActions();
    }

    initializeBannerActions() {
        // Eventos para los botones de acción en las tarjetas de banner
        document.querySelectorAll('[data-action="edit"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const bannerId = e.currentTarget.getAttribute('data-banner-id');
                this.editBanner(bannerId);
            });
        });

        document.querySelectorAll('[data-action="delete"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const bannerId = e.currentTarget.getAttribute('data-banner-id');
                this.confirmDeleteBanner(bannerId);
            });
        });
    }

    showBannerForm(banner = null) {
        const container = document.getElementById('bannersContainer');
        if (!container) return;

        // Obtener la plantilla del formulario
        const template = document.getElementById('bannerFormTemplate');
        if (!template) return;

        // Clonar y mostrar el formulario
        const formClone = document.importNode(template.content, true);
        container.innerHTML = '';
        container.appendChild(formClone);

        // Rellenar el formulario si se está editando un banner
        if (banner) {
            document.getElementById('bannerId').value = banner.id;
            document.getElementById('bannerTitle').value = banner.title;
            document.getElementById('bannerPosition').value = banner.position;
            document.getElementById('bannerUrl').value = banner.url || '';
            document.getElementById('bannerStatus').value = banner.status;
            
            // Actualizar el título del formulario
            const formTitle = document.querySelector('#bannerForm h5');
            if (formTitle) {
                formTitle.textContent = 'Editar Banner';
            }
        }

        // Inicializar eventos del formulario
        this.setupFormEventListeners();
    }

    hideBannerForm() {
        const container = document.getElementById('bannersContainer');
        if (container) {
            container.innerHTML = '';
            this.renderBanners();
        }
    }

    setupFormEventListeners() {
        // Evento para la carga de imágenes
        const imageInput = document.getElementById('bannerImage');
        if (imageInput) {
            imageInput.addEventListener('change', (e) => {
                this.handleImageUpload(e);
            });
        }

        // Evento para el botón de cancelar
        const cancelBtn = document.getElementById('cancelBannerBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.hideBannerForm();
            });
        }
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.match('image.*')) {
            alert('Por favor, selecciona una imagen válida');
            return;
        }

        // Aquí podrías mostrar una vista previa de la imagen
        // o subirla a un servidor
        console.log('Imagen seleccionada:', file.name);
    }

    async saveBanner() {
        const form = document.getElementById('bannerForm');
        if (!form) return;

        const formData = new FormData(form);
        const bannerData = {
            id: formData.get('bannerId') || Date.now(), // Usar ID existente o generar uno nuevo
            title: formData.get('bannerTitle'),
            position: formData.get('bannerPosition'),
            url: formData.get('bannerUrl'),
            status: formData.get('bannerStatus'),
            // Agregar más campos según sea necesario
        };

        try {
            // Aquí iría la lógica para guardar en la API
            console.log('Guardando banner:', bannerData);
            
            // Simular guardado exitoso
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mostrar notificación de éxito
            this.showNotification('Banner guardado correctamente', 'success');
            
            // Volver a la lista de banners
            this.hideBannerForm();
            this.loadBanners();
        } catch (error) {
            console.error('Error al guardar el banner:', error);
            this.showNotification('Error al guardar el banner', 'danger');
        }
    }

    editBanner(bannerId) {
        // Buscar el banner por ID
        const banner = this.banners.find(b => b.id == bannerId);
        if (!banner) {
            this.showNotification('No se encontró el banner', 'danger');
            return;
        }
        
        // Mostrar el formulario con los datos del banner
        this.showBannerForm(banner);
    }

    confirmDeleteBanner(bannerId) {
        if (!confirm('¿Estás seguro de que deseas eliminar este banner? Esta acción no se puede deshacer.')) {
            return;
        }
        
        this.deleteBanner(bannerId);
    }

    async deleteBanner(bannerId) {
        try {
            // Aquí iría la lógica para eliminar de la API
            console.log('Eliminando banner:', bannerId);
            
            // Simular eliminación exitosa
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Actualizar la lista de banners
            this.banners = this.banners.filter(banner => banner.id != bannerId);
            
            // Mostrar notificación
            this.showNotification('Banner eliminado correctamente', 'success');
            
            // Actualizar la vista
            this.renderBanners();
        } catch (error) {
            console.error('Error al eliminar el banner:', error);
            this.showNotification('Error al eliminar el banner', 'danger');
        }
    }

    showNotification(message, type = 'info') {
        // Implementar lógica para mostrar notificaciones
        // Puedes usar librerías como Toastr o implementar la tuya propia
        alert(`${type.toUpperCase()}: ${message}`);
    }
    
    // Inicializar eventos de los botones de acción de banners
    initializeBannerActions() {
        // Delegación de eventos para los botones de acción
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-action]');
            if (!button) return;
            
            const action = button.getAttribute('data-action');
            const card = button.closest('.card');
            const bannerTitle = card ? card.querySelector('.card-title')?.textContent : 'banner';
            
            switch (action) {
                case 'edit':
                    // Redirigir a la vista de edición
                    app.loadView('editar-banner', { id: 'banner-id' });
                    break;
                    
                case 'delete':
                    if (confirm(`¿Estás seguro de que deseas eliminar el banner "${bannerTitle}"?`)) {
                        // Lógica para eliminar el banner
                        console.log(`Eliminando banner: ${bannerTitle}`);
                        // Mostrar notificación de éxito
                        showNotification(`Banner "${bannerTitle}" eliminado correctamente`, 'success');
                        // Recargar la lista de banners
                        this.loadData();
                    }
                    break;
            }
        });
    }
}

export default BannersView;
