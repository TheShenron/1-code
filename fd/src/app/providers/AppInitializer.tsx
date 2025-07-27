import { useUserData } from '@/features/core/services/core.api';
import { setUserDetails } from '@/features/core/slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Role } from '../types/roles';

const AppInitializer = () => {
    const { data, isLoading } = useUserData();

    const dispatch = useDispatch()
    useEffect(() => {
        if (!data) return
        dispatch(setUserDetails({
            email: 'gourav@gmail.com',
            id: '12344',
            name: 'gourav',
            role: Role.GUEST,
            subscriptionStatus: false
        }))
    }, [data])

    if (isLoading) return <h1>Loading user role info...</h1>;

    return null
};

export default AppInitializer;
