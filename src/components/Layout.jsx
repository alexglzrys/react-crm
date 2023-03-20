import { Outlet } from "react-router-dom";

// Layout principal
export const Layout = () => {
  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900 p-10">
        <h1 className="font-bold text-center text-2xl text-white">
          CRM - Clientes
        </h1>
      </div>
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};
