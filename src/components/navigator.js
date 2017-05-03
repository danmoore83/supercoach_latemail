'use strict';

import React, { Component } from 'react';
import {
    // AppRegistry,
    StyleSheet,
    Navigator,

} from 'react-native'

const styles = StyleSheet.create({
    container: ''
});

class Navigator extends Component {

    render() {

        return (
            <Navigator
                style={styles.container}
                initialRoute={{ id: 'latemail' }}
                renderScene={this.navigatorRenderScene}
                />
        );
    }
}

export default Navigator;
