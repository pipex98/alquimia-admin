

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export const PrivateRoute = ({ children }) => {

    const admin = useSelector(state => state.auth.currentUser?.isAdmin);

    return admin
        ? children
        : <Navigate to="/login" />
}