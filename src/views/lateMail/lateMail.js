import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    ScrollView,
    ListView,
    TouchableHighlight,
    Navigator
} from 'react-native';

import RefreshableList from '../../components/refreshableList.js';

import LateMailItem from './lateMailItem.js';

function _renderRow(rowData) {
    //return <Text style={{ color: 'purple' }}>{rowData}</Text>;
    const navigator = this.props.navigator;

    const onPress = () => {
        console.log(this, this.props);
        navigator.push({id: 'foo', data: rowData});
    };

    return (
        <TouchableHighlight
            onPress={onPress}>
            <View>
                <Text>{rowData.title}</Text>
                <Text>{rowData.matchdate}</Text>
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

    render () {
        console.log('this.props.navigator', this.props.navigator)

        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        console.log('LateMail props', this.props)

        return (
            <View>
                <Text style={{ fontSize:30, marginTop: 30, textAlign: 'center', backgroundColor: 'transparent', color:'#ccc' }}>Late Mail</Text>
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

                    // renderRow={(rowData) => <Text>{rowData}</Text>}
                />

            </View>
        )
    }
}

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
        <Text>Prev</Text>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
        <Text>Right</Text>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
        <Text>Title</Text>
    );
  },

};

class LateMailNavigator extends Component {

    renderScene (route, nav) {
        console.log(route, nav)

        const routes = {
            'latemail': <LateMail navigator={nav} />,
            'foo': <LateMailItem data={route.data} />
        };

        return routes[route.id];
    }

    render () {

        return (
            <Navigator
                // style={styles.container}
                initialRoute={{ id: 'latemail' }}
                renderScene={this.renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        routeMapper={NavigationBarRouteMapper}
                    />
                }
                />
        );
    }
}

AppRegistry.registerComponent(
  'LateMailNavigator',
  () => LateMailNavigator);

export default LateMailNavigator;
