'use strict';

import React, { Component } from 'react';

import {
    Text,
    // StyleSheet,
    ListView,
    RefreshControl
} from 'react-native';

function _loadData() {
    this.setState({ refreshing: true });
    this.fetchData().then(() => {
        this.setState({ refreshing: false });
    });
}

class RefreshableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }

        if (props && props.dataSource) {
            this.state.dataSource = props.dataSource;
        } else {
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.state.dataSource = ds.cloneWithRows([]);
        }

        //if (!props.dataUrl) throw new Error('no dataUrl provided');
        this._onRefresh();
    }

    _onRefresh() {
        // console.log('onRefresh', this)
        return _loadData.bind(this).call();
    }

    _renderRow(rowData) {
        return this.props.renderRow ? this.props.renderRow(rowData) : <Text>{rowData}</Text>;
    }

    fetchData() {
        return fetch(this.props.dataUrl)
            // .then((response) => console.log(response))
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson)
                this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseJson) });
            })
            .catch((error) => console.error(error) );
    }

    render () {
        if (!this.state.dataSource) return false;

        const {
            refreshControlTintColor,
            refreshControlTitle,
            refreshControlTitleColor
        } = this.props.refreshControl || {};

        return (
            <ListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        tintColor={refreshControlTintColor}
                        title={refreshControlTitle}
                        titleColor={refreshControlTitleColor}
                        navigator={this.props.navigator}
                    />
                }
                dataSource={this.state.dataSource}
                renderRow={ this._renderRow.bind(this) }
                style={this.props.style}
            />
        );
    }
}

export default RefreshableList;
