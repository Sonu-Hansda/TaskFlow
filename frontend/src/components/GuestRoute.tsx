import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface GuestOnlyRouteProps {
    children: React.ReactNode;
}

export const GuestOnlyRoute: React.FC<GuestOnlyRouteProps> = ({ children }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};