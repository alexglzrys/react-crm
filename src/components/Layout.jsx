import { Outlet } from "react-router-dom";

// Layout principal
export const Layout = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Administrador de Clientes - CRM React
      </h1>
      <Outlet />
    </div>
  );
};
