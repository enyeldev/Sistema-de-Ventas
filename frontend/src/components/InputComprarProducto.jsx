/* eslint-disable react/prop-types */
import { Input, Text } from "@chakra-ui/react";

export const InputComprarProducto = ({
  label,
  setAlerta,
  setEstado,
  estado,
  placeHolder,
  soloLeer,
  id,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Text fontWeight={"600"} fontSize={"large"}>
          <label htmlFor={id}>{label}</label>
        </Text>
        <Input
          id={id}
          background={"gray.100"}
          placeholder={placeHolder}
          onChange={({ target }) => {
            setAlerta({});
            setEstado(target.value);
          }}
          value={estado}
          readOnly={soloLeer}
        />
      </div>
    </>
  );
};
