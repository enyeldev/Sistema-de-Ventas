import { useState } from "react";

import { BiLogOut } from "react-icons/bi";
import { ModalCerrarCaja } from "./ModalCerrarCaja";
export const BtnCierreCaja = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="text-white flex gap-3 hover:bg-blue-800 p-2 rounded-md transition-colors duration-150 cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <BiLogOut size={25} />
        Cerrar caja
      </div>

      {showModal && (
        <ModalCerrarCaja show={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
};
