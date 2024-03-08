import { BiLogOut } from "react-icons/bi";

export const BtnCierreCaja = () => {
  return (
    <div className="text-white flex gap-3 hover:bg-blue-800 p-2 rounded-md transition-colors duration-150 cursor-pointer">
      <BiLogOut size={25} />
      Cerrar caja
    </div>
  );
};
