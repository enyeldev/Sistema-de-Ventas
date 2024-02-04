import { Link } from 'react-router-dom'
import { TiShoppingCart } from "react-icons/ti"
import { CiShoppingTag } from "react-icons/ci";
import { GiPayMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiBackForth } from "react-icons/gi";
import { MdLocalPrintshop } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import {
    Heading,
    Text
} from '@chakra-ui/react'



export const Header = () => {
    return (
        <header className='h-full w-[15%]'>
            <div className="flex flex-col gap-8">
                <div className="w-full border-b border-gray-200 px-2 py-4">
                    <Heading
                        className="text-white"
                        fontSize={'large'}
                    >
                        Sistema de ventas
                    </Heading>
                </div>


                <nav className='flex flex-col gap-2 px-2'>

                    <Link className=' text-white flex gap-3 hover:bg-blue-800 p-2 rounded-md transition-colors duration-150' to='/caja'>
                        <IoHomeOutline
                            size={25}
                            className="group-hover:text-white"
                        />
                        <Text
                            fontSize={'medium'}
                        >
                            Inicio
                        </Text>
                    </Link>

                    <Link className='text-lg text-white flex gap-3 p-2 rounded-md hover:bg-blue-800 transition-colors duration-150' to='/caja/vender'>
                        <TiShoppingCart
                            size={25}
                            className="group-hover:text-white"
                        />
                        <Text
                            fontSize={'medium'}
                        >
                            Vender
                        </Text>

                    </Link>


                    <Link className='text-lg text-white flex gap-3 p-2 rounded-md hover:bg-blue-800 transition-colors duration-150' to='/caja/venderCredito'>
                        <ImCreditCard
                            size={25}
                            className="group-hover:text-white"
                        />
                        <Text
                            fontSize={'medium'}
                        >
                            Vender a Credito
                        </Text>

                    </Link>


                    <Link className='text-lg text-white flex gap-3 p-2 rounded-md hover:bg-blue-800 transition-colors duration-150' to='/caja/comprar'>
                        <CiShoppingTag
                            size={25}
                            className="group-hover:text-white"
                        />
                        <Text
                            fontSize={'medium'}
                        >
                            Comprar
                        </Text>


                    </Link>

                    <Link className='text-lg text-white flex gap-3 p-2 rounded-md hover:bg-blue-800 transition-colors duration-150' to='/caja/cobrar-deudas'>
                        <GiTakeMyMoney
                            size={25}
                        />
                        <Text
                            fontSize={'medium'}
                        >
                            Cobrar Deudas
                        </Text>

                    </Link>

                    <Link className='text-lg text-white flex gap-3 p-2 rounded-md hover:bg-blue-800 transition-colors duration-150' to='/caja/devoluciones'>
                        <GiBackForth
                            size={25}
                        />
                        <Text
                            fontSize={'medium'}
                        >
                            Devoluciones
                        </Text>

                    </Link>
                    <Link className='text-lg text-white flex gap-3 p-2 rounded-md hover:bg-blue-800 transition-colors duration-150' to='/caja/registrar-ingreso'>
                        <GiPayMoney
                            size={25}
                        />
                        <Text
                            fontSize={'medium'}
                        >
                            Ingreso
                        </Text>

                    </Link>
                    <Link className='text-lg text-white flex gap-3 p-2 rounded-md hover:bg-blue-800 transition-colors duration-150' to='/caja/registrar-retiro'>
                        <GiReceiveMoney
                            size={25}
                        />
                        <Text
                            fontSize={'medium'}
                        >
                            Retiro
                        </Text>

                    </Link>
                    <Link className='text-lg text-white flex gap-3 p-2 rounded-md hover:bg-blue-800 transition-colors duration-150' to='/caja/imprimir-factura'>
                        <MdLocalPrintshop
                            size={25}
                        />

                        <Text
                            fontSize={'medium'}
                        >
                            Imprimir Factura
                        </Text>

                    </Link>

                    <Link className='text-lg text-white flex gap-3 p-2 rounded-md hover:bg-blue-800 transition-colors duration-150' to='/caja/facturar-venta'>
                        <MdLocalPrintshop
                            size={25}
                        />

                        <Text
                            fontSize={'medium'}
                        >
                            Facturar Venta
                        </Text>

                    </Link>
                </nav>
            </div>
        </header>

    )
}
