import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from 'context/userContext';
import { SIGN_OUT } from 'actions/userActions';

export default function SignOut() {
  const [, dispatch] = useContext(UserContext);

  useEffect(() => dispatch({ type: SIGN_OUT }), [dispatch]);

  return <Redirect to="/signin" />;
}
