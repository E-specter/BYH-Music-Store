/**
 * Vista de Promociones
 */
export class PromocionesView {
    render() {
        return `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>Promociones</h1>
                    <p class="mb-0">Administra las promociones de la tienda</p>
                </div>
                <a href="#nueva-promocion" class="btn btn-primary" onclick="app.loadView('nueva-promocion'); return false;">
                    <i class="fas fa-plus"></i> Nueva Promoción
                </a>
            </div>
            
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 mb-4">
                            <div class="card h-100">
                                <img src="./img/default-promo.svg" class="card-img-top" alt="Promoción">
                                <div class="card-body">
                                    <h5 class="card-title">Verano 2024</h5>
                                    <p class="card-text">20% de descuento en guitarras acústicas</p>
                                    <p class="card-text"><small class="text-muted">Válido hasta: 31/08/2024</small></p>
                                    <div class="d-flex justify-content-between">
                                        <span class="badge bg-success">Activa</span>
                                        <div>
                                            <button class="btn btn-sm btn-outline-primary me-1">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-danger">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Más promociones se cargarán dinámicamente -->
                    </div>
                </div>
            </div>
        `;
    }

    initEvents() {
        // Inicializar eventos de la vista de promociones
    }

    async loadData() {
        // Simular carga de datos
    }
}

export default PromocionesView;


// Vista de Listado de Promociones
function loadListarPromocionesView() {
  const contentArea = document.getElementById('contentArea');
  
  contentArea.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
              <h1>Promociones</h1>
              <p class="mb-0">Administra las promociones de la tienda</p>
          </div>
          <a href="#nueva-promocion" class="btn btn-primary" onclick="loadView('nueva-promocion'); return false;">
              <i class="fas fa-plus"></i> Nueva Promoción
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
                              <th>Descuento</th>
                              <th>Válido hasta</th>
                              <th>Estado</th>
                              <th>Productos</th>
                              <th>Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><img src="./img/default-promo.svg" alt="Promo" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;"></td>
                              <td>Verano 2024</td>
                              <td>20%</td>
                              <td>31/08/2024</td>
                              <td><span class="badge bg-success">Activa</span></td>
                              <td>15 productos</td>
                              <td>
                                  <div class="btn-group">
                                      <button class="btn btn-sm btn-outline-primary" title="Editar">
                                          <i class="fas fa-edit"></i>
                                      </button>
                                      <button class="btn btn-sm btn-outline-danger" title="Eliminar">
                                          <i class="fas fa-trash"></i>
                                      </button>
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <td><img src="./img/default-promo.svg" alt="Promo" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;"></td>
                              <td>Black Friday</td>
                              <td>30%</td>
                              <td>29/11/2024</td>
                              <td><span class="badge bg-warning">Programada</span></td>
                              <td>0 productos</td>
                              <td>
                                  <div class="btn-group">
                                      <button class="btn btn-sm btn-outline-primary" title="Editar">
                                          <i class="fas fa-edit"></i>
                                      </button>
                                      <button class="btn btn-sm btn-outline-danger" title="Eliminar">
                                          <i class="fas fa-trash"></i>
                                      </button>
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <td><img src="./img/default-promo.svg" alt="Promo" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;"></td>
                              <td>Día del Padre</td>
                              <td>15%</td>
                              <td>15/06/2024</td>
                              <td><span class="badge bg-secondary">Expirada</span></td>
                              <td>8 productos</td>
                              <td>
                                  <div class="btn-group">
                                      <button class="btn btn-sm btn-outline-primary" title="Editar">
                                          <i class="fas fa-edit"></i>
                                      </button>
                                      <button class="btn btn-sm btn-outline-danger" title="Eliminar">
                                          <i class="fas fa-trash"></i>
                                      </button>
                                  </div>
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
  
  // Inicializar eventos de los botones de acción
  initializePromoActions();
}

// Vista de Nueva Promoción
function loadNuevaPromocionView() {
  const contentArea = document.getElementById('contentArea');
  
  contentArea.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
              <h1>Nueva Promoción</h1>
              <p class="mb-0">Crea una nueva promoción para productos</p>
          </div>
          <a href="#listar-promociones" class="btn btn-outline-secondary" onclick="loadView('listar-promociones'); return false;">
              <i class="fas fa-arrow-left"></i> Volver al listado
          </a>
      </div>
      
      <div class="row">
          <div class="col-md-8">
              <div class="card">
                  <div class="card-body">
                      <form id="promoForm">
                          <div class="mb-3">
                              <label for="promoName" class="form-label">Nombre de la Promoción</label>
                              <input type="text" class="form-control" id="promoName" required>
                          </div>
                          
                          <div class="row">
                              <div class="col-md-6">
                                  <div class="mb-3">
                                      <label for="promoType" class="form-label">Tipo de Descuento</label>
                                      <select class="form-select" id="promoType" required>
                                          <option value="percentage">Porcentaje</option>
                                          <option value="fixed">Monto Fijo</option>
                                          <option value="buy_x_get_y">Lléva X Paga Y</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="mb-3">
                                      <label for="promoValue" class="form-label">Valor</label>
                                      <div class="input-group">
                                          <span class="input-group-text" id="promoValueAddon">%</span>
                                          <input type="number" class="form-control" id="promoValue" min="0" step="0.01" required>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                          <div class="row">
                              <div class="col-md-6">
                                  <div class="mb-3">
                                      <label for="promoStartDate" class="form-label">Fecha de Inicio</label>
                                      <input type="datetime-local" class="form-control" id="promoStartDate" required>
                                  </div>
                              </div>
                              <div class="col-md-6">
                                  <div class="mb-3">
                                      <label for="promoEndDate" class="form-label">Fecha de Fin</label>
                                      <input type="datetime-local" class="form-control" id="promoEndDate" required>
                                  </div>
                              </div>
                          </div>
                          
                          <div class="mb-3">
                              <label for="promoDescription" class="form-label">Descripción</label>
                              <textarea class="form-control" id="promoDescription" rows="3"></textarea>
                          </div>
                          
                          <div class="mb-3">
                              <label class="form-label">Aplicar a</label>
                              <div class="form-check">
                                  <input class="form-check-input" type="radio" name="promoApplyTo" id="promoAllProducts" value="all" checked>
                                  <label class="form-check-label" for="promoAllProducts">
                                      Todos los productos
                                  </label>
                              </div>
                              <div class="form-check">
                                  <input class="form-check-input" type="radio" name="promoApplyTo" id="promoSelectedProducts" value="selected">
                                  <label class="form-check-label" for="promoSelectedProducts">
                                      Productos seleccionados
                                  </label>
                              </div>
                              <div class="form-check">
                                  <input class="form-check-input" type="radio" name="promoApplyTo" id="promoCategories" value="categories">
                                  <label class="form-check-label" for="promoCategories">
                                      Categorías seleccionadas
                                  </label>
                              </div>
                          </div>
                          
                          <div class="mb-3" id="productsSelection" style="display: none;">
                              <label class="form-label">Seleccionar Productos</label>
                              <div class="input-group mb-2">
                                  <input type="text" class="form-control" placeholder="Buscar productos...">
                                  <button class="btn btn-outline-secondary" type="button">Buscar</button>
                              </div>
                              <div class="border p-2" style="max-height: 200px; overflow-y: auto;">
                                  <div class="form-check">
                                      <input class="form-check-input" type="checkbox" value="" id="product1">
                                      <label class="form-check-label" for="product1">
                                          Guitarra Acústica Fender
                                      </label>
                                  </div>
                                  <div class="form-check">
                                      <input class="form-check-input" type="checkbox" value="" id="product2">
                                      <label class="form-check-label" for="product2">
                                          Batería Pearl
                                      </label>
                                  </div>
                                  <div class="form-check">
                                      <input class="form-check-input" type="checkbox" value="" id="product3">
                                      <label class="form-check-label" for="product3">
                                          Teclado Yamaha P-45
                                      </label>
                                  </div>
                              </div>
                          </div>
                          
                          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                              <button type="button" class="btn btn-outline-secondary me-md-2" onclick="loadView('listar-promociones')">
                                  Cancelar
                              </button>
                              <button type="submit" class="btn btn-primary">
                                  <i class="fas fa-save"></i> Guardar Promoción
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          
          <div class="col-md-4">
              <div class="card mb-4">
                  <div class="card-header">
                      <h5 class="card-title mb-0">Imagen de la Promoción</h5>
                  </div>
                  <div class="card-body text-center">
                      <div class="dropzone" id="promoImageDropzone" style="border: 2px dashed #ddd; border-radius: 8px; padding: 20px; cursor: pointer;">
                          <i class="fas fa-cloud-upload-alt fa-3x mb-3" style="color: #6c757d;"></i>
                          <p class="mb-0">Arrastra y suelta la imagen aquí o haz clic para seleccionar</p>
                          <input type="file" id="promoImageInput" accept="image/*" style="display: none;">
                      </div>
                      
                      <div class="mt-3" id="promoImagePreview">
                          <!-- La previsualización de la imagen se agregará aquí -->
                      </div>
                  </div>
              </div>
              
              <div class="card">
                  <div class="card-header">
                      <h5 class="card-title mb-0">Configuración Adicional</h5>
                  </div>
                  <div class="card-body">
                      <div class="form-check form-switch mb-3">
                          <input class="form-check-input" type="checkbox" id="promoStatus" checked>
                          <label class="form-check-label" for="promoStatus">Promoción Activa</label>
                      </div>
                      
                      <div class="mb-3">
                          <label for="promoCode" class="form-label">Código de Cupón (opcional)</label>
                          <input type="text" class="form-control" id="promoCode" placeholder="Ej: VERANO20">
                          <small class="text-muted">Deja en blanco para aplicar automáticamente</small>
                      </div>
                      
                      <div class="mb-3">
                          <label for="promoLimit" class="form-label">Límite de Usos</label>
                          <input type="number" class="form-control" id="promoLimit" min="0" placeholder="Deja en 0 para ilimitado">
                      </div>
                      
                      <div class="mb-3">
                          <label for="promoMinAmount" class="form-label">Mínimo de Compra</label>
                          <div class="input-group">
                              <span class="input-group-text">$</span>
                              <input type="number" class="form-control" id="promoMinAmount" min="0" step="0.01">
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `;
  
  // Inicializar eventos del formulario
  initializePromoForm();
}

// Inicializar eventos de los botones de acción de promociones
function initializePromoActions() {
  // Evento para el botón de editar
  document.querySelectorAll('.btn-outline-primary').forEach(btn => {
      btn.addEventListener('click', function() {
          // Aquí iría la lógica para cargar el formulario de edición
          alert('Editar promoción');
      });
  });
  
  // Evento para el botón de eliminar
  document.querySelectorAll('.btn-outline-danger').forEach(btn => {
      btn.addEventListener('click', function() {
          if (confirm('¿Estás seguro de que deseas eliminar esta promoción?')) {
              // Aquí iría la lógica para eliminar la promoción
              alert('Promoción eliminada');
              // Recargar la lista de promociones
              loadListarPromocionesView();
          }
      });
  });
}

// Inicializar eventos del formulario de promoción
function initializePromoForm() {
  const form = document.getElementById('promoForm');
  const promoTypeSelect = document.getElementById('promoType');
  const promoValueAddon = document.getElementById('promoValueAddon');
  const applyToRadios = document.getElementsByName('promoApplyTo');
  const productsSelection = document.getElementById('productsSelection');
  const dropzone = document.getElementById('promoImageDropzone');
  const fileInput = document.getElementById('promoImageInput');
  
  // Manejar el envío del formulario
  if (form) {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          // Aquí iría la lógica para guardar la promoción
          alert('Promoción guardada correctamente');
          // Redirigir al listado de promociones
          loadView('listar-promociones');
      });
  }
  
  // Actualizar el prefijo del valor según el tipo de descuento
  if (promoTypeSelect && promoValueAddon) {
      promoTypeSelect.addEventListener('change', function() {
          if (this.value === 'percentage') {
              promoValueAddon.textContent = '%';
          } else if (this.value === 'fixed') {
              promoValueAddon.textContent = '$';
          } else if (this.value === 'buy_x_get_y') {
              promoValueAddon.textContent = 'X';
          }
      });
  }
  
  // Mostrar/ocultar la selección de productos según la opción seleccionada
  if (applyToRadios.length > 0) {
      applyToRadios.forEach(radio => {
          radio.addEventListener('change', function() {
              if (this.value === 'selected') {
                  productsSelection.style.display = 'block';
              } else {
                  productsSelection.style.display = 'none';
              }
          });
      });
  }
  
  // Configurar la zona de arrastrar y soltar imágenes
  if (dropzone) {
      // Prevenir el comportamiento por defecto para los eventos de arrastrar
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          dropzone.addEventListener(eventName, preventDefaults, false);
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
      fileInput.addEventListener('change', handlePromoImage, false);
  }
  
  // Establecer fechas por defecto
  const now = new Date();
  const startDate = now.toISOString().slice(0, 16);
  now.setMonth(now.getMonth() + 1);
  const endDate = now.toISOString().slice(0, 16);
  
  const startDateInput = document.getElementById('promoStartDate');
  const endDateInput = document.getElementById('promoEndDate');
  
  if (startDateInput) startDateInput.value = startDate;
  if (endDateInput) endDateInput.value = endDate;
}

// Funciones auxiliares para el manejo de archivos
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  const dropzone = document.getElementById('promoImageDropzone');
  if (dropzone) {
      dropzone.style.borderColor = '#4a6cf7';
      dropzone.style.backgroundColor = 'rgba(74, 108, 247, 0.1)';
  }
}

function unhighlight() {
  const dropzone = document.getElementById('promoImageDropzone');
  if (dropzone) {
      dropzone.style.borderColor = '#ddd';
      dropzone.style.backgroundColor = '';
  }
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handlePromoImage({ target: { files } });
}

function handlePromoImage(e) {
  const file = e.target.files[0];
  const preview = document.getElementById('promoImagePreview');
  
  if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
          preview.innerHTML = `
              <div class="position-relative d-inline-block">
                  <img src="${e.target.result}" class="img-thumbnail" style="max-width: 100%; max-height: 200px;">
                  <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle" 
                          onclick="document.getElementById('promoImagePreview').innerHTML = ''; document.getElementById('promoImageInput').value = '';">
                      <i class="fas fa-times"></i>
                  </button>
              </div>
          `;
      };
      
      reader.readAsDataURL(file);
  }
}

// Hacer las funciones accesibles globalmente
window.loadListarPromocionesView = loadListarPromocionesView;
window.loadNuevaPromocionView = loadNuevaPromocionView;
