import React from 'react';
import { View, FlatList, ActivityIndicator, Alert, Text } from 'react-native';
import TableRow from '../components/TableRow';
import TableHeader from '../components/TableHeader';
import { SearchBar, Icon } from 'react-native-elements';
import Model from '../Model';

export default class ListScreen extends React.Component {

    constructor(props) {
        super(props);
        model = new Model();
        this.state = {
            loading: false,
            data: [],
            resultCounter: 0
        }
        this.arrayholder = [];
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            let forexStocksAndIndexesInfo = await model.getForexStocksAndIndexesInfo();
            let stockAndIndex = forexStocksAndIndexesInfo.get("stockAndIndex");
            stockAndIndex = model.getUnique(stockAndIndex, 'Symbol');
            let filteredList = [];
            if (this.props.selectedCriteria == "all") {
                filteredList = stockAndIndex;
            } else if (this.props.selectedCriteria == "increased") {
                filteredList = stockAndIndex.filter(item => {
                    return item.Difference > 0;
                });
            } else if (this.props.selectedCriteria == "decreased") {
                filteredList = stockAndIndex.filter(item => {
                    return item.Difference < 0;
                });
            } else if (this.props.selectedCriteria == "imkb30") {
                let imkb30 = forexStocksAndIndexesInfo.get("imkb30");
                let imkb30Filter = imkb30.map(item => { return item.Symbol });
                filteredList = stockAndIndex.filter(item => imkb30Filter.includes(item.Symbol));
            } else if (this.props.selectedCriteria == "imkb50") {
                let imkb50 = forexStocksAndIndexesInfo.get("imkb50");
                let imkb50Filter = imkb50.map(item => { return item.Symbol });
                filteredList = stockAndIndex.filter(item => imkb50Filter.includes(item.Symbol));
            } else if (this.props.selectedCriteria == "imkb100") {
                let imkb100 = forexStocksAndIndexesInfo.get("imkb100");
                let imkb100Filter = imkb100.map(item => { return item.Symbol });
                filteredList = stockAndIndex.filter(item => imkb100Filter.includes(item.Symbol));
            }

            this.arrayholder = filteredList;
            this.setState({
                data: filteredList,
                resultCounter: filteredList.length,
                loading: false,
            });
        } catch (error) {
            Alert.alert("Bir hata oluştu..");
            console.log(error);
            this.setState({
                loading: false,
            });
        }
    }

    renderSeparator = () => {
        return (<View style={{ height: 3, width: '100%', backgroundColor: '#CED0CE', }} />);
    };

    renderHeader = () => {
        return (
            <View>
                <SearchBar
                    placeholder="Arama..."
                    lightTheme
                    round
                    onChangeText={text => this.makeSearchFilter(text)}
                    autoCorrect={false}
                    value={this.state.value}
                />
                <Text style={{ textAlign: 'center' }}>{this.state.resultCounter} sonuç listelendi...</Text>
                <TableHeader />
            </View>
        );
    };

    makeSearchFilter = text => {
        this.setState({
            value: text,
        });
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.Symbol.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
            resultCounter: newData.length,
        });
        //console.log(this.state.data);
        //this.forceUpdate();

    };

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <TableRow data={item} />
                    )}
                    keyExtractor={item => item.Symbol}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }
}
