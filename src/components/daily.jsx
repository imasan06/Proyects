import { Outlet, useLocation } from "react-router-dom";
import Bentobox from "./routinesbento/bento";
import { useRoutine } from "./daily-cards/routines/Customrou";
export const Daily = () => {
  const location = useLocation();
  const routine = useRoutine();
  // Si la ruta comienza con "/dailyroutine/" (con slash al final), significa que es una subruta
  const isSubRoute = location.pathname.startsWith("/dailyroutine/");

  return (
    <div>
      {!isSubRoute && <Bentobox routine={routine} />} {/* Renderiza solo si NO estás en una subruta */}
      <Outlet />
    </div>
  );
};
