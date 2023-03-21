import { Form, redirect, useNavigate } from "react-router-dom";
import { deleteCliente } from "../services/clientes";

// acción disparada por el formulario al momento de confirmar la eliminación de un cliente
export const action = async ({ params }) => {
  await deleteCliente(params.clienteId);
  return redirect("/");
};

export const Cliente = ({ cliente }) => {
  const navigate = useNavigate();
  const { id, nombre, telefono, email, empresa } = cliente;
  return (
    <tr className="border-b">
      <td className="p-4 space-y-2">
        <p className="text-gray-800 text-2xl">{nombre}</p>
        <p>{empresa}</p>
      </td>
      <td className="p-4">
        <p className="text-gray-600">
          <span className="text-gray-800 font-bold uppercase">Email: </span>
          {email}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-800 font-bold uppercase">Tel: </span>
          {telefono}
        </p>
      </td>
      <td className="p-4 flex gap-2">
        <button
          className="text-sm uppercase font-bold text-blue-600 hover:text-blue-700"
          onClick={() => navigate(`/clientes/${id}/editar`)}
        >
          Editar
        </button>
        {/* Usando la API de RRD 6.4, 
        para eliminar un recurso se tiene que envolver en un componente Form
        especificndo la ruta (action) y me method */}
        <Form
          method="POST"
          action={`/clientes/${id}/eliminar`}
          onSubmit={(e) => {
            // Si no hay confirmación, detenemos el comportamiento por defecto. (eliminar el recurso)
            if (!confirm("¿Deseas eliminar este cliente?")) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-sm uppercase font-bold text-red-600 hover:text-red-700"
          >
            Eliminar
          </button>
        </Form>
      </td>
    </tr>
  );
};
