import { nombreDeRuta } from "../helpers/nombreDeRuta";

import { useLocation } from "react-router-dom";
import { TiShoppingCart, TiPrinter } from "react-icons/ti";
import { CiShoppingTag, CiShop, CiCircleMore } from "react-icons/ci";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiBackForth } from "react-icons/gi";
import { MdLocalPrintshop } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import { IoCreate } from "react-icons/io5";
import { Heading } from "@chakra-ui/react";
import { MenuLink } from "./MenuLink";
import { MenuOptions } from "./MenuOptions";
import { BtnCierreCaja } from "./BtnCierreCaja";

export const Header = () => {
  const location = useLocation();

  return (
    <header className=" h-full w-[15%] ">
      <div className="flex flex-col gap-8">
        <div className="w-full border-b border-gray-200 px-2 py-4">
          <Heading className="text-white" fontSize={"large"}>
            Sistema de ventas / {nombreDeRuta(location.pathname)}
          </Heading>
        </div>

        <nav className="flex flex-col gap-2 px-2">
          <MenuLink
            icono={
              <IoHomeOutline size={25} className="group-hover:text-white" />
            }
            ruta={"/caja"}
            texto={"Inicio"}
          />

          <MenuOptions
            icon={<CiShop size={25} />}
            name={"Vender"}
            arrOptions={[
              <MenuLink
                key={"vender al contado"}
                icono={
                  <TiShoppingCart
                    size={25}
                    className="group-hover:text-white"
                  />
                }
                ruta={"/caja/vender"}
                texto={"Vender al contado"}
              />,

              <MenuLink
                key={"vender a credito"}
                icono={
                  <ImCreditCard size={25} className="group-hover:text-white" />
                }
                ruta={"/caja/venderCredito"}
                texto={"Vender a credito"}
              />,
            ]}
          />

          <MenuLink
            icono={
              <CiShoppingTag size={25} className="group-hover:text-white" />
            }
            ruta={"/caja/comprar"}
            texto={"Comprar"}
          />

          <MenuLink
            icono={<GiTakeMyMoney size={25} />}
            ruta={"/caja/cobrar-deudas"}
            texto={"Cobrar deudas"}
          />

          <MenuLink
            icono={<GiBackForth size={25} />}
            ruta={"/caja/devoluciones"}
            texto={"Devoluciones"}
          />

          <MenuOptions
            icon={<CiCircleMore size={25} />}
            name={"Extra"}
            arrOptions={[
              <MenuLink
                key={"ingreso"}
                icono={<GiPayMoney size={25} />}
                ruta={"/caja/registrar-ingreso"}
                texto={"Ingreso"}
              />,
              <MenuLink
                key={"retiro"}
                icono={<GiReceiveMoney size={25} />}
                ruta={"/caja/registrar-retiro"}
                texto={"Retiro"}
              />,
            ]}
          />

          <MenuOptions
            icon={<TiPrinter size={25} />}
            name={"Imprimir"}
            arrOptions={[
              <MenuLink
                key={"factura contado"}
                icono={<MdLocalPrintshop size={25} />}
                ruta={"/caja/reimprimir-factura-contado"}
                texto={"Factura contado"}
              />,
              <MenuLink
                key={"factura credito"}
                icono={<MdLocalPrintshop size={25} />}
                ruta={"/caja/reimprimir-factura-credito"}
                texto={"Factura credito"}
              />,
            ]}
          />

          <MenuLink
            icono={<IoCreate size={25} />}
            ruta={"/caja/facturar-venta"}
            texto={"Generar factura"}
          />

          <BtnCierreCaja />
        </nav>
      </div>
    </header>
  );
};
