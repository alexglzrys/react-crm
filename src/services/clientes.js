export const getAllClientes = async() => {
    // Leer información almacenada en una variable de entorno en VITE
    const URL = import.meta.env.VITE_API_URL

    const peticion = await fetch(`${URL}/clientes`);
    const respuesta = await peticion.json();
    return respuesta;
}

export const createCliente = async(cliente) => {
    try {
        const URL = import.meta.env.VITE_API_URL + '/clientes';
        const peticion = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const respuesta = await peticion.json();
    } catch (error) {
        console.log(error)
    }
}