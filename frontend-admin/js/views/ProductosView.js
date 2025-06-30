/**
 * Vista de Productos
 */
export class ProductosView {
    constructor() {
        // Inicializar propiedades si son necesarias
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

    initEvents() {
        // Inicializar eventos de la vista de productos
        this.initializeProductActions();
    }

    async loadData() {
        try {
            // Simular carga de datos desde una API
            const productos = await this.fetchProductos();
            this.renderProductos(productos);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            this.showError('Error al cargar los productos');
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
    
    renderProductos(productos) {
        const tableBody = document.getElementById('productosTableBody');
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
    initializeProductActions() {
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
      console.error('No se encontró el área de contenido');
      return;
  }
  
  try {
      // Cargar el template HTML
      const response = await fetch('/pages/listar-productos.html');
      if (!response.ok) {
          throw new Error(`Error al cargar la vista: ${response.status}`);
      }
      
      contentArea.innerHTML = await response.text();
      
      // Actualizar el título de la página
      document.title = 'Listar Productos | BYH Music Admin';
      
      // Inicializar eventos de los botones de acción
      initializeProductActions();
      
      // Cargar datos de productos (simulación)
      loadProductsData();
      
  } catch (error) {
      console.error('Error al cargar la vista de productos:', error);
      if (contentArea) {
          contentArea.innerHTML = `
              <div class="alert alert-danger">
                  <h4>Error al cargar el listado de productos</h4>
                  <p>${error.message || 'No se pudo cargar la lista de productos. Por favor, intente nuevamente.'}</p>
                  <button class="btn btn-primary" onclick="window.app.loadView('listar-productos')">Reintentar</button>
              </div>
          `;
      }
  }
}

// Función para cargar los datos de los productos
function loadProductsData() {
  // Datos de ejemplo (en una aplicación real, esto vendría de una API)
  const products = [
      {
          id: 'PROD-001',
          image: './img/default-product.svg',
          name: 'Guitarra Acústica Fender',
          category: 'Guitarras',
          price: 1200.00,
          stock: 15,
          status: 'success',
          statusText: 'Disponible'
      },
      // Agregar más productos según sea necesario
  ];
  
  const tbody = document.getElementById('productsTableBody');
  if (!tbody) return;
  
  // Limpiar tabla
  tbody.innerHTML = '';
  
  // Agregar filas con los productos
  products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${product.id}</td>
          <td><img src="${product.image}" alt="${product.name}" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;"></td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>$${product.price.toFixed(2)}</td>
          <td>${product.stock}</td>
          <td><span class="badge bg-${product.status}">${product.statusText}</span></td>
          <td>
              <div class="btn-group">
                  <button class="btn btn-sm btn-outline-primary" title="Editar" onclick="loadEditarProductoView('${product.id}')">
                      <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger" title="Eliminar" onclick="confirmDeleteProduct('${product.id}')">
                      <i class="fas fa-trash"></i>
                  </button>
              </div>
          </td>
      `;
      tbody.appendChild(row);
  });
}

// Función para confirmar eliminación de producto
function confirmDeleteProduct(productId) {
  if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      // Lógica para eliminar el producto
      console.log('Eliminando producto:', productId);
      // Aquí iría la llamada a la API para eliminar el producto
      alert('Producto eliminado correctamente');
      // Recargar la lista de productos
      loadListarProductosView();
  }
}

// Vista de Nuevo Producto
async function loadNuevoProductoView(params = {}) {
  const contentArea = document.getElementById('contentArea') || document.querySelector('.content');
  if (!contentArea) {
      console.error('No se encontró el área de contenido');
      return;
  }
  
  try {
      // Cargar el template HTML
      const response = await fetch('/pages/nuevo-producto.html');
      if (!response.ok) {
          throw new Error(`Error al cargar el formulario: ${response.status}`);
      }
      
      contentArea.innerHTML = await response.text();
      
      // Inicializar eventos del formulario
      initializeProductForm();
      
  } catch (error) {
      console.error('Error al cargar el formulario de producto:', error);
      contentArea.innerHTML = `
          <div class="alert alert-danger">
              <h4>Error al cargar el formulario</h4>
              <p>No se pudo cargar el formulario de producto. Por favor, intente nuevamente.</p>
              <button class="btn btn-primary" onclick="loadNuevoProductoView()">Reintentar</button>
              <a href="#listar-productos" class="btn btn-outline-secondary" data-view="listar-productos">
                  <i class="fas fa-arrow-left"></i> Volver al listado
              </a>
          </div>
      `;
  }
}

// Vista de Editar Producto
async function loadEditarProductoView(params = {}) {
  const contentArea = document.getElementById('contentArea') || document.querySelector('.content');
  if (!contentArea) {
      console.error('No se encontró el área de contenido');
      return;
  }
  
  try {
      const productId = params.id || params.productId;
      if (!productId) {
          throw new Error('ID de producto no proporcionado');
      }
      
      // Cargar el template HTML
      const response = await fetch('/pages/nuevo-producto.html'); // Mismo formulario que nuevo producto
      if (!response.ok) {
          throw new Error(`Error al cargar el formulario: ${response.status}`);
      }
      
      let html = await response.text();
      
      // Cambiar el título a "Editar Producto"
      html = html.replace('<h1>Nuevo Producto</h1>', '<h1>Editar Producto</h1>');
      
      contentArea.innerHTML = html;
      
      // Aquí iría la lógica para cargar los datos del producto desde la API
      // Por ahora, simulamos la carga de datos
      setTimeout(() => {
          // Simular carga de datos del producto
          document.getElementById('productName').value = 'Guitarra Acústica Fender';
          document.getElementById('productCategory').value = 'guitarras';
          document.getElementById('productBrand').value = 'Fender';
          document.getElementById('productPrice').value = '1200.00';
          document.getElementById('productStock').value = '15';
          document.getElementById('productDescription').value = 'Excelente guitarra acústica de la reconocida marca Fender.';
          document.getElementById('productStatus').checked = true;
          document.getElementById('productFeatured').checked = true;
          document.getElementById('productTags').value = 'oferta, destacado';
          document.getElementById('productSku').value = 'GTR-FND-001';
      }, 100);
      
      // Inicializar eventos del formulario
      initializeProductForm();
      
  } catch (error) {
      console.error('Error al cargar el formulario de edición:', error);
      contentArea.innerHTML = `
          <div class="alert alert-danger">
              <h4>Error al cargar el producto</h4>
              <p>No se pudo cargar la información del producto. Por favor, intente nuevamente.</p>
              <button class="btn btn-primary" onclick="loadEditarProductoView('${productId}')">Reintentar</button>
              <a href="#listar-productos" class="btn btn-outline-secondary" data-view="listar-productos">
                  <i class="fas fa-arrow-left"></i> Volver al listado
              </a>
          </div>
      `;
  }
}

// Inicializar eventos de los botones de acción de productos
function initializeProductActions() {
  // Evento para el botón de editar
  document.querySelectorAll('.btn-outline-primary').forEach(btn => {
      btn.addEventListener('click', function() {
          // Aquí iría la lógica para cargar el formulario de edición
          alert('Editar producto');
      });
  });
  
  // Evento para el botón de eliminar
  document.querySelectorAll('.btn-outline-danger').forEach(btn => {
      btn.addEventListener('click', function() {
          if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
              // Aquí iría la lógica para eliminar el producto
              alert('Producto eliminado');
              // Recargar la lista de productos
              loadListarProductosView();
          }
      });
  });
}

// Inicializar eventos del formulario de producto
function initializeProductForm() {
  const form = document.getElementById('productForm');
  const dropzone = document.getElementById('productImageDropzone');
  const fileInput = document.getElementById('productImageInput');
  
  // Manejar el envío del formulario
  if (form) {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          // Aquí iría la lógica para guardar el producto
          alert('Producto guardado correctamente');
          // Redirigir al listado de productos
          loadView('listar-productos');
      });
  }
  
  // Manejar la zona de arrastrar y soltar imágenes
  if (dropzone) {
      // Prevenir el comportamiento por defecto para los eventos de arrastrar
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          dropzone.addEventListener(eventName, preventDefaults, false);
          document.body.addEventListener(eventName, preventDefaults, false);
      });
      
      // Resaltar la zona de soltado
      ['dragenter', 'dragover'].forEach(eventName => {
          dropzone.addEventListener(eventName, highlight, false);
      });
      
      ['dragleave', 'drop'].forEach(eventName => {
          dropzone.addEventListener(eventName, unhighlight, false);
      });
      
      // Manejar archivos soltados
      dropzone.addEventListener('drop', handleDrop, false);
      
      // Manejar clic en la zona de soltado
      dropzone.addEventListener('click', () => {
          fileInput.click();
      });
  }
  
  // Manejar selección de archivos
  if (fileInput) {
      fileInput.addEventListener('change', handleFiles, false);
  }
}

// Funciones auxiliares para el manejo de archivos
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  document.getElementById('productImageDropzone').classList.add('highlight');
}

function unhighlight() {
  document.getElementById('productImageDropzone').classList.remove('highlight');
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles({ target: { files } });
}

function handleFiles(e) {
  const files = e.target.files || e.dataTransfer.files;
  const container = document.getElementById('imagePreviewContainer');
  
  for (const file of files) {
      if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
              const col = document.createElement('div');
              col.className = 'col-6 col-md-4';
              
              const imgWrapper = document.createElement('div');
              imgWrapper.className = 'position-relative mb-2';
              
              const img = document.createElement('img');
              img.src = e.target.result;
              img.className = 'img-thumbnail w-100';
              img.style.height = '100px';
              img.style.objectFit = 'cover';
              
              const btnRemove = document.createElement('button');
              btnRemove.className = 'btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle';
              btnInnerHTML = document.createElement('i');
              btnInnerHTML.className = 'fas fa-times';
              btnRemove.appendChild(btnInnerHTML);
              
              btnRemove.onclick = function() {
                  col.remove();
              };
              
              imgWrapper.appendChild(img);
              imgWrapper.appendChild(btnRemove);
              col.appendChild(imgWrapper);
              container.appendChild(col);
          };
          
          reader.readAsDataURL(file);
      }
  }
}

// Función para agregar una nueva especificación
function addSpec() {
  const container = document.getElementById('specsContainer');
  const newSpec = document.createElement('div');
  newSpec.className = 'row mb-2';
  newSpec.innerHTML = `
      <div class="col-5">
          <input type="text" class="form-control" placeholder="Especificación">
      </div>
      <div class="col-5">
          <input type="text" class="form-control" placeholder="Valor">
      </div>
      <div class="col-2">
          <button type="button" class="btn btn-outline-danger btn-sm w-100" onclick="removeSpec(this)">
              <i class="fas fa-times"></i>
          </button>
      </div>
  `;
  container.appendChild(newSpec);
}

// Función para eliminar una especificación
function removeSpec(button) {
  button.closest('.row').remove();
}

// Hacer las funciones accesibles globalmente
window.loadListarProductosView = loadListarProductosView;
window.loadNuevoProductoView = loadNuevoProductoView;
window.loadEditarProductoView = loadEditarProductoView;
window.addSpec = addSpec;
window.removeSpec = removeSpec;
