import React, { Component } from 'react';
import { View, Text,  } from 'react-native';
import Splash from './routes/splash';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import reducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(persistedReducer);
const persistor = persistStore(store)

// Helper function for delaying splash
let delay = (time) => new Promise(resolve => setTimeout(() => resolve(), time));

class Startup extends Component {
  state = {
    loaded: false,
  };

  async componentDidMount() {     
    await Promise.all([
      delay(2000), // show splash in minimum 2000ms
    ])

    this.setState({ loaded: true });
  }

  render() {
    const { loaded } = this.state;

    return (
     loaded ? 
      <Provider store={store}>
        <PersistGate loading={<Splash/>} persistor={persistor}>
          {this.props.children}
        </PersistGate >
      </Provider>
      : 
      <Splash/>
    );
  }
}

export default Startup;
