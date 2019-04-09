import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RF from "react-native-responsive-fontsize"

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.list({ title: "Hisse ve Endeksler", selectedCriteria: "all" })}>
                    <Text style={styles.buttonText}>Hisse ve Endeksler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.list({ title: "IMKB Yükselenler", selectedCriteria: "increased" })}>
                    <Text style={styles.buttonText}>IMKB Yükselenler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.list({ title: "IMKB Düşenler", selectedCriteria: "decreased" })}>
                    <Text style={styles.buttonText}>IMKB Düşenler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.list({ title: "IMKB-30", selectedCriteria: "imkb30" })}>
                    <Text style={styles.buttonText}>IMKB Hacme Göre - 30</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.list({ title: "IMKB-50", selectedCriteria: "imkb50" })}>
                    <Text style={styles.buttonText}>IMKB Hacme Göre - 50</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => Actions.list({ title: "IMKB-100", selectedCriteria: "imkb100" })}>
                    <Text style={styles.buttonText}>IMKB Hacme Göre - 100</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        //padding: 20,
        justifyContent: 'center',
        borderColor: '#000',
        width: '80%',
        height: (Dimensions.get('window').height) / 12,
        margin: (Dimensions.get('window').height) / 48,
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
