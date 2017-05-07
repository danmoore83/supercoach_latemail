'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';

// Import Tab Screens
// ---------------------------------------------

import LateMail from '../views/lateMail/lateMail';

// Main Screen Tab Navigation
//----------------------------------------------

const MainScreenNavigator = TabNavigator({
    LateMail: { screen: LateMail }
});

// Register Component and export Module;
//----------------------------------------------

AppRegistry.registerComponent(
    'MainScreenNavigator',
    () => MainScreenNavigator
);

export default MainScreenNavigator;
