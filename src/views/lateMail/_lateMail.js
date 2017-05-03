import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    ScrollView,
    ListView
} from 'react-native';

import RefreshableList from '../../components/refreshableList.js';

class LateMail extends Component {
    render () {

        return (
            <ScrollView>
                <Text style={{ fontSize:30, marginTop: 30 }}>Foo</Text>
            </ScrollView>
        )
    }
}


AppRegistry.registerComponent(
  'LateMail',
  () => LateMail);

export default LateMail;
