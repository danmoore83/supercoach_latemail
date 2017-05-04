import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    ScrollView,
    ListView,
    TouchableHighlight,
    Navigator,
    NavigatorIOS
} from 'react-native';

import RefreshableList from '../../components/refreshableList.js';

import LateMailItem from './lateMailItem.js';

function _renderRow(data) {
    //return <Text style={{ color: 'purple' }}>{rowData}</Text>;
    const navigator = this.props.navigator;
    const nextRoute = {
      component: LateMailItem,
      title: data.matchcode,
      passProps: { data }
    };

    const onPress = () => {
        console.log(this, this.props);
        //navigator.push({id: 'foo', data: rowData});
        navigator.push(nextRoute)
    };

    return (
        <TouchableHighlight
            onPress={onPress}>
            <View>
                <Text>{data.title}</Text>
                <Text>{data.matchdate}</Text>
            </View>
        </TouchableHighlight>
    );
}

class LateMailList extends RefreshableList {

    constructor () {
        super();
        this.state = this.state || {
            refreshing: true
        };
        //this.state.dataSource = this.props.dataSource;
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state.dataSource = ds.cloneWithRows([]);
        this.fetchData();
    }

    _renderRow(rowData) {
        return _renderRow.bind(this)(rowData);
    }

    fetchData() {
        return fetch('https://api.myjson.com/bins/pjsop')
            // .then((response) => console.log(response))
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson)
                this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseJson) });
            })
            .catch((error) => console.error(error) );
    }
}


class LateMail extends Component {
    /*
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigator: PropTypes.object.isRequired,
    };
*/
    render () {
        // console.log('this.props.navigator', this.props.navigator)

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        console.log('LateMail props', this.props)

        return (
            <View>
                <RefreshableList
                    style={{ backgroundColor: 'green', height: '40%' }}
                    // dataSource={ ds.cloneWithRows(['lorem', 'ipsum', 'dolor', 'sit', 'amet']) }
                    dataUrl={'https://api.myjson.com/bins/pjsop'}
                    renderRow={_renderRow.bind(this)}
                    navigator={this.props.navigator}
                    refreshControl = {{
                        refreshControlTintColor:'blue',
                        refreshControlTitle: 'Updating coach failures',
                        refreshControlTitleColor: '#ff00ff'
                    }}
                    >
                </RefreshableList>
                <LateMailList
                    style={{ backgroundColor: 'lightblue', height: '40%' }}
                    // dataSource= {ds.cloneWithRows([ 'foo', 'bar', 'buzz' ]) }
                    renderRow={_renderRow.bind(this)}
                    navigator={this.props.navigator}
                    refreshControl = {{
                        refreshControlTintColor:'yellow',
                        refreshControlTitle: 'Updating coach nightmares',
                        refreshControlTitleColor: '#ddd'
                    }}
                />

            </View>
        )
    }
}

class LateMailNavigator extends Component {

    render () {

        return (
            <NavigatorIOS
                // style={styles.container}
                initialRoute={{
                    title: 'Late Mail',
                    component: LateMail,
                    passProps: { myProp: 'foo' }
                }}
                style={{flex: 1}}
                />
        );
    }
}

AppRegistry.registerComponent(
  'LateMailNavigator',
  () => LateMailNavigator);

export default LateMailNavigator;
