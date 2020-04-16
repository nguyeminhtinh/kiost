// @flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  component: React.AbstractComponent<{}>,
  isAuthenticated: boolean,
  loginPath?: string,
  path: string
};

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loginPath,
  path,
  ...rest
}: Props) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated || (!isAuthenticated && loginPath === path) ? (
        <Component path={path} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: loginPath
          }}
        />
      )
    }
  />
);

PrivateRoute.defaultProps = {
  loginPath: '/login'
};

export default React.memo<Props>(PrivateRoute);
