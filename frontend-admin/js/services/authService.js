/**
 * Servicio de autenticación
 * Maneja la autenticación y sesión de usuarios
 */

export const authService = {
    /**
     * Obtiene el usuario actual
     * @returns {Object|null} Usuario actual o null si no está autenticado
     */
    getCurrentUser() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    },

    /**
     * Verifica si el usuario está autenticado
     * @returns {boolean} true si está autenticado, false en caso contrario
     */
    isAuthenticated() {
        return !!localStorage.getItem('authToken');
    },

    /**
     * Verifica si el usuario tiene un rol específico
     * @param {string} role - Rol a verificar
     * @returns {boolean} true si el usuario tiene el rol, false en caso contrario
     */
    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.rol === role;
    },

    /**
     * Cierra la sesión del usuario
     */
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userRole');
        window.location.href = 'login.html';
    }
};

export default authService;
