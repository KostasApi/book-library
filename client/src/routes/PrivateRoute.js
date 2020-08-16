import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from 'context/userContext';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ userInfo }] = useContext(UserContext);

  return (
    <Route
      {...rest}
      component={props =>
        userInfo?.token ? (
          <div>
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/home" />
        )
      }
    />
  );
};

export default PrivateRoute;
