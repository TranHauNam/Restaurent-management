import { createContext, useContext } from "react";
import { AuthContext } from "./auth-context";
import { FoodContext } from "./food-context";

// Tạo một object chứa các service context
export const serviceContainer = {
    authContext: new AuthContext(),
    foodContext: new FoodContext(),
};

// Tạo context cho các service
export const ServiceContext = createContext(undefined);

// Custom hook để sử dụng các service
export function useServices() {
    const ctx = useContext(ServiceContext);
    if (!ctx) throw new Error("ServiceContext not found");
    return ctx;
}