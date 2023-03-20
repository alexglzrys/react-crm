import { useRouteError } from "react-router-dom";

// Página a mostrar cuando exista un error al trabajar con React Router Dom
// Evita el que se muestre por defecto la página con información detallada del error, que puede poner en riesgo información sensible de las herramientas usadas en el proyecto

/* 
Error Bundary: 
Son componentes de React que detectan errores en cualquier parte del arbol de componentes hijo
registran los errores encontrados y 
los muestran por medio de una plantilla predeterminada

En este caso podemos personalizar la plantilla cuando suceden errores con React Router DOM
*/

export const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="text-center">
      <h1 className="text-blue-700 text-2xl mb-3 font-bold">CRM - Clientes</h1>
      <p className="font-bold mb-10">
        Lo sentimos, detectamos un error en el sistema
      </p>
      <p className="font-light text-sm bg-red-700 text-white p-3">
        {error.statusText || error.message}
      </p>
    </div>
  );
};
