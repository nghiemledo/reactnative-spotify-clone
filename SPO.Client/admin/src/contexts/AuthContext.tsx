/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import axiosClient from "@/configs/api.config";
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
    loginError: string | null;
    registerError: string | null;
    user: { email: string; roles: string[] } | null;
    login: (data: { email: string; password: string }) => Promise<boolean>;
    logout: () => void;
    onRegister: (data: { email: string; password: string }) => Promise<void>;
    isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ email: string; roles: string[] } | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [registerError, setRegisterError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser && !isAuthenticated) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (data: { email: string; password: string }) => {
        try {
            const response = await axiosClient.post('/user/login', {
                email: data.email,
                password: data.password
            });
            if (response.status === 200 && response.data.status) {
                const { token, refreshToken, user, role } = response.data;
                if (role === 'User') {
                    setLoginError("You do not have permission to access this page");
                    return false;
                }
                if (!['Admin', 'SysAdmin'].includes(role)) {
                    setLoginError("Invalid access");
                    return false;
                }
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("role", role);
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
                setIsAuthenticated(true);
                navigate('/');
                return true;
            } else {
                setLoginError("Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu");
                return false;
            }
        } catch (error: any) {
            setLoginError(error?.response?.data?.message || "Lỗi server. Vui lòng thử lại sau");
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setUser(null);
        setIsAuthenticated(false);
    };

    const onRegister = async (data: { email: string; password: string }) => {
        try {
            await axiosClient.post("/user/register", {
                email: data.email,
                password: data.password
            });
            navigate('/login');
        } catch (err: any) {
            setRegisterError(err?.data?.message || "Internal server error. Please try again later")
        }
    };

    return (
        <AuthContext.Provider value={{ loginError, registerError, user, login, logout, onRegister, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};