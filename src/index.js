import React from 'react';
import ReactDOM from 'react-dom';
import { BrouserRouter as Router, Route } from 'react-router-dom';
import { Register, Login, App } from './containers/index';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));
 
const title = 'Scrapbook';
 
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
      </div>
    </Router>
  </Provider>
  , 
  document.getElementById('root')
);

module.hot.accept();
