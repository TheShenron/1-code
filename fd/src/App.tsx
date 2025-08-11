import { Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { filterRoutesByRole } from '@/app/router/filterRoutesByRole';
import { routesConfig as postRoute } from './app/router/postRoutesConfig';
import { routesConfig as preRoute } from '@/app/router/preRoutesConfig'
import { renderRoutes } from './app/router/renderRoutes';
import { Role } from './app/types/roles';
import AppInitializer from './app/providers/AppInitializer';

const App = () => {
    const isLogined = useSelector((state: RootState) => state.login?.isLogined)
    const userDetails = useSelector((state: RootState) => state.login?.userDetails)

    if (!isLogined) {
        const allowedRoutes = filterRoutesByRole(preRoute, Role.GUEST);
        return (
            <Routes>
                {renderRoutes(allowedRoutes)}
            </Routes>
        );

    }

    if (isLogined && userDetails?.user.role) {
        const allowedRoutes = filterRoutesByRole(postRoute, userDetails?.user.role);

        return (
            <Routes>
                {renderRoutes(allowedRoutes)}
            </Routes>
        );
    }

    return <AppInitializer />


};

export default App;
