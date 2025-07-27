import { Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import AppInitializer from '@/app/providers/AppInitializer';
import { filterRoutesByRole } from '@/app/router/filterRoutesByRole';
import { routesConfig } from './app/router/routesConfig';
import { renderRoutes } from './app/router/renderRoutes';

const App = () => {
    const role = useSelector((state: RootState) => state.core.userDetails?.role)

    if (!role) {
        return <AppInitializer />
    }

    const allowedRoutes = filterRoutesByRole(routesConfig, role);

    return (
        <Routes>
            {renderRoutes(allowedRoutes)}
        </Routes>
    );
};

export default App;
