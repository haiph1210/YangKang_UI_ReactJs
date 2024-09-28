import React from 'react';
import RootReducer from './RootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const Stores = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default Stores
