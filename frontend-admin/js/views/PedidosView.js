/**
 * Vista de Pedidos
 */
export class PedidosView {
    constructor() {
        this.pedidos = [];
    }

    async loadData() {
        try {
            const response = await fetch('data/pedidos.json');
            if (!response.ok) throw new Error('No se pudo cargar pedidos');
            this.pedidos = await response.json();
        } catch (error) {
            this.pedidos = [];
            console.error('Error al cargar pedidos:', error);
        }
    }

    render() {
        let rows = '';
        if (this.pedidos.length === 0) {
            rows = `<tr><td colspan='6' class='text-center'>No hay pedidos registrados</td></tr>`;
        } else {
            rows = this.pedidos.map(pedido => `
                <tr>
                    <td>${pedido.id}</td>
                    <td>${pedido.cliente}</td>
                    <td>${pedido.fecha}</td>
                    <td>${pedido.total}</td>
                    <td>${pedido.estado}</td>
                    <td>
                        <button class='btn btn-sm btn-outline-primary'><i class='fas fa-edit'></i></button>
                        <button class='btn btn-sm btn-outline-danger'><i class='fas fa-trash'></i></button>
                    </td>
                </tr>
            `).join('');
        }
        return `
            <div class=\"d-flex justify-content-between align-items-center mb-4\">
                <div>
                    <h1><i class=\"fas fa-shopping-cart\"></i> Pedidos</h1>
                    <p class=\"mb-0\">Gestiona los pedidos realizados en la tienda</p>
                </div>
                <div>
                    <input type=\"text\" class=\"form-control d-inline-block w-auto\" id=\"buscarPedido\" placeholder=\"Buscar pedido...\">
                    <a href=\"#nuevo-pedido\" class=\"btn btn-primary\" id=\"nuevoPedidoBtn\" onclick=\"app.loadView('nuevo-pedido'); return false;\">Nuevo Pedido</a>
                </div>
            </div>
            <div class=\"card\">
                <div class=\"card-body\">
                    <div class=\"table-responsive\">
                        <table class=\"table table-hover\">
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
                            <tbody id=\"pedidosTableBody\">
                                ${rows}
                            </tbody>
                        </table>
                    </div>
                    <!-- Paginación -->
                    <nav aria-label=\"Page navigation\" class=\"mt-4\">
                        <ul class=\"pagination justify-content-center\">
                            <li class=\"page-item disabled\">
                                <a class=\"page-link\" href=\"#\" tabindex=\"-1\" aria-disabled=\"true\">Anterior</a>
                            </li>
                            <li class=\"page-item active\"><a class=\"page-link\" href=\"#\">1</a></li>
                            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>
                            <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>
                            <li class=\"page-item\">
                                <a class=\"page-link\" href=\"#\">Siguiente</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        `;
    }

    initEvents() {
        // Aquí puedes agregar eventos para editar/eliminar pedidos
    }
}

export default PedidosView;
