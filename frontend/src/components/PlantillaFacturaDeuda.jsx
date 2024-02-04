/* eslint-disable react/prop-types */

import { formatoDinero } from '../helpers/formatoDinero'

import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer'

export const PlantillaFacturaDeuda = ({ datos }) => {

    const styles = StyleSheet.create({
        header: {
            width: '100%',
            flexDirection: 'column',
            gap: 10
        },
        titulos: {
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center'
        },
        nombreNegocio: {
            fontSize: '18px',
            fontWeight: '800',
            marginBottom: '5px'
        },
        textoComun: {
            fontSize: '14px',
            fontWeight: '800'
        },
        textoComunCenter: {
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: '800'
        },
        codigoYFecha: {
            width: '100%',
            gap: '5px'
        },
        footer: {
            display: 'flex',
            width: '100%',
            height: '50px',
            justifyContent: 'center',
            alignItems: 'center'
        },
        tabla: {
            width: '100%',
            marginTop: '15px'
        },
        tablaHeader: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: '#000000',
            borderBottomStyle: 'solid',
            paddingBottom: '5px'
        },
        headerCodigo: {
            width: '30%',
            textAlign: 'center'
        },
        headerDescripcion: {
            width: '40%',
            textAlign: 'center'

        },
        headerTotal: {
            width: '30%',
            textAlign: 'center'
        },
        tablaBody: {
            width: '100%',
            marginTop: '5px',
            gap: '5px'
        },
        bodyItem: {
            width: '100%',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '3px',
            borderBottomWidth: 1,
            borderBottomColor: '#000000',
            borderBottomStyle: 'solid',
            paddingBottom: '3px'
        }
    })

    const { codigoFacturaDeuda, datosDeuda, productosDeuda, historialPagos } = datos

    const { fecha, fechaUltimoPago, nombreCleinte, telefonoCliente, despachadoPor, montoInicial, montoActual, estado } = datosDeuda


    return (
        <Document>
            <Page size={{ width: 180 }}>
                <View style={styles.header}>
                    <View style={styles.titulos}>
                        <Text
                            style={styles.nombreNegocio}
                        >
                            NOMBRE LOCAL
                        </Text>

                        <Text style={styles.textoComunCenter}>
                            Av. 27 de Febrero, Sto. Dgo. Oeste
                            Frente al Colegio Cristiano Belen
                        </Text>

                        <Text style={styles.textoComunCenter}>
                            Telefono: 809-560-7032
                        </Text>

                        <Text
                            style={{ fontSize: '15px', textAlign: 'center', marginTop: '15px', marginBottom: '15px', fontWeight: '800' }}
                        >
                            FACTURA
                        </Text>
                    </View>

                    <View style={{
                        width: '100%',
                        borderBottomWidth: 1,
                        borderBottomColor: '#000000',
                        borderBottomStyle: 'solid'
                    }}>
                        <Text style={{ fontSize: '14px' }}>Datos Factura</Text>
                    </View>

                    <View style={styles.codigoYFecha}>
                        <Text style={styles.textoComun}>Tipo: Venta a Credito</Text>
                        <Text style={styles.textoComun}>Estado: {estado ? 'Pendinete' : 'Saldado'}</Text>
                        <Text style={styles.textoComun}>Codigo: {codigoFacturaDeuda}</Text>
                        <Text style={styles.textoComun}>Fecha: {fecha}</Text>
                        <Text style={styles.textoComun}>Fecha utlimo pago: {fechaUltimoPago}</Text>
                        <Text style={styles.textoComun}>
                            Despachado Por: {despachadoPor}
                        </Text>
                    </View>

                    <View style={{ marginTop: '15px' }}>

                        <View style={{
                            width: '100%',
                            borderBottomWidth: 1,
                            borderBottomColor: '#000000',
                            borderBottomStyle: 'solid',
                            marginBottom: '10px'
                        }}>
                            <Text style={{ fontSize: '14px' }}>Datos Cliente</Text>
                        </View>

                        <View style={{ gap: '5px' }}>
                            <Text style={styles.textoComun}>
                                Nombre: {nombreCleinte}
                            </Text>

                            <Text style={styles.textoComun}>
                                Telefono: {telefonoCliente}
                            </Text>
                        </View>
                    </View>
                </View>


                <View style={{ width: '100%', marginTop: '20px', marginBottom: '5px' }}>
                    <Text style={{ fontSize: '15px', textAlign: 'center', fontWeight: '800' }}>PRODUCTOS</Text>
                </View>

                <View style={styles.tabla}>
                    <View style={styles.tablaHeader}>
                        <View style={styles.headerCodigo}>
                            <Text style={{
                                fontSize: '13px',
                                fontWeight: '800'
                            }}>Codigo</Text>
                        </View>

                        <View style={styles.headerDescripcion}>
                            <Text style={{
                                fontSize: '13px',
                                fontWeight: '800'
                            }}>Descripcion</Text>
                        </View>

                        <View style={styles.headerTotal}>
                            <Text style={{
                                fontSize: '13px',
                                fontWeight: '800'
                            }}>Total</Text>
                        </View>
                    </View>

                    <View style={styles.tablaBody}>
                        {
                            productosDeuda.map(e => {

                                const { codigoProducto, nombreProducto, cantidadProducto, costoProducto, monto } = e

                                return (
                                    <View style={styles.bodyItem} key={codigoProducto}>
                                        <View >
                                            <Text style={{ fontSize: '14px' }}>
                                                {codigoProducto}
                                            </Text>
                                        </View>

                                        <View>
                                            <Text style={{ fontSize: '14px' }}>
                                                {`${nombreProducto} CANT. ${cantidadProducto} PRECIO: ${formatoDinero(parseFloat(costoProducto))}`}
                                            </Text>
                                        </View>

                                        <View style={{ width: '100%', textAlign: 'right' }}>
                                            <Text style={{ fontSize: '14px' }}>
                                                {formatoDinero(parseFloat(monto))}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'column', marginTop: '20px', gap: '4px' }}>
                    <Text style={styles.textoComunCenter}>Historia De Pagos</Text>
                    {historialPagos.length == 0 ? <Text style={styles.textoComunCenter}>No hay pagos realizados</Text> : (
                        historialPagos.map(e => {
                            return (
                                <View key={e.id} style={{ flexDirection: 'row', gap: '2px', flexWrap: 'wrap' }}>
                                    <Text style={{ fontSize: '14px' }}>-</Text>
                                    <Text style={{ fontSize: '14px' }}>Monto de pago: {formatoDinero(e.motoPago)}</Text>
                                    <Text style={{ fontSize: '14px' }}>Fecha: {fecha}</Text>
                                </View>
                            )
                        })
                    )}
                </View>

                <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
                    <View>
                        <Text style={styles.textoComun}>Monto Inicial:</Text>
                        <Text style={styles.textoComun}>{formatoDinero(parseFloat(montoInicial))}</Text>
                    </View>

                    <View>
                        <Text style={styles.textoComun}>Monto Actual:</Text>
                        <Text style={styles.textoComun}>{formatoDinero(parseFloat(montoActual))}</Text>
                    </View>

                </View>

                <Text style={{ fontSize: '13px', textAlign: 'center', marginTop: '20px' }}>
                    Para devoluciones o reclamos debe presentar esta factura
                </Text>

                <Text style={{ fontSize: '13px', textAlign: 'center', marginTop: '5px' }}>
                    Gracias por preferirnos
                </Text>


            </Page>
        </Document >

    )
}
