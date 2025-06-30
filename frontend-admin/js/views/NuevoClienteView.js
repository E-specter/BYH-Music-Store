// Vista para Nuevo Cliente
export class NuevoClienteView {
    async render() {
        try {
            const response = await fetch('pages/novo-cliente.html');
            if (!response.ok) throw new Error('No se pudo cargar el formulario de cliente');
            return await response.text();
        } catch (error) {
            return `<div class='alert alert-danger'>${error.message}</div>`;
        }
    }
    async loadData() {
        // Aquí podrías cargar datos si es necesario
    }
    initEvents() {
        // Aquí podrías inicializar eventos del formulario
    }
}
