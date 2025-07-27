import { Navigate } from 'react-router-dom';
import { JSX } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const RoleBasedRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) => {
    const role = useSelector((state: RootState) => state.core.userDetails?.role)

    if (!role || !allowedRoles.includes(role)) {
        console.log("Role is Missing from RoleBasedRoute.jsx")
        return <Navigate to="/login" replace />;
    }

    return children;
};
