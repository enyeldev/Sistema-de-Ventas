/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";


export const MenuOptions = ({ icon, name, arrOptions }) => {
  const menuRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  //   Callback que muestra la lista de opciones
  const mostrarListaOpciones = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative ">
      <div
        className="text-lg text-white flex items-center justify-between p-2 rounded-md hover:bg-blue-800 transition-colors duration-150 cursor-pointer"
        ref={menuRef}
        onClick={mostrarListaOpciones}
      >
        <div className="flex gap-3">
          {icon}
          {name}
        </div>
        <IoChevronDown size={20} />
      </div>
      {isVisible && (
        <div
          className={`w-full absolute top-12 left-0 z-10 p-2 bg-blue-600 rounded-md shadow-md animate-fade-down animate-once animate-ease-in-out ${
            isVisible ? "" : ""
          }`}
        >
          {arrOptions.map((e) => {
            return e;
          })}
        </div>
      )}
    </div>
  );
};
