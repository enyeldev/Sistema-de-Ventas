/* eslint-disable react/prop-types */
import { Document, Page, View, Text } from '@react-pdf/renderer'


import Barcode from 'react-jsbarcode';
export const PlantillaCodigoBarra = ({ data }) => {
    return (
        <Document>
            <Page size={{ width: 180 }}>
                <View>
                    <Text>{data}</Text>

                    <Barcode value={data} />
                </View>
            </Page>
        </Document >

    )
}
