import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { Error } from "../components/Error";
import Formulario from "../components/Formulario";
import { getCliente, updateCliente } from "../services/clientes";

// Loader para consultar la información del cliente a editar
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

// Action para actualizar la información enviada desde el formulario
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");

  // Validar campos requeridos
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son requeridos");
  }

  // Validar email
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("Email no válido");
  }

  // Inspeccionar si hay errores de validación.
  // En caso de ser afirmativo, notificarlo a la vista
  if (Object.keys(errores).length) {
    return errores;
  }

  // Todo es correcto, proceder con la actualización
  await updateCliente(params.clienteId, datos);
  return redirect("/");
};

export const ClientesEditar = () => {
  const navigate = useNavigate();
  // Recuperar la información del loader (cliente)
  const cliente = useLoaderData();
  // Recuperar la información del action (posibles errores de validación)
  const errores = useActionData();
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
        {/* Mostrar componente de error - al ser una funcion asincrona, puede demorar la existencia de valor en errores */}
        {errores?.length && (
          <Error>
            {errores.map((error, i) => (
              <p key={i}>{error}</p>
            ))}
          </Error>
        )}
        {/* Usar componente Form para procesar formulario mediante la API de React Router Dom 6.4 */}
        <Form method="post" noValidate>
          <Formulario cliente={cliente} />
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
