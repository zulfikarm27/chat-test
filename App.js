import { NavigationContainer } from '@react-navigation/native'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor, Store } from './src/redux/Store';
import Router from './src/Router/Router'


export class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <PersistGate persistor={Persistor}>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App
