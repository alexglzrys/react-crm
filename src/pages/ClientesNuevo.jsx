import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { Error } from "../components/Error";
import Formulario from "../components/Formulario";
import { createCliente } from "../services/clientes";

/**
 * La API de React Router DOM 6.4
 *
 * Nos ayuda a cargar información y enviar información desde un formulario de forma más rapida
 * que la metodología tradicional
 *
 * Para enviar información de un formulario se requiere exportar una función llamada action
 * Para obtener datos desde un API u objeto, se requiere exportar una función loader (esto es similar al uso de useState y useEffect)
 *
 * Se debe informar de la existencia de estas funciones, en la declaración de rutas
 */
export const action = async ({ request }) => {
  // Recuperar los datos enviados en el formulario (es una acción asincrona para el API de RRD 6.4)
  const formData = await request.formData();

  const datos = Object.fromEntries(formData);
  const email = formData.get("email");

  // Validar datos
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

  // Retornar información sobre errores encontrados en la petición
  if (Object.keys(errores).length) {
    return errores;
  }

  // Todo es correcto, realizar petición HTTP para crear el recurso de cliente
  await createCliente(datos);
  // Redireccionar a otra ruta (API RRD 6.4). Se puede seguir utiizando el enfoque tradicional,
  // pero no es bueno mezclar con la API de React Router Dom
  return redirect("/");
};

export const ClientesNuevo = () => {
  // Hook para navegar de forma programatica
  const navigate = useNavigate();
  // Hook para recuperar información de la acción de formulario (React Router Dom 6.4 componente Form)
  const errores = useActionData();

  return (
    <>
      <h1 className="font-bold text-3xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Llene todos los datos para registrar un nuevo cliente
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
          <Formulario />
          <input
            type="submit"
            value="Registrar Cliente"
            className="uppercase font-bold text-white bg-blue-800 w-full text-lg mt-5 p-3"
          />
        </Form>
      </div>
    </>
  );
};
