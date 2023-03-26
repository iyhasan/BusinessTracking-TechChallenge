import { Navigate, Outlet } from 'react-router-dom';
import { authStore } from '../../store';

const ProtectedRoute = () => {
    // const { isAuthenticated } = useAppSelector(state => state.auth);
    const auth = authStore((state) => state.isAuthenticated);

    // if (isAuthenticated) return <Component />;
    return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;