'use strict';

import React, { Component } from 'react';

import {
    AppRegistry,
    View,
    Text,
    StyleSheet
} from 'react-native';

class LateMailItem extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.matchcode.replace('-', ' vs ')}`,
    });

    render() {
        const { params } = this.props.navigation.state;

        console.log(params)

        return (
            <View style={styles.view}>
                <Text style={styles.title}>{params.title}</Text>
                <Text style={styles.matchdate}>{params.matchdate}</Text>
                <Text style={styles.teamname}>{params.home.name}</Text>
                <Text style={styles.comments}>{params.home.comments}</Text>
                <Text style={styles.teamname}>{params.away.name}</Text>
                <Text style={styles.comments}>{params.away.comments}</Text>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    view: {
        padding: 20
    },
    title: {
        fontSize: 20
    },
    matchdate: {
        fontSize: 10
    }
});

export default LateMailItem;
