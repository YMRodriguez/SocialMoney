
// This file will serve as the bridge between React and Redux.
import { Provider } from 'react-redux';
import GlobalState from './reducers';
import { createStore } from 'redux';

import React from 'react';
import App from '../components/App';

export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            things: [] // posts from people the user is following
        };
        this.store = this.configureStore();
    }
    render() {
        return (
            <Provider store={this.store}>
                <div style={{ height: '100%' }}>
                    <App/>
                </div>
            </Provider>
        );
    }
    // May be convention but its unnecessary
    configureStore() {
        return createStore(GlobalState, this.initialState);
    }
}