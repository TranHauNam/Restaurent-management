import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const APILINK = "http://192.168.1.142:5001";
export const AuthContext = createContext(undefined);

export function useAuthContext() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return value;
}

export function AuthContextProvider({children}) {
    const [isLoading, setLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(true);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);



    // useEffect(() => {
    //     if (user) {
    //         setUser(user);
    //         setAuthenticated(true);
    //         console.log("Set User and autheticated", user);
    //     } else {
    //         setUser(null);  
    //         setAuthenticated(false);
    //         console.log("Authenticated false");
    //     }
    // }, [user]);

    const login = async (email) => {
        try {
            const response = await fetch(`${APILINK}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    email: email
                }),
            }); 
    
            const data = await response.json();
    
            if (response.ok && data.message) {
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (e) {
            console.error("Error log in user: ", e);
            return { success: false, message: "System Error, Please try again later" };
        }
    }

    const loginAdmin = async (email, password) => {
        try {
            console.log("Attempting to login admin with:", { email, password });
            console.log("API URL:", `${APILINK}/api/admin/auth/login`);
            
            const response = await fetch(`${APILINK}/api/admin/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ 
                    email: email,
                    password: password
                }),
            }); 

            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);
            
            const data = await response.json();
            console.log("Admin login response:", data);
    
            if (response.ok && data.tokenAdmin) {
                await AsyncStorage.setItem('adminToken', data.tokenAdmin);
                setUser(data);
                setAuthenticated(true);
                setIsAdmin(true);
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message || "Đăng nhập thất bại" };
            }
        } catch (e) {
            console.error("Error logging in admin:", e);
            return { 
                success: false, 
                message: "Không thể kết nối đến server. Vui lòng kiểm tra:\n1. Server backend đã được khởi động\n2. IP address chính xác\n3. Port 5001 đã được mở" 
            };
        }
    }

    const logout = async () => {
        setAuthenticated(false);
        setUser(null);
        setIsAdmin(false);
    }

    const register = async (fullName, email) => {
        try {
            const response = await fetch(`${APILINK}/api/auth/register-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    fullName: fullName,
                    email: email
                }),
            }); 
    
            const data = await response.json();
    
            if (response.ok && data.message) {
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (e) {
            console.error("Error registering user: ", e);
            return { success: false, message: "System Error, Please try again later" };
        }
    }

    const verifyOTP = async (otp) => {
        try {
            const response = await fetch(`${APILINK}/api/auth/verify-otp`, {    
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    otp: otp
                }),
            }); 
    
            const data = await response.json();
    
            if (response.ok && data.user && data.token) {
                setUser(data.user);
                setAuthenticated(true);
                console.log("Verigy successful:", data.user);
                return { success: true, message: "Login successful" };
            } else {
                return { success: false, message: data.message || "OTP Check failed" };
            }
        } catch (e) {
            console.error("Error checking OTP: ", e);
            return { success: false, message: "System Error, Please try again later" };
        }
    }

    return (
        <AuthContext.Provider value={{
            isLoading,
            setLoading,
            isAuthenticated,
            setAuthenticated,
            login,
            logout,
            register,
            verifyOTP,
            loginAdmin,
            user,
            isAdmin,
        }}>
            {children}
        </AuthContext.Provider>
    );
}