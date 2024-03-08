/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export const MenuLink = ({ icono, texto, ruta }) => {
  return (
    <Link
      className=" text-white flex gap-3 hover:bg-blue-800 p-2 rounded-md transition-colors duration-150"
      to={ruta}
    >
      {icono}
      <Text fontSize={"medium"}>{texto}</Text>
    </Link>
  );
};
