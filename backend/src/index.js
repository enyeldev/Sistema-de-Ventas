import express from "express";
import morgan from "morgan";
import cors from "cors";

import productosRoutes from "./routes/productos.routes.js";
import ventasRoutes from "./routes/ventas.routes.js";
import deduasRoutes from "./routes/deduas.routes.js";
import tiposDeIngresosRoutes from "./routes/tiposIngresos.routes.js";
import ingresosRoutes from "./routes/ingreso.routes.js";
import facturasRoutes from "./routes/facturas.routes.js";
import loginRoutes from "./routes/login.routes.js";
import retirosRoutes from "./routes/retiros.routes.js";
import inicioRoutes from "./routes/inicio.routes.js";

const app = express();

//Variables
const PORT = process.env.PORT || 4000;

const listaUrl = [process.env.URL_FRONTEND];

const corsOptions = {
  origin: function (origin, callback) {
    if (listaUrl.indexOf(origin !== -1)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

//Middleware
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

//Rutas
app.use(productosRoutes);
app.use(ventasRoutes);
app.use(deduasRoutes);
app.use(tiposDeIngresosRoutes);
app.use(ingresosRoutes);
app.use(facturasRoutes);
app.use(loginRoutes);
app.use(retirosRoutes);
app.use(inicioRoutes);

//Lanzar server
app.listen(PORT, () => {
  console.log(`El servidor esta en el puerto ${PORT}`);
});
