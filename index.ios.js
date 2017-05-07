'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

// Main Navigation of app
// ------------------------------
import MainNavigation from './src/components/tabNavigator';

export default class AwesomeProject extends Component {
    render() {
        return (<MainNavigation />);
    }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
