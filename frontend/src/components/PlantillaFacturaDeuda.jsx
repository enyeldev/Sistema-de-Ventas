/* eslint-disable react/prop-types */

import { formatoDinero } from "../helpers/formatoDinero";

import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import Funete_one from "../font/CourierPrime-Bold.ttf";
// import Funete_dos from "../font/DOTMBold.TTF";

Font.register({
  family: "FuenteDotOne",
  src: Funete_one,
});

export const PlantillaFacturaDeuda = ({ datos }) => {
  const styles = StyleSheet.create({
    header: {
      width: "100%",
      flexDirection: "column",
      gap: 10,
    },
    titulos: {
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "FuenteDotOne",
    },
    nombreNegocio: {
      fontSize: "18px",
      // fontWeight: "800",
      marginBottom: "5px",
      fontFamily: "FuenteDotOne",
    },
    textoComun: {
      fontSize: "11px",
      // fontWeight: "800",
      fontFamily: "FuenteDotOne",
    },
    textoComunCenter: {
      fontSize: "11px",
      textAlign: "center",
      // fontWeight: "800",
      fontFamily: "FuenteDotOne",
    },
    codigoYFecha: {
      width: "100%",
      gap: "5px",
    },
    footer: {
      display: "flex",
      width: "100%",
      height: "50px",
      justifyContent: "center",
      alignItems: "center",
    },
    tabla: {
      width: "100%",
      marginTop: "10px",
    },
    tablaHeader: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
      borderBottomStyle: "solid",
      paddingBottom: "5px",
    },
    headerCodigo: {
      width: "30%",
      textAlign: "center",
    },
    headerDescripcion: {
      width: "40%",
      textAlign: "center",
    },
    headerTotal: {
      width: "30%",
      textAlign: "center",
    },
    tablaBody: {
      width: "100%",
      // marginTop: "5px",
      gap: "5px",
    },
    bodyItem: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: "3px",
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
      borderBottomStyle: "solid",
      paddingBottom: "3px",
    },
  });

  const { codigoFacturaDeuda, datosDeuda, productosDeuda, historialPagos } =
    datos;

  const { fecha, fechaUltimoPago, montoInicial, montoActual, estado } =
    datosDeuda;

  return (
    <Document>
      <Page size={{ width: 180 }}>
        <View style={styles.header}>
          <View style={styles.titulos}>
            <Text style={styles.nombreNegocio}>NOMBRE LOCAL</Text>

            <Text style={styles.textoComunCenter}>
              Av. 27 de Febrero, Sto. Dgo. Oeste Frente al Colegio Cristiano
              Belen
            </Text>

            <Text style={styles.textoComunCenter}>Telefono: 809-560-7032</Text>
          </View>

          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: "#000000",
              borderBottomStyle: "solid",
            }}
          >
            <Text style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}>
              Datos Factura
            </Text>
          </View>

          <View style={styles.codigoYFecha}>
            <Text style={styles.textoComun}>Tipo: Venta a Credito</Text>
            <Text style={styles.textoComun}>
              Estado: {estado ? "Pendinete" : "Saldado"}
            </Text>
            <Text style={styles.textoComun}>Codigo: {codigoFacturaDeuda}</Text>
            <Text style={styles.textoComun}>Fecha: {fecha}</Text>
            <Text style={styles.textoComun}>
              Fecha utlimo pago: {fechaUltimoPago}
            </Text>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: "10px" }}>
          <Text
            style={{
              fontSize: "11px",
              textAlign: "center",
              // fontWeight: "800",
              fontFamily: "FuenteDotOne",
            }}
          >
            PRODUCTOS
          </Text>
        </View>

        <View style={styles.tabla}>
          <View style={styles.tablaHeader}>
            <View style={styles.headerCodigo}>
              <Text
                style={{
                  fontSize: "11px",
                  // fontWeight: "800",
                  fontFamily: "FuenteDotOne",
                }}
              >
                Codigo
              </Text>
            </View>

            <View style={styles.headerDescripcion}>
              <Text
                style={{
                  fontSize: "11px",
                  // fontWeight: "800",
                  fontFamily: "FuenteDotOne",
                }}
              >
                Descripcion
              </Text>
            </View>

            <View style={styles.headerTotal}>
              <Text
                style={{
                  fontSize: "11px",
                  // fontWeight: "800",
                  fontFamily: "FuenteDotOne",
                }}
              >
                Total
              </Text>
            </View>
          </View>

          <View style={styles.tablaBody}>
            {productosDeuda.map((e) => {
              const {
                codigoProducto,
                nombreProducto,
                cantidadProducto,
                costoProducto,
                monto,
                descuento,
              } = e;

              return (
                <View style={styles.bodyItem} key={codigoProducto}>
                  <View>
                    <Text
                      style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}
                    >
                      {codigoProducto}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}
                    >
                      {`${nombreProducto} CANT. ${cantidadProducto} PRECIO: ${formatoDinero(
                        parseFloat(costoProducto)
                      )} ${
                        descuento
                          ? `DESCUENTO - ${formatoDinero(
                              parseFloat(descuento)
                            )}`
                          : ""
                      }`}
                    </Text>
                  </View>

                  <View style={{ width: "100%" }}>
                    <Text
                      style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}
                    >
                      {formatoDinero(parseFloat(monto))}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "column",
            marginTop: "10px",
            gap: "4px",
          }}
        >
          <Text style={styles.textoComunCenter}>Historia De Pagos</Text>
          {historialPagos.length == 0 ? (
            <Text style={styles.textoComunCenter}>No hay pagos realizados</Text>
          ) : (
            historialPagos.map((e) => {
              return (
                <View
                  key={e.id}
                  style={{ flexDirection: "row", gap: "2px", flexWrap: "wrap" }}
                >
                  <Text
                    style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}
                  >
                    -
                  </Text>
                  <Text
                    style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}
                  >
                    Monto de pago: {formatoDinero(e.motoPago)}
                  </Text>
                  <Text
                    style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}
                  >
                    Fecha: {fecha}
                  </Text>
                </View>
              );
            })
          )}
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "10px",
          }}
        >
          <View>
            <Text style={styles.textoComun}>Monto Inicial:</Text>
            <Text style={styles.textoComun}>
              {formatoDinero(parseFloat(montoInicial))}
            </Text>
          </View>

          <View>
            <Text style={styles.textoComun}>Monto Actual:</Text>
            <Text style={styles.textoComun}>
              {formatoDinero(parseFloat(montoActual))}
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: "11px",
            textAlign: "center",
            marginTop: "10px",
            fontFamily: "FuenteDotOne",
          }}
        >
          Para devoluciones o reclamos debe presentar esta factura
        </Text>

        <Text
          style={{
            fontSize: "11px",
            textAlign: "center",
            marginTop: "5px",
            fontFamily: "FuenteDotOne",
          }}
        >
          Gracias por preferirnos
        </Text>
      </Page>
    </Document>
  );
};
