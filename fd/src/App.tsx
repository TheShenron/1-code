import { Routes, Route } from 'react-router-dom';
import { getRoutesForRole } from '@/app/router/getRoutesForRole';
import { RoleBasedRoute } from '@/app/router/RoleBasedRoute';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import AppInitializer from '@/app/providers/AppInitializer';

const App = () => {
    const role = useSelector((state: RootState) => state.core.userDetails?.role)

    if (!role) {
        return <AppInitializer />
    }

    const routes = getRoutesForRole(role);

    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <RoleBasedRoute allowedRoles={route.roles}>
                            <route.component />
                        </RoleBasedRoute>
                    }
                />
            ))}
        </Routes>
    );
};

export default App;
