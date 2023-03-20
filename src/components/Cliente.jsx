import { useNavigate } from "react-router-dom";

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
        <button className="text-sm uppercase font-bold text-red-600 hover:text-red-700">
          Eliminar
        </button>
      </td>
    </tr>
  );
};
