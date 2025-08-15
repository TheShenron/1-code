import { Route } from 'react-router-dom';
import { JSX } from 'react';
import { RouteConfig } from '../types/roles';

export const renderRoutes = (routes: RouteConfig[]): JSX.Element[] => {
  return routes.map((route) => {

    return (
      <Route
        key={route.path}
        path={route.path}
        element={route.component}
        errorElement={route.errorElement}
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
};
