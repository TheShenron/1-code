import { useUserData } from '@/features/core/services/core.api';
import { setUserDetails } from '@/features/core/slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const AppInitializer = () => {
    const { data, isLoading, error } = useUserData();
    console.log(data)

    const dispatch = useDispatch()
    useEffect(() => {
        if (!data) return
        // dispatch(setUserDetails({

        // }))
    }, [data])

    if (isLoading) return <h1>Loading user role info...</h1>;

    return null
};

export default AppInitializer;
