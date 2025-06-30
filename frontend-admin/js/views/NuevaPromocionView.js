// Vista para Nueva Promoción
export class NuevaPromocionView {
    async render() {
        try {
            const response = await fetch('pages/nueva-promocion.html');
            if (!response.ok) throw new Error('No se pudo cargar el formulario de promoción');
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
