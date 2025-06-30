/**
 * Vista del Dashboard
 * Muestra estadísticas y resumen de la aplicación
 */

export class DashboardView {
    constructor() {
        this.container = document.getElementById('contentArea');
    }

    /**
     * Renderiza el contenido del dashboard
     */
    render() {
        return `
            <div class="dashboard-content">
                <div class="row g-3 mb-4">
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div class="card bg-primary text-white h-100">
                            <div class="card-body">
                                <h5 class="card-title">Total Ventas</h5>
                                <h2 class="mb-0">$12,450</h2>
                                <p class="mb-0 small"><i class="fas fa-arrow-up"></i> 12% desde el mes pasado</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div class="card bg-success text-white h-100">
                            <div class="card-body">
                                <h5 class="card-title">Pedidos</h5>
                                <h2 class="mb-0">124</h2>
                                <p class="mb-0 small"><i class="fas fa-arrow-up"></i> 8% desde el mes pasado</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div class="card bg-info text-white h-100">
                            <div class="card-body">
                                <h5 class="card-title">Productos</h5>
                                <h2 class="mb-0">56</h2>
                                <p class="mb-0 small"><i class="fas fa-box"></i> 12 en stock bajo</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div class="card bg-warning text-dark h-100">
                            <div class="card-body">
                                <h5 class="card-title">Clientes</h5>
                                <h2 class="mb-0">89</h2>
                                <p class="mb-0 small"><i class="fas fa-users"></i> 15 nuevos este mes</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row g-3">
                    <div class="col-12 col-lg-8">
                        <div class="card h-100">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Ventas Recientes</h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>ID Pedido</th>
                                                <th>Cliente</th>
                                                <th>Productos</th>
                                                <th>Total</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody id="recent-orders">
                                            <!-- Las órdenes se cargarán aquí dinámicamente -->
                                            <tr>
                                                <td colspan="5" class="text-center">Cargando datos recientes...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4">
                        <div class="card h-100">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Actividad Reciente</h5>
                            </div>
                            <div class="card-body">
                                <div class="activity-feed">
                                    <div class="d-flex mb-3">
                                        <div class="avatar me-3">
                                            <img src="./img/default-avatar.svg" alt="Usuario" class="rounded-circle" width="40" height="40">
                                        </div>
                                        <div>
                                            <p class="mb-1"><strong>Ana López</strong> actualizó el producto <strong>Guitarra Eléctrica Fender</strong></p>
                                            <p class="text-muted small mb-0">Hace 5 minutos</p>
                                        </div>
                                    </div>
                                    <div class="d-flex mb-3">
                                        <div class="avatar me-3">
                                            <img src="./img/default-avatar.svg" alt="Usuario" class="rounded-circle" width="40" height="40">
                                        </div>
                                        <div>
                                            <p class="mb-1"><strong>Marta García</strong> creó una nueva promoción</p>
                                            <p class="text-muted small mb-0">Hace 2 horas</p>
                                        </div>
                                    </div>
                                    <div class="d-flex mb-3">
                                        <div class="avatar me-3">
                                            <img src="./img/default-avatar.svg" alt="Usuario" class="rounded-circle" width="40" height="40">
                                        </div>
                                        <div>
                                            <p class="mb-1"><strong>Carlos Ruiz</strong> realizó un nuevo pedido #1234</p>
                                            <p class="text-muted small mb-0">Ayer a las 14:30</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Inicializa los eventos del dashboard
     */
    initEvents() {
        // Aquí puedes inicializar eventos específicos del dashboard
        console.log('DashboardView inicializado');
    }

    /**
     * Carga los datos del dashboard
     */
    async loadData() {
        try {
            // Aquí iría la lógica para cargar datos del dashboard
            // Por ahora, simulamos una carga con un timeout
            setTimeout(() => {
                const tbody = document.getElementById('recent-orders');
                if (tbody) {
                    tbody.innerHTML = `
                        <tr>
                            <td>#1234</td>
                            <td>Juan Pérez</td>
                            <td>3 productos</td>
                            <td>$1,250.00</td>
                            <td><span class="badge bg-success">Completado</span></td>
                        </tr>
                        <tr>
                            <td>#1233</td>
                            <td>María González</td>
                            <td>2 productos</td>
                            <td>$890.00</td>
                            <td><span class="badge bg-warning">En proceso</span></td>
                        </tr>
                        <tr>
                            <td>#1232</td>
                            <td>Carlos López</td>
                            <td>1 producto</td>
                            <td>$450.00</td>
                            <td><span class="badge bg-danger">Pendiente</span></td>
                        </tr>
                    `;
                }
            }, 1000);
        } catch (error) {
            console.error('Error al cargar datos del dashboard:', error);
        }
    }

    /**
     * Método para limpiar recursos cuando se cierra la vista
     */
    destroy() {
        // Limpiar cualquier evento o referencia para evitar memory leaks
    }
}

export default DashboardView;

                      "No se pudo cargar el panel de control. Por favor, intente nuevamente."
            `;
                    }</p>
                    <button class="btn btn-primary" onclick="window.app.loadView('dashboard')">Reintentar</button>
                </div>
            `;
  /**
   * Carga los datos del dashboard
   */
  async loadData() {
    try {
      // Datos de ejemplo
      this.stats = {
        totalSales: 12453.75,
        totalOrders: 128,
        totalProducts: 256,
        totalCustomers: 89,
      };

      this.recentSales = [
        {
          id: 1001,
          customer: "Juan Pérez",
          date: "2023-05-15",
          amount: 1250.5,
          status: "completed",
        },
        {
          id: 1002,
          customer: "María Gómez",
          date: "2023-05-14",
          amount: 850.75,
          status: "completed",
        },
        {
          id: 1003,
          customer: "Carlos López",
          date: "2023-05-14",
          amount: 420.3,
          status: "pending",
        },
        {
          id: 1004,
          customer: "Ana Torres",
          date: "2023-05-13",
          amount: 1560.2,
          status: "completed",
        },
        {
          id: 1005,
          customer: "Luis Ramírez",
          date: "2023-05-12",
          amount: 320.9,
          status: "cancelled",
        },
      ];

      this.topProducts = [
        { id: 1, name: "Guitarra Acústica Fender", sales: 45, revenue: 22500 },
        {
          id: 2,
          name: "Batería Electrónica Yamaha",
          sales: 28,
          revenue: 16800,
        },
        { id: 3, name: "Teclado Casio CT-X700", sales: 35, revenue: 15750 },
        { id: 4, name: "Micrófono Shure SM58", sales: 52, revenue: 13000 },
        { id: 5, name: "Amplificador Marshall", sales: 18, revenue: 16200 },
      ];
    } catch (error) {
      console.error("Error al cargar datos del dashboard:", error);
      throw error;
    }
  }

  /**
   * Inicializa el dashboard después de cargar el template
   */
  initializeDashboard() {
    // Renderizar las tarjetas de estadísticas
    this.renderStats();

    // Renderizar ventas recientes
    this.renderRecentSales();

    // Renderizar productos más vendidos
    this.renderTopProducts();

    // Inicializar gráficos
    this.initCharts();

    // Configurar eventos
    this.initializeEvents();
  }

  /**
   * Renderiza las tarjetas de estadísticas
   */
  renderStats() {
    const statsContainer = document.getElementById("statsContainer");
    if (!statsContainer) return;

    statsContainer.innerHTML = `
            <div class="col-md-3 mb-4">
                <div class="card bg-primary text-white h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-uppercase">Ventas Totales</h6>
                                <h2 class="mb-0">${this.formatCurrency(
                                  this.stats.totalSales
                                )}</h2>
                            </div>
                            <i class="fas fa-dollar-sign fa-3x opacity-50"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="card bg-success text-white h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-uppercase">Pedidos</h6>
                                <h2 class="mb-0">${this.stats.totalOrders}</h2>
                            </div>
                            <i class="fas fa-shopping-cart fa-3x opacity-50"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="card bg-info text-white h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-uppercase">Productos</h6>
                                <h2 class="mb-0">${
                                  this.stats.totalProducts
                                }</h2>
                            </div>
                            <i class="fas fa-guitar fa-3x opacity-50"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="card bg-warning text-white h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="text-uppercase">Clientes</h6>
                                <h2 class="mb-0">${
                                  this.stats.totalCustomers
                                }</h2>
                            </div>
                            <i class="fas fa-users fa-3x opacity-50"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  /**
   * Renderiza la tabla de ventas recientes
   */
  renderRecentSales() {
    const recentSalesContainer = document.getElementById("recentSalesTable");
    if (!recentSalesContainer) return;

    const rows = this.recentSales
      .map(
        (sale) => `
            <tr>
                <td>#${sale.id}</td>
                <td>${sale.customer}</td>
                <td>${new Date(sale.date).toLocaleDateString()}</td>
                <td>$${sale.amount.toFixed(2)}</td>
                <td><span class="badge bg-${this.getStatusBadgeClass(
                  sale.status
                )}">${this.formatStatus(sale.status)}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="window.app.loadView('pedidos', {id: ${
                      sale.id
                    }})">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `
      )
      .join("");

    recentSalesContainer.innerHTML = `
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th># Pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
            <div class="text-end mt-3">
                <a href="#pedidos" class="btn btn-outline-primary" onclick="window.app.loadView('pedidos'); return false;">
                    Ver todos los pedidos <i class="fas fa-arrow-right ms-1"></i>
                </a>
            </div>
        `;
  }

  /**
   * Renderiza la lista de productos más vendidos
   */
  renderTopProducts() {
    const topProductsContainer = document.getElementById("topProductsList");
    if (!topProductsContainer) return;

    const items = this.topProducts
      .map(
        (product, index) => `
            <div class="d-flex align-items-center mb-3">
                <div class="flex-shrink-0 me-3">
                    <span class="badge bg-primary rounded-circle p-2">${
                      index + 1
                    }</span>
                </div>
                <div class="flex-grow-1">
                    <h6 class="mb-0">${product.name}</h6>
                    <small class="text-muted">${
                      product.sales
                    } ventas • $${product.revenue.toLocaleString()}</small>
                </div>
                <div class="flex-shrink-0">
                    <div class="progress" style="width: 100px;">
                        <div class="progress-bar bg-success" role="progressbar" 
                             style="width: ${
                               (product.sales / this.topProducts[0].sales) * 100
                             }%" 
                             aria-valuenow="${product.sales}" 
                            aria-valuemin="0" 
                             aria-valuemax="100">
                        </div>
                    </div>
                </div>
            </div>
        `
      )
      .join("");

    topProductsContainer.innerHTML = items;
  }

  /**
   * Inicializa los gráficos del dashboard
   */
  initCharts() {
    // Datos de ejemplo para gráficos
    const salesData = {
      labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
      datasets: [
        {
          label: "Ventas 2023",
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          fill: true,
          backgroundColor: "rgba(75, 192, 192, 0.1)",
        },
      ],
    };

    const categoriesData = {
      labels: [
        "Guitarras",
        "Baterías",
        "Teclados",
        "Amplificadores",
        "Micrófonos",
      ],
      datasets: [
        {
          data: [35, 20, 25, 15, 30],
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Inicializar gráfico de ventas
    const salesCtx = document.getElementById("salesChart");
    if (salesCtx) {
      new Chart(salesCtx.getContext("2d"), {
        type: "line",
        data: salesData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Ventas Mensuales",
            },
          },
        },
      });
    }

    // Inicializar gráfico de categorías
    const categoriesCtx = document.getElementById("categoriesChart");
    if (categoriesCtx) {
      new Chart(categoriesCtx.getContext("2d"), {
        type: "doughnut",
        data: categoriesData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "Ventas por Categoría",
            },
          },
        },
      });
    }
  }

  /**
   * Inicializa los eventos del dashboard
   */
  initializeEvents() {
    // Evento para actualizar datos
    const refreshBtn = document.getElementById("refreshDashboard");
    if (refreshBtn) {
      refreshBtn.addEventListener("click", async () => {
        try {
          refreshBtn.disabled = true;
          refreshBtn.innerHTML =
            '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Actualizando...';

          await this.loadData();
          this.initializeDashboard();

          // Mostrar notificación de éxito
          this.showNotification("Datos actualizados correctamente", "success");
        } catch (error) {
          console.error("Error al actualizar datos:", error);
          this.showNotification("Error al actualizar los datos", "danger");
        } finally {
          refreshBtn.disabled = false;
          refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Actualizar';
        }
      });
    }
  }

  /**
   * Muestra una notificación al usuario
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de notificación (success, danger, warning, info)
   */
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `alert alert-${type} alert-dismissible fade show`;
    notification.role = "alert";
    notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

    const container =
      document.getElementById("notificationsContainer") || document.body;
    container.prepend(notification);

    // Eliminar la notificación después de 5 segundos
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  /**
   * Obtiene la clase CSS para el badge de estado
   * @param {string} status - Estado del pedido
   * @returns {string} Clase CSS para el badge
   */
  getStatusBadgeClass(status) {
    const statusClasses = {
      completed: "success",
      pending: "warning",
      cancelled: "danger",
      processing: "info",
      shipped: "primary",
    };
    return statusClasses[status] || "secondary";
  }

  /**
   * Formatea el estado para mostrarlo al usuario
   * @param {string} status - Estado del pedido
   * @returns {string} Estado formateado
   */
  formatStatus(status) {
    const statusLabels = {
      completed: "Completado",
      pending: "Pendiente",
      cancelled: "Cancelado",
      processing: "Procesando",
      shipped: "Enviado",
    };
    return statusLabels[status] || status;
  }

  /**
   * Formatea un número como moneda
   * @param {number} amount - Cantidad a formatear
   * @returns {string} Cantidad formateada como moneda
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 2,
    }).format(amount);
  }
}

// Hacer la clase accesible globalmente
window.DashboardView = DashboardView;
