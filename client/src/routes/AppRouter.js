import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Homepage from 'components/homepage/Homepage';
import SignUp from 'components/signup/SignUp';
import SignIn from 'components/signin/SignIn';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route exact path="/home" render={() => <Homepage />} />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/signin" render={() => <SignIn />} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
