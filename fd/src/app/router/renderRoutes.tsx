import { Route } from 'react-router-dom';
import { JSX } from 'react';

export const renderRoutes = (routes): JSX.Element[] => {
    return routes.map((route) => {
        const Element = route.component;

        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    <Element />
                }
            >
                {route.children && renderRoutes(route.children)}
            </Route>
        );
    });
};
