import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext<any>(null);

type AuthProviderProps = {
    children: string | JSX.Element | JSX.Element[],
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useLocalStorage("user", "");
    const navigate = useNavigate();

    const login = async (username: string, pwd: string): Promise<String> => {
        const response = await fetch("http://localhost:8080/server/servlet/?op=login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: pwd,
            })
        });
        const data = await response.json();
        if (data.status === "ok") {
            setUser(username)
            navigate("/home");
        } else {
            return Promise.resolve(data.message);
        }
        return Promise.resolve("ok");
    };

    const register = async (username: string, pwd: string): Promise<String> => {
        const response = await fetch("http://localhost:8080/server/servlet/?op=register", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: pwd,
            })
        });
        const data = await response.json();
        if (data.status === "ok") {
            setUser(username);
            navigate("/home");
        } else {
            return Promise.resolve(data.message);
        }
        return Promise.resolve("ok");
    };

    const logout = () => {
        setUser("");
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            user,
            login,
            register,
            logout,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};