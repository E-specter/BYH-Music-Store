/**
 * Vista de Productos
 */
export class ProductosView {
    constructor() {
        this.productos = [];
    }

    render() {
        return `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>Productos</h1>
                    <p class="mb-0">Administra los productos de la tienda</p>
                </div>
                <a href="#nuevo-producto" class="btn btn-primary" onclick="app.loadView('nuevo-producto'); return false;">
                    <i class="fas fa-plus"></i> Nuevo Producto
                </a>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="productosTableBody">
                                <tr>
                                    <td colspan="7" class="text-center">
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Cargando...</span>
                                        </div>
                                        <p class="mt-2">Cargando productos...</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Paginación -->
                    <nav aria-label="Page navigation" class="mt-4">
                        <ul class="pagination justify-content-center">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">Siguiente</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        `;
    }

    initEvents(contentArea) {
        // Inicializar eventos de la vista de productos
        this.initializeProductActions(contentArea);
    }

    async loadData(contentArea) {
        try {
            const response = await fetch('../data/productos.json');
            if (!response.ok) throw new Error('No se pudo cargar productos');
            this.productos = await response.json();
            this.renderProductos(this.productos, contentArea);
        } catch (error) {
            this.productos = [];
            console.error('Error al cargar productos:', error);
            this.renderProductos([], contentArea); // Muestra la tabla vacía en caso de error
        }
    }
    
    async fetchProductos() {
        // Simular petición a la API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        nombre: 'Guitarra Eléctrica Fender',
                        categoria: 'Guitarras',
                        precio: 1200.00,
                        stock: 15,
                        estado: 'Disponible',
                        imagen: './img/default-product.svg'
                    },
                    {
                        id: 2,
                        nombre: 'Batería Acústica Pearl',
                        categoria: 'Baterías',
                        precio: 1800.00,
                        stock: 8,
                        estado: 'Pocas unidades',
                        imagen: './img/default-product.svg'
                    }
                ]);
            }, 800);
        });
    }
    
    renderProductos(productos, contentArea) {
        const tableBody = contentArea.querySelector('#productosTableBody');
        if (!tableBody) return;
        
        if (productos.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-4">
                        <i class="fas fa-box-open fa-3x text-muted mb-3"></i>
                        <p class="mb-0">No se encontraron productos</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        tableBody.innerHTML = productos.map(producto => `
            <tr>
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover;"></td>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${producto.stock}</td>
                <td>
                    <span class="badge ${this.getBadgeClass(producto.estado)}">
                        ${producto.estado}
                    </span>
                </td>
                <td>
                    <a href="#editar-producto/${producto.id}" class="btn btn-sm btn-outline-primary me-1" title="Editar">
                        <i class="fas fa-edit"></i>
                    </a>
                    <button class="btn btn-sm btn-outline-danger" 
                            title="Eliminar" 
                            data-action="delete" 
                            data-id="${producto.id}"
                            data-name="${producto.nombre}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
        
        // Inicializar eventos después de renderizar
        this.initializeProductActions();
    }
    
    getBadgeClass(estado) {
        switch(estado.toLowerCase()) {
            case 'disponible':
                return 'bg-success';
            case 'agotado':
                return 'bg-danger';
            case 'pocas unidades':
                return 'bg-warning text-dark';
            default:
                return 'bg-secondary';
        }
    }
    
    showError(message) {
        const tableBody = document.getElementById('productosTableBody');
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-danger py-4">
                        <i class="fas fa-exclamation-circle fa-2x mb-2"></i>
                        <p class="mb-0">${message}</p>
                        <button class="btn btn-sm btn-outline-primary mt-2" onclick="app.views.productos.loadData()">
                            <i class="fas fa-sync-alt me-1"></i> Reintentar
                        </button>
                    </td>
                </tr>
            `;
        }
    }
    
    // Inicializar eventos de los botones de acción de productos
    initializeProductActions(container) {
        const tableBody = container.querySelector('#productosTableBody');
        // Delegación de eventos para los botones de acción
        document.addEventListener('click', (e) => {
            const button = e.target.closest('button[data-action]');
            if (!button) return;
            
            const action = button.getAttribute('data-action');
            const productId = button.getAttribute('data-id');
            const productName = button.getAttribute('data-name') || 'este producto';
            
            switch (action) {
                case 'delete':
                    this.confirmDeleteProduct(productId, productName);
                    break;
            }
        });
    }
    
    // Función para confirmar eliminación de producto
    confirmDeleteProduct(productId, productName) {
        if (confirm(`¿Estás seguro de que deseas eliminar el producto "${productName}"?`)) {
            // Lógica para eliminar el producto
            console.log(`Eliminando producto ID: ${productId}`);
            // Mostrar notificación de éxito
            showNotification(`Producto "${productName}" eliminado correctamente`, 'success');
            // Recargar la lista de productos
            this.loadData();
        }
    }
}

export default ProductosView;


// Vista de Listado de Productos
async function loadListarProductosView(params = {}) {
  const contentArea = document.getElementById('contentArea') || document.querySelector('.content');
  if (!contentArea) {

