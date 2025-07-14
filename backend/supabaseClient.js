// backend/supabaseClient.js

// Este script asume que el cliente de Supabase ha sido cargado globalmente
// desde el CDN en tu archivo HTML.

// También asume que las variables SUPABASE_URL y SUPABASE_ANON_KEY están disponibles
// desde el archivo config.js, que debe ser cargado antes que este.

const { createClient } = supabase;

// Se crea una única instancia del cliente de Supabase para toda la aplicación.
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
