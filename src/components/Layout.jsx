import { Link, Outlet, useLocation } from "react-router-dom";

// Layout principal
export const Layout = () => {
  // información de la ruta actual
  const location = useLocation();

  /**
   * El componente NavLink ya viene preparado para saber si el enlace es la ruta actual y responder con el CSS necesario
   * y evitar usar el hook useLocation
   * pero, al parecer sigue presentando problemas en rutas raiz.
   */

  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/4 bg-blue-900 p-10">
        <h1 className="font-bold text-center text-3xl text-white">
          CRM - Clientes
        </h1>
        <nav className="mt-10">
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "text-blue-300" : "text-white"
            } block hover: mt-1`}
          >
            Clientes
          </Link>
          <Link
            to="clientes/nuevo"
            className={`${
              location.pathname === "/clientes/nuevo"
                ? "text-blue-300"
                : "text-white"
            } block hover: mt-1`}
          >
            Nuevo cliente
          </Link>
        </nav>
      </aside>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};
