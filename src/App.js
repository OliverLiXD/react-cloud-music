import React from 'react';
import { Route } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import "./style.scss";
import Home from './application/Home';
import store from "./store"

export default function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className='App'>
          <Route path={"/"} component={Home}></Route>
        </div>
      </HashRouter>
    </Provider>
  )
}