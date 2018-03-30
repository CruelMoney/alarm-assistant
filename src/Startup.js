import React, { Component } from 'react';
import { View, Text,  } from 'react-native';
import Splash from './routes/splash';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import reducer from './reducers'

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

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
        {this.props.children}
      </Provider>
      : 
      <Splash/>
    );
  }
}

export default Startup;
