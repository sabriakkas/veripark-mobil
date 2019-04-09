import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize"

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} resizeMode="contain" source={require("../assets/veripark-logo-big.png")} />
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.submenu()}>
                        <Text style={styles.buttonText}>IMKB Hisse Senetleri/Endeksler</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        padding: 20,
        borderColor: '#000',
        borderWidth: 4,
        borderRightWidth: 8,
        borderBottomWidth: 6,
        borderRadius: 12,
    },
    buttonText: {
        textAlign: 'center',
        color: '#000',
        fontSize: RF(3),
    },
});
