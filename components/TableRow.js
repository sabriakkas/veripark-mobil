import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import RF from "react-native-responsive-fontsize"

const parseHour=(hourString)=>{

    return hourString.substring(0,2)+":"+hourString.substring(2,4)+":"+hourString.substring(4,6);
};

const TableRow = (props, indexId) => {

    const isIncreased = props.data.Difference;
    let icon;

    if (isIncreased > 0) {
        icon = <Icon name='arrow-upward' color='#0f0' />;
    } else if (isIncreased < 0) {
        icon = <Icon name='arrow-downward' color='#f00' />;
    } else {
        icon = <Icon name='remove' color='#000' />;
    }

    return (
        <TouchableOpacity onPress={() => Actions.detail({ title: props.data.Symbol + " Detayı",data:props.data,icon:icon })}>
            <View style={styles.containerStyle} >
                <View style={styles.smallColumnStyle}>
                    {icon}
                </View>
                <View style={styles.columnStyle}>
                    <Text style={styles.contentStyle}>{props.data.Symbol}</Text>
                </View>
                <View style={styles.columnStyle}>
                    <Text style={styles.contentStyle}>{props.data.Price}</Text>
                </View>
                <View style={styles.columnStyle}>
                    <Text style={styles.contentStyle}>%{props.data.Difference}</Text>
                </View>
                <View style={styles.bigColumnStyle}>
                    <Text style={styles.contentStyle}>{props.data.Volume}</Text>
                </View>
                <View style={styles.columnStyle}>
                    <Text style={styles.contentStyle}>{props.data.Buying}</Text>
                </View>
                <View style={styles.columnStyle}>
                    <Text style={styles.contentStyle}>{props.data.Selling}</Text>
                </View>
                <View style={styles.columnStyle}>
                    <Text style={styles.contentStyle}>{parseHour(props.data.Hour)}</Text>
                </View>
                <View style={styles.smallColumnStyle}>
                    <Icon name='navigate-next' color='#000' />
                </View>
            </View>
        </TouchableOpacity>
    );
};
const styles = {
    containerStyle: {
        flexDirection: 'row',
        height: 40,
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
        fontSize: RF(1.5),
        textAlign: 'center'
    },
};
export default TableRow;