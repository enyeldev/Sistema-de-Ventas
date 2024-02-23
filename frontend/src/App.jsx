import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout } from "./layout/AuthLayout";
import { LoginCajero } from "./pages/LoginCajero";
import { AuthProvaider } from "./context/AuthProvaider";
import { FondoProvaider } from "./context/FondoCajaProvaider";
import { RutaProtegida } from "./layout/RutaProtegida";
import { OpcionesPrincipales } from "./pages/OpcionesPrincipales";
import { Vender } from "./pages/Vender";
import { CobrarDeudas } from "./pages/CobrarDeudas";
import { Comprar } from "./pages/Comprar";
import { Devoluciones } from "./pages/Devoluciones";
import { ReimprimirFacturasCrdito } from "./pages/ReimprimirFacturasCredito";
import { Ingresos } from "./pages/Ingresos";
import { Retiro } from "./pages/Retiro";
import { VenderCredito } from "./pages/VenderCredito";
import { FondoCaja } from "./pages/FondoCaja";
import { FacturarVenta } from "./pages/FacturarVenta";

function App() {
  return (
    <BrowserRouter>
      <AuthProvaider>
        <FondoProvaider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<LoginCajero />} />
            </Route>

            <Route path="/fondo-caja" element={<FondoCaja />} />

            <Route path="/caja" element={<RutaProtegida />}>
              <Route index element={<OpcionesPrincipales />} />
              <Route path="vender" element={<Vender />} />
              <Route path="venderCredito" element={<VenderCredito />} />
              <Route path="comprar" element={<Comprar />} />
              <Route path="cobrar-deudas" element={<CobrarDeudas />} />
              <Route path="devoluciones" element={<Devoluciones />} />
              <Route path="registrar-ingreso" element={<Ingresos />} />
              <Route path="registrar-retiro" element={<Retiro />} />
              <Route path="imprimir-factura" element={<ReimprimirFacturasCrdito />} />
              <Route path="facturar-venta" element={<FacturarVenta />} />
            </Route>
          </Routes>
        </FondoProvaider>
      </AuthProvaider>
    </BrowserRouter>
  );
}

export default App;
