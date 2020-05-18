import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';

// Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import PublicRoute from './components/routing/PublicRoute';
import Routes from './components/routing/Routes';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <PublicRoute exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
