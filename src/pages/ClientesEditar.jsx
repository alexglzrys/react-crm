import { Form, useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario";
import { getCliente } from "../services/clientes";

export const loader = async ({ params }) => {
  // Si usamos la API integrada de RRD 6.4, en el loader automáticamente se inyectan los parametros de ruta
  const cliente = await getCliente(params.clienteId);
  // Si no hay resultados, enviar una respuesta de error (lanza la plantilla de error)
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No se localizó información para el cliente solicitado",
    });
  }
  return cliente;
};

export const ClientesEditar = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-bold text-3xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Modifique los datos del formulario para actualizar el cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white font-bold uppercase py-1 px-3"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-sm md:w-3/4 p-6 mx-auto mt-10">
        {/* Usar componente Form para procesar formulario mediante la API de React Router Dom 6.4 */}
        <Form method="post" noValidate>
          <Formulario />
          <input
            type="submit"
            value="Actualizar Cliente"
            className="uppercase font-bold text-white bg-blue-800 w-full text-lg mt-5 p-3"
          />
        </Form>
      </div>
    </>
  );
};
