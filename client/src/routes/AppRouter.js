import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Homepage from 'components/homepage/Homepage';
import SignUp from 'components/signup/SignUp';
import SignIn from 'components/signin/SignIn';
import BookList from 'components/book/BookList';
import NotFound from 'components/notFound/NotFound';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/home" />} />
        <Route exact path="/home" render={() => <Homepage />} />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/signin" render={() => <SignIn />} />
        <PrivateRoute exact path="/booklist" component={BookList} />
        <Route render={() => <NotFound />} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
