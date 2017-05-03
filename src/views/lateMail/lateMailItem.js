'use strict';

import React, { Component } from 'react';

import {
    AppRegistry,
    View,
    Text,
    StyleSheet
} from 'react-native';

export default class LateMailItem extends Component {
    constructor(props) {
        super(props);
        console.log('LateMailItem props', props);
        this.state = props.data || {};
    }
    render() {
        return (
            <View>
                <Text>{this.state.title}</Text>
                <Text>{this.state.matchdate}</Text>
                <Text>{this.state.home.name}</Text>
                <Text>{this.state.home.comments}</Text>
                <Text>{this.state.away.name}</Text>
                <Text>{this.state.away.comments}</Text>
            </View>

        );
    }
}
