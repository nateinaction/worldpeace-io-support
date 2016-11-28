import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Auth from '../components/Auth';

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Auth} />
  </Router>
);

export default routes;