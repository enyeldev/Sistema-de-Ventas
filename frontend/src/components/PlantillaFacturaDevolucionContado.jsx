/* eslint-disable react/prop-types */

import { formatoDinero } from "../helpers/formatoDinero";

import { Document, Page, Text, StyleSheet, View } from "@react-pdf/renderer";
import { Font } from "@react-pdf/renderer";
import Funete_one from "../font/CourierPrime-Bold.ttf";

Font.register({
  family: "FuenteDotOne",
  src: Funete_one,
});
export const PlantillaFacturaDevolucionContado = ({ datos }) => {
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
    },
    nombreNegocio: {
      fontSize: "18px",
      // fontWeight: "800",
      marginBottom: "5px",
      fontFamily: "FuenteDotOne",
    },
    textoComun: {
      fontSize: "11px",
      fontFamily: "FuenteDotOne",
    },
    textoComunCenter: {
      fontSize: "11px",
      textAlign: "center",
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
      width: "60%",
      textAlign: "center",
    },
    headerTotal: {
      width: "40%",
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

  const { codigoFactura, productosDevolucion, datosDevolucion } = datos;

  const { total, fecha } = datosDevolucion;

  console.log(datos);

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
            <Text style={styles.textoComun}>Tipo: Devolucion al contado</Text>
            <Text style={styles.textoComun}>Codigo: {codigoFactura}</Text>
            <Text style={styles.textoComun}>Fecha: {fecha}</Text>
          </View>

          {/* <View style={{ marginTop: "15px" }}>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: "#000000",
                borderBottomStyle: "solid",
                marginBottom: "10px",
              }}
            >
              <Text style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}>
                Datos Cliente
              </Text>
            </View>

            <View style={{ gap: "5px" }}>
              <Text style={styles.textoComun}>Cliente: {nombreCleinte}</Text>

              <Text style={styles.textoComun}>
                Telefono Cliente: {telefonoCliente}
              </Text>
            </View>
          </View> */}
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
            {/* <View style={styles.headerCodigo}>
              <Text
                style={{
                  fontSize: "11px",
                  // fontWeight: "800",
                  fontFamily: "FuenteDotOne",
                }}
              >
                Codigo
              </Text>
            </View> */}

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
            {productosDevolucion.map((e) => {
              const {
                codigoProducto,
                nombreProducto,
                cantidad,
                precioCadaUno,
                total,
              } = e;

              return (
                <View style={styles.bodyItem} key={codigoProducto}>
                  {/* <View>
                    <Text
                      style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}
                    >
                      {codigoProducto}
                    </Text>
                  </View> */}

                  <View>
                    <Text
                      style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}
                    >
                      {`${nombreProducto} CANT. ${cantidad} PRECIO: ${formatoDinero(
                        parseFloat(precioCadaUno)
                      )} `}
                    </Text>
                  </View>

                  <View style={{ width: "100%" }}>
                    <Text
                      style={{ fontSize: "11px", fontFamily: "FuenteDotOne" }}
                    >
                      {formatoDinero(parseFloat(total))}
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
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "10px",
          }}
        >
          <View>
            <Text style={styles.textoComun}>Total:</Text>
            <Text style={styles.textoComun}>
              {formatoDinero(parseFloat(total))}
            </Text>
          </View>

          {/* <View>
            <Text style={styles.textoComun}>Cambio:</Text>
            <Text style={styles.textoComun}>
              {formatoDinero(devueltaCliente)}
            </Text>
          </View> */}

          {/* <View>
            <Text style={styles.textoComun}>Pago Cliente:</Text>
            <Text style={styles.textoComun}>{formatoDinero(pagoCliente)}</Text>
          </View> */}
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
