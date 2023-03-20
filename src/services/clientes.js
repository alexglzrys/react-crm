export const getAllClientes = async() => {
    // Leer información almacenada en una variable de entorno en VITE
    const URL = import.meta.env.VITE_API_URL
    
    const peticion = await fetch(`${URL}/clientes`);
    const respuesta = await peticion.json();
    return respuesta;
}