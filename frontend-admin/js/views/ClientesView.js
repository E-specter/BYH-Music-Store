/**
 * Vista de Clientes
 */
export class ClientesView {
    constructor() {
        this.clientes = [];
    }

    async loadData() {
        try {
            const response = await fetch('data/clientes.json');
            if (!response.ok) throw new Error('No se pudo cargar clientes');
            this.clientes = await response.json();
        } catch (error) {
            this.clientes = [];
            console.error('Error al cargar clientes:', error);
        }
    }

    render() {
        let rows = '';
        if (this.clientes.length === 0) {
            rows = `<tr><td colspan='7' class='text-center'>No hay clientes registrados</td></tr>`;
        } else {
            rows = this.clientes.map(cliente => `
                <tr>
                    <td>${cliente.id}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefono || ''}</td>
                    <td>${cliente.fecha_registro || ''}</td>
                    <td>${cliente.estado || ''}</td>
                    <td>
                        <button class='btn btn-sm btn-outline-primary'><i class='fas fa-edit'></i></button>
                        <button class='btn btn-sm btn-outline-danger'><i class='fas fa-trash'></i></button>
                    </td>
                </tr>
            `).join('');
        }
        return `
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1><i class="fas fa-users"></i> Clientes</h1>
                    <p class="mb-0">Visualiza y administra los clientes registrados en la tienda</p>
                </div>
                <a href="#nuevo-cliente" class="btn btn-primary" id="nuevoClienteBtn" onclick="app.loadView('nuevo-cliente'); return false;">
                    <i class="fas fa-user-plus"></i> Nuevo Cliente
                </a>
            </div>
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Fecha Registro</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody id="clientesTableBody">
                                ${rows}
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
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
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
        // Aquí puedes agregar eventos para editar/eliminar clientes
    }
}

export default ClientesView;
