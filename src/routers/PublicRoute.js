import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {

    const admin = useSelector(state => state.auth.currentUser?.isAdmin);

    return admin
        ? <Navigate to="/" />
        : children
}