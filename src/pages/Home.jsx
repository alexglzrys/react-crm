import { useLoaderData } from "react-router-dom";
import { Cliente } from "../components/Cliente";
import { getAllClientes } from "../services/clientes";

/**
 * A partir de la versión 6.4 de React Router Dom
 *
 * Podemos declarar y exportar una función llamada loader que sirva para recuperar
 * los datos a mostrar en la vista (fetch)
 * Por tanto esta funcion siempre debe retornar un valor, mismo que se recupera a través del hook
 * useLoaderData
 * Se debe declarar en el sistema de rutas que apunta a esta vista, a través del path loader
 *
 * Se puede usar en lugar del clásico useEffect y userState para recuperar y almacenar los
 * datos.
 * Sin embargo, aun podemos seguir usando la técnica anterior
 */
export const loader = async () => {
  // conectar al servicio para recuperar clientes
  const clientes = await getAllClientes();
  return clientes;
};

export const Home = () => {
  // usar el hook personalizado de React Router Dom 6.4 para recuperar la información
  const clientes = useLoaderData();

  return (
    <>
      <h1 className="font-bold text-3xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      {/* Mostrar tabla de contenido si existe registrado al menos un cliente */}
      {clientes.length ? (
        <table className="table table-auto bg-white shadow mt-5 w-full">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <Cliente key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">No hay clientes registrados</p>
      )}
    </>
  );
};
