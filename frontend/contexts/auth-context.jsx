import { 
    createContext, 
    useContext, 
    useEffect, 
    useState 
} from "react";

import { API_URL } from '../services/config';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from "date-fns";

const APILINK = API_URL;
export const AuthContext = createContext(undefined);

export function useAuthContext() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return value;
}

export function AuthContextProvider({children}) {
    const [isLoading, setLoading] = useState(false);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminToken, setAdminToken] = useState(null);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const token = await AsyncStorage.getItem('adminToken');
                if (token) {
                    setAdminToken(token);
                    setIsAdmin(true);
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error('Error loading token:', error);
            } finally {
                setLoading(false);
            }
        };
        loadToken();
    }, []);


    const login = async (email) => {
        try {
            const response = await fetch(`${APILINK}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
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
            
            const data = await response.json();
            console.log("Admin login response:", data);
    
            if (response.ok && data.tokenAdmin) {
                await AsyncStorage.setItem('adminToken', data.tokenAdmin);
                setAdminToken(data.tokenAdmin);
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
        try {
            await AsyncStorage.removeItem('adminToken');
            setAdminToken(null);
            setAuthenticated(false);
            setUser(null);
            setIsAdmin(false);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    const register = async (fullName, email) => {
        try {
            const response = await fetch(`${APILINK}/api/auth/register-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
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
            console.log("Verifying OTP with", { otp});
            console.log("API URL:", `${APILINK}/api/auth/verify-otp`);
            
            const response = await fetch(`${APILINK}/api/auth/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ 
                    otp: otp
                }),
            }); 
            
            const data = await response.json();

            //debug
            console.log("Verify OTP response:", data);
            console.log("response.ok:", response.ok, "data.tokenUser:", data.user.tokenUser);
            //end debug
    
            if (response.ok && data.user.tokenUser) {
                //debug
                console.log("attempting to set userToken in AsyncStorage with:", data.user.tokenUser);
                //end debug
                await AsyncStorage.setItem('userToken', data.user.tokenUser);
                // setAdminToken(data.tokenUser);
                setUserToken(data.user.tokenUser);
                setUser(data.user);
                setAuthenticated(true);
                console.log("Verify successful:", data.user);
                setIsAdmin(false);
                return { success: true, message: "Login successful" };
            } else {
                return { success: false, message: data.message || "OTP Check failed" };
            }
        } catch (e) {
            console.error("Error logging in verifying OTP:", e);
            return { 
                success: false, 
                message: "Không thể kết nối đến server. Vui lòng kiểm tra:\n1. Server backend đã được khởi động\n2. IP address chính xác\n3. Port 5001 đã được mở" 
            };
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
            adminToken,
            userToken,
        }}>
            {children}
        </AuthContext.Provider>
    );
}