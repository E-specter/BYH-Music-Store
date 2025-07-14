// backend/services/products.js

// Este objeto 'productService' agrupa todas las funciones relacionadas con la tabla 'products'.
// Utiliza la instancia 'supabaseClient' que fue creada en supabaseClient.js

const productService = {
    /**
     * Obtiene todos los productos de la base de datos.
     * @returns {Promise<{data: any[], error: any}>} Un objeto con los datos o un error.
     */
    getAllProducts: async () => {
        // Realiza una consulta a la tabla 'products' para seleccionar todos los registros (*).
        const { data, error } = await supabaseClient
            .from('products')
            .select('*');

        return { data, error };
    },

    /**
     * Obtiene un producto específico por su ID.
     * @param {string | number} id - El ID del producto a buscar.
     * @returns {Promise<{data: any, error: any}>} Un objeto con el dato o un error.
     */
    getProductById: async (id) => {
        // Realiza una consulta para seleccionar el producto donde el 'id' coincida.
        // .single() asegura que se devuelva un solo objeto en lugar de un array.
        const { data, error } = await supabaseClient
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        return { data, error };
    },

    /**
     * Crea un nuevo producto en la base de datos.
     * @param {object} productData - Un objeto con los datos del nuevo producto (ej: { name: '...', price: ... }).
     * @returns {Promise<{data: any, error: any}>} Un objeto con el dato creado o un error.
     */
    createProduct: async (productData) => {
        // Inserta un nuevo registro en la tabla 'products'.
        const { data, error } = await supabaseClient
            .from('products')
            .insert([productData])
            .select()
            .single();

        return { data, error };
    }
};
