import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admin from '../pages/Admin';

import Home from '../pages/Home';
import Signup from '../pages/Signup';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/signup' component={Signup}></Route>
      <Route exact path='/admin' component={Admin}></Route>
    </Switch>
  );
}

export default Main;