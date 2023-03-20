import { useNavigate } from "react-router-dom";
import Formulario from "../components/Formulario";

export const ClientesNuevo = () => {
  // Hook para navegar de forma programatica
  const navigate = useNavigate();

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
        <form>
          <Formulario />
          <input
            type="submit"
            value="Registrar Cliente"
            className="uppercase font-bold text-white bg-blue-800 w-full text-lg mt-5 p-3"
          />
        </form>
      </div>
    </>
  );
};
