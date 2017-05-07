import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,
    TouchableHighlight,
    Text,
    Image
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import RefreshableList from '../../components/refreshableList.js';

import LateMailItem from './lateMailItem.js';

function _renderRow(data) {
    const { navigate } = this.props.navigation;

    const onPress = () => {
        navigate('LateMailItem', data);
    };

    return (
        <TouchableHighlight
            onPress={onPress}>
            <View style={styles.row}>
                <Text style={[styles.text, styles.heading]}>{data.title}</Text>
                <Text style={styles.text}>{data.matchdate}</Text>
            </View>
        </TouchableHighlight>
    );
}



class LateMail extends Component {
    static navigationOptions = {
        title: 'Late Mail'
    }

    render () {

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        console.log('LateMail props', this.props)

        return (

                <View style={styles.view}>
                    <Image source={require('../../assets/img/field.jpeg')} style={styles.image} />
                    <RefreshableList
                        style={styles.list}
                        // dataSource={ ds.cloneWithRows(['lorem', 'ipsum', 'dolor', 'sit', 'amet']) }
                        dataUrl={'https://api.myjson.com/bins/1egokl'}
                        renderRow={_renderRow.bind(this)}
                        renderSeparator={(sectionId, rowId) => <View key={rowId}><View style={[styles.separator, styles.separatorTop]} /><View style={[styles.separator, styles.separatorBottom]} /></View>}
                        // navigator={this.props.navigator}
                        refreshControl = {{
                            refreshControlTintColor:'blue',
                            refreshControlTitle: 'Updating coach failures',
                            refreshControlTitleColor: '#ff00ff'
                        }}
                        >
                    </RefreshableList>

                </View>
        )
    }
}

const LateMailApp = StackNavigator({
    LateMail: { screen: LateMail },
    LateMailItem: { screen: LateMailItem }
});

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    list: {
        // backgroundColor: 'rgba(0,0,0,0.7)',
        backgroundColor: 'rgba(255, 255, 255,0.8)',
        zIndex:2
    },
    row: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    text: {
        // color: '#FFFFFF',
        color: '#000000'
    },
    image: {
        position:'absolute',
        zIndex:-1
    },
    heading: {
        fontSize: 16
    },
    separator: {
        // flex: 1,
        height: StyleSheet.hairlineWidth,
    },
    separatorTop: {
        // backgroundColor: '#000',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    separatorBottom: {
        // backgroundColor: '#333',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    }
});

AppRegistry.registerComponent(
  'LateMailApp',
  () => LateMailApp);

export default LateMailApp;
