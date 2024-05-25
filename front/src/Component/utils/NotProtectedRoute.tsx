import { Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

type ProtectedRouteProps = {
    children: any,
}

export const NotProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/home" />;
    }
    return children;
};