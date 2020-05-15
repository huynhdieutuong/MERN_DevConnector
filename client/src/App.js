import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

// Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </section>
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
