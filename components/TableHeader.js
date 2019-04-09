import React from 'react';
import { View, Text } from 'react-native';
import RF from "react-native-responsive-fontsize"

const TableHeader = () => {
   
    return (
        <View style={styles.containerStyle} >
            <View style={styles.smallColumnStyle}>
            </View>
            <View style={styles.columnStyle}>
                <Text style={styles.contentStyle}>Sembol</Text>
            </View>
            <View style={styles.columnStyle}>
                <Text style={styles.contentStyle}>Fiyat</Text>
            </View>
            <View style={styles.columnStyle}>
                <Text style={styles.contentStyle}>Fark</Text>
            </View>
            <View style={styles.bigColumnStyle}>
                <Text style={styles.contentStyle}>Hacim</Text>
            </View>
            <View style={styles.columnStyle}>
                <Text style={styles.contentStyle}>Alış</Text>
            </View>
            <View style={styles.columnStyle}>
                <Text style={styles.contentStyle}>Satış</Text>
            </View>
            <View style={styles.columnStyle}>
                <Text style={styles.contentStyle}>Saat</Text>
            </View>
            <View style={styles.smallColumnStyle}>
            </View>
        </View>
    );
};
const styles = {
    containerStyle: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#aaa'
    },
    columnStyle: {
        justifyContent: 'center',
        flex: 1,
    },
    smallColumnStyle: {
        justifyContent: 'center',
        flex: 0.5,
    },
    bigColumnStyle: {
        justifyContent: 'center',
        flex: 1.5,
    },
    contentStyle: {
        fontSize: RF(1.7),
        textAlign: 'center'
    },
};
export default TableHeader;