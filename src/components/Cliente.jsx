export const Cliente = ({ cliente }) => {
  const { id, nombre, telefono, email, empresa } = cliente;
  return (
    <tr>
      <td className="p-2">{nombre}</td>
      <td className="p-2">{telefono}</td>
      <td className="p-2">{email}</td>
      <td className="p-2">{empresa}</td>
      <td className="p-2"></td>
    </tr>
  );
};
