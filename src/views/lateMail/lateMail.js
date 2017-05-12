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
import Timeframe from 'react-timeframe';

import RefreshableList from '../../components/refreshableList.js';
import LateMailItem from './lateMailItem.js';


function _renderRow(data) {
    const { navigate } = this.props.navigation;

    const onPress = () => {
        navigate('LateMailItem', data);
    };

    return data.matchcode.match(/BRI\-PEN|SOU\-MAN/) ? (
        <TouchableHighlight
            onPress={onPress}>
            <View style={styles.row}>
                <Text style={[styles.text, styles.heading]}>{data.title}</Text>

                <Timeframe
                    endsAt={data.matchdate}
                    onUpdate={function(time) {
                        this.setState({time: time});
                    }}
                    onRender={function() {
                        const
                            state = (this.state || {}),
                            time = state.time,
                            values = [];

                        if (state.complete) {
                            values.push('Complete');
                        } else if (timer) {
                            if (time.days) values.push(`${time.days} ${time.days === 1 ? 'day' : 'days'}`);
                            if (time.hours) values.push(`${time.hours} ${time.hours === 1 ? 'hour' : 'hours'}`);

                            values.push(`${time.minutes} ${time.minutes === 1 ? 'minute' : 'minutes'}`);
                            values.push(`${time.seconds} ${time.seconds === 1 ? 'second' : 'seconds'}`);
                        }

                        return (
                            <Text style={styles.timer}>{values.join(', ')}</Text>
                        );
                    }}
                    urgent={30000}>
                </Timeframe>
            </View>
        </TouchableHighlight>
    ) : null;
}



class LateMail extends Component {
    static navigationOptions = {
        title: 'Late Mail'
    }

    render () {

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        return (

                <View style={styles.view}>
                    <View style={styles.imageContainer}>
                        <Image
                            // resizeMode={Image.resizeMode.contain}
                            resizeMode={Image.resizeMode.contain}
                            source={require('../../assets/img/IMG_0638.jpg')}
                            style={styles.image} />
                    </View>
                    <RefreshableList
                        style={styles.list}
                        // dataSource={ ds.cloneWithRows(['lorem', 'ipsum', 'dolor', 'sit', 'amet']) }
                        dataUrl={'https://api.myjson.com/bins/hohrl'}
                        renderRow={_renderRow.bind(this)}
                        renderSeparator={(sectionId, rowId) => <View key={rowId}><View style={[styles.separator, styles.separatorTop]} /><View style={[styles.separator, styles.separatorBottom]} /></View>}
                        // navigator={this.props.navigator}
                        refreshControl = {{
                            refreshControlTintColor:'#999',
                            refreshControlTitle: 'Checking for new data',
                            refreshControlTitleColor: '#333'
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
        zIndex:2,
        flex: 1
    },
    row: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    text: {
        // color: '#FFFFFF',
        color: '#000000'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        position:'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    image: {
        flex: 1,
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
        backgroundColor: 'rgba(100,100,100,0.5)',
    },
    separatorBottom: {
        // backgroundColor: '#333',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    timer: {
        fontSize: 11,
        color: 'maroon'
    }
});

AppRegistry.registerComponent(
  'LateMailApp',
  () => LateMailApp);

export default LateMailApp;
