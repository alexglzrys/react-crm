import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import "./index.css";
import { ClientesNuevo } from "./pages/ClientesNuevo";
import { Home, loader as loaderClientes } from "./pages/Home";

/**
 * React Router Dom
 *
 * Librería para el manejo de rutas en aplicaciones de React
 * Se usa cuando el sistema incluye muchas vistas
 * Su uso no es obligatorio, ya que podemos condicionar los componentes que han de aparecer en la pantalla. Pero se recomienda cuando el sistema incluye muchas pantallas
 * A partir de la versión 6.4, funciona como un framework y su apariencia de uso es similar a Angular. Pero se puede seguir usando de la forma tradicional
 */

// Definición de rutas por medio del contructor de rutas de React Router Dom
const router = createBrowserRouter([
  {
    path: "/",
    // Si se recquiere usar un Layout, este funge como elemento principal, y los hijos serán las vistas a mostrar en el elemento Outlet
    element: <Layout />,
    children: [
      {
        // El elemento Home será usado como vista en el path / (principal)
        index: true,
        element: <Home />,
        loader: loaderClientes,
      },
      {
        path: "clientes/nuevo",
        element: <ClientesNuevo />,
      },
    ],
  },
  {
    path: "/nosotros",
    element: <h1>Nosotros</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Declarar el proveedor de rutas para mi aplicación */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
