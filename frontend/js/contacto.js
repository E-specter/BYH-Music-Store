/**
 * Archivo: contacto.js
 * Descripción: Maneja la lógica del formulario de contacto.
 * Funcionalidades:
 *   1. Muestra/oculta campos según el tipo de contacto
 *   2. Valida el formulario antes de enviar
 *   3. Valida RUC y teléfono peruano
 *   4. Envía el formulario (simulación)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const formulario = document.getElementById('formularioContacto');
    const tipoContacto = document.getElementById('tipoContacto');
    const empresaFields = document.getElementById('empresaFields');
    const empresaInput = document.getElementById('empresa');
    
    // 1. Muestra/oculta campos de empresa según el tipo de contacto
    tipoContacto.addEventListener('change', function() {
        if (this.value === 'empresa') {
            empresaFields.style.display = 'block';
            empresaInput.setAttribute('required', 'required');
        } else {
            empresaFields.style.display = 'none';
            empresaInput.removeAttribute('required');
            empresaInput.value = '';
            document.getElementById('ruc').value = '';
        }
    });

    // 2. Validación del formulario al enviar
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Valida RUC si es empresa
        if (tipoContacto.value === 'empresa') {
            const ruc = document.getElementById('ruc').value;
            if (ruc && !validarRUC(ruc)) {
                alert('Por favor ingrese un RUC válido (11 dígitos numéricos)');
                return false;
            }
        }
        
        // Valida teléfono si se ingresó
        const telefono = document.getElementById('telefono').value;
        if (telefono && !validarTelefono(telefono)) {
            alert('Por favor ingrese un número de teléfono válido (9 o 10 dígitos)');
            return false;
        }
        
        // Si todo está correcto, envía el formulario
        enviarFormulario();
    });
    
    // 3. Función para validar RUC peruano (11 dígitos)
    function validarRUC(ruc) {
        return /^\d{11}$/.test(ruc);
    }
    
    // 3. Función para validar teléfono peruano (9 o 10 dígitos)
    function validarTelefono(telefono) {
        return /^\d{9,10}$/.test(telefono);
    }
    
    // 4. Función para enviar el formulario (simulación)
    function enviarFormulario() {
        const formData = new FormData(formulario);
        const datos = Object.fromEntries(formData);
        
        console.log('Datos del formulario:', datos);
        
        // Muestra mensaje de éxito
        alert('¡Gracias por contactarnos! Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.');
        formulario.reset();
        
        // Oculta campos de empresa después de enviar
        empresaFields.style.display = 'none';
    }
    
    // Validación en tiempo real para RUC (solo números y máximo 11 dígitos)
    const rucInput = document.getElementById('ruc');
    if (rucInput) {
        rucInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 11);
        });
    }
    
    // Validación en tiempo real para teléfono (solo números y máximo 10 dígitos)
    const telefonoInput = document.getElementById('telefono');
    if (telefonoInput) {
        telefonoInput.addEventListener('input', function() {
            this.value = this.value.replace(/\D/g, '').slice(0, 10);
        });
    }
});
