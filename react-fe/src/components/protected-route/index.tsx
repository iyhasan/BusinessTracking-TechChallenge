import { Navigate, Outlet } from 'react-router-dom';

interface PropType {
    component: React.FC;
}

const ProtectedRoute = () => {
    // const { isAuthenticated } = useAppSelector(state => state.auth);
    const auth = false;

    // if (isAuthenticated) return <Component />;
    return auth ? <Outlet /> : <Navigate to='/login' />;
};


export default ProtectedRoute;