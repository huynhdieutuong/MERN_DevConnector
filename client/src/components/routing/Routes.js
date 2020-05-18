import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../dashboard/CreateProfile';
import EditProfile from '../dashboard/EditProfile';
import AddExperience from '../dashboard/AddExperience';
import AddEducation from '../dashboard/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profiles/Profile';
import Posts from '../posts/Posts';
import Post from '../posts/Post';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <PublicRoute exact path='/register' component={Register} />
        <PublicRoute exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profiles/:id' component={Profile} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
