console.disableYellowBox = true;
import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import HomeScreen from './screens/HomeScreen';
import SubmenuSelectionScreen from './screens/SubmenuSelectionScreen';
import TestScreen from './screens/ListScreen';
import DetailScreen from './screens/DetailScreen';
import RF from 'react-native-responsive-fontsize';
export default class App extends React.Component {
    render() {
        return (
            <Router titleStyle={{ fontSize: RF(3) }}>
                <Scene key="root">
                    <Scene key="home"
                        component={HomeScreen}
                        hideNavBar
                        initial
                    />
                    <Scene key="submenu"
                        component={SubmenuSelectionScreen}
                        title="IMKB Hisse Senetleri/Endeksler"
                        backTitle=" "
                    />
                    <Scene key="list"
                        component={TestScreen}
                        title="IMKB Hisse Senetleri/Endeksler"
                        backTitle=" "
                    />
                    <Scene key="detail"
                        component={DetailScreen}
                        title="IMKB Hisse Senetleri/Endeksler"
                        backTitle=" "
                    //initial                                                    
                    />
                </Scene>
            </Router>
        );
    }
}