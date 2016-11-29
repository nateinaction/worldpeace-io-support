import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from '../components/App';
import Users from '../components/Users';

var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
    	<Route path='/users' component={Users} />
    </Route>
  </Router>
);

export default routes;