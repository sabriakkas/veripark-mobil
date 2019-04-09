import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import Model from '../Model';
import RF from "react-native-responsive-fontsize";
import LineChart from 'react-native-responsive-linechart';
export default class App extends React.Component {

    constructor(props) {
        super(props);
        model = new Model();
        this.state = {
            loading: false,
            data: [],
            labels: [],
            day: "#341f97",
            week: "#000",
            month: "#000",
        }
    }
    async componentDidMount() {
        this.handleSelection("Day");
    }

    async handleSelection(period) {
        try {
            this.setState({ loading: true });
            let forexStocksAndIndexesInfoDetail = await model.getForexStocksAndIndexesInfoDetail(this.props.data.Symbol, period);
            let data = forexStocksAndIndexesInfoDetail.map(item => { return item.Price });
            let labels = forexStocksAndIndexesInfoDetail.map(item => { return String(item.Date).substring(0, 1) });
            this.setState({
                data: data,
                labels: labels,
                loading: false,
            });
            switch (period) {
                case "Day":
                    this.setState({
                        day: "#341f97",
                        week: "#000",
                        month: "#000",
                    });
                    break;
                case "Week":
                    this.setState({
                        day: "#000",
                        week: "#341f97",
                        month: "#000"
                    });
                    break;
                case "Month":
                    this.setState({
                        day: "#000",
                        week: "#000",
                        month: "#341f97",
                    });
                    break;
                default:
                    break;
            }
        } catch (error) {
            Alert.alert("Bir hata oluştu..");
            console.log(error);
            this.setState({
                loading: false,
            });
        }
    }
    dayStyle = function (options) {
        return {
            textAlign: 'center',
            color: this.state.day,
            fontSize: RF(3),
        }
    }
    weekStyle = function (options) {
        return {
            textAlign: 'center',
            color: this.state.week,
            fontSize: RF(3),
        }
    }
    monthStyle = function (options) {
        return {
            textAlign: 'center',
            color: this.state.month,
            fontSize: RF(3),
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.informationContainer}>
                    <View style={styles.informationRow}>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>Sembol</Text>
                        </View>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>{this.props.data.Symbol}</Text>
                        </View>
                    </View>
                    <View style={styles.informationRow}>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>Fiyat</Text>
                        </View>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>{this.props.data.Price}</Text>
                        </View>
                    </View>
                    <View style={styles.informationRow}>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>Değişim %</Text>
                        </View>
                        <View style={styles.informationColumn}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.contentStyle}>{this.props.data.Difference}</Text>
                                {this.props.icon}
                            </View>
                        </View>
                    </View>
                    <View style={styles.informationRow}>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>Günlük Yüksek</Text>
                        </View>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>{this.props.data.DayPeakPrice}</Text>
                        </View>
                    </View>
                    <View style={styles.informationRow}>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>Günlük Düşük</Text>
                        </View>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>{this.props.data.DayLowestPrice}</Text>
                        </View>
                    </View>
                    <View style={styles.informationRow}>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>Son</Text>
                        </View>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>{this.props.data.Total}</Text>
                        </View>
                    </View>
                    <View style={styles.informationRow}>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>Hacim</Text>
                        </View>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>{this.props.data.Volume}</Text>
                        </View>
                    </View>
                    <View style={styles.informationRow}>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>Adet</Text>
                        </View>
                        <View style={styles.informationColumn}>
                            <Text style={styles.contentStyle}>?</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#000', flex: 10 }}>
                    <LineChart style={{ flex: 1 }} config={linechartConfig} data={this.state.data} xLabels={this.state.labels} />
                </View>
                <View style={{ flex: 1.5, flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelection("Day")}>
                        <Text style={this.dayStyle()}>GÜN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelection("Week")}>
                        <Text style={this.weekStyle()}>HAFTA</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.handleSelection("Month")}>
                        <Text style={this.monthStyle()}>AY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    informationContainer: {
        flex: 10,
    },
    informationRow: {
        flexDirection: 'row',
        marginLeft: 20,
        flex: 1
    },
    informationColumn: {
        justifyContent: 'center',
        flex: 1,
    },
    contentStyle: {
        fontSize: RF(3),
        textAlign: 'left'
    },
    buttonContainer: {
        margin: 5,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 12,
        flex: 1
    },
    buttonText: {
        textAlign: 'center',
        color: '#000',
        fontSize: RF(3),
    },
});

const linechartConfig = {
    line: {
        visible: true,
        strokeWidth: 3,
        strokeColor: "#341f97"
    },
    area: {
        visible: false,

    },
    yAxis: {
        visible: true,
        labelFormatter: v => String(v).substring(0, 5)
    },
    xAxis: {
        //visible: true,
        //color:'red'
    },
    grid: {
        //stepSize: 10
    },
    insetY: 10,
    insetX: 10,
};