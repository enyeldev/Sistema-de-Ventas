/* eslint-disable react/prop-types */

import { useRef, useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

export const MenuOptions = ({ icon, name, arrOptions }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    // Agregar un event listener para detectar clics fuera del elemento
    document.addEventListener("click", handleClickOutside);

    // Eliminar el event listener al desmontar el componente
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //   Callback que muestra la lista de opciones
  // const mostrarListaOpciones = () => {
  //   setIsVisible(!isVisible);
  // };

  return (
    <div className="relative menu-desplegable">
      <div
        ref={ref}
        className="text-lg text-white flex items-center justify-between p-2 rounded-md hover:bg-blue-800 transition-colors duration-150 cursor-pointer "
        onClick={() => setIsVisible(!isVisible)}
      >
        <div className="flex gap-3">
          {icon}
          {name}
        </div>
        <IoChevronDown size={20} />
      </div>
      {isVisible && (
        <div
          className={`w-full absolute top-12 left-0 z-10 p-2 bg-blue-600 rounded-md shadow-md animate-fade-down animate-once animate-ease-in-out${
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
