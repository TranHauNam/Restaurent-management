import React, { createContext, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FoodContext = createContext();

export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within a FoodContextProvider");
  }
  return context;
};

export const FoodContextProvider = ({ children }) => {
  // Lấy danh sách món ăn từ AsyncStorage
  const getContextFoodList = async () => {
    try {
      const stored = await AsyncStorage.getItem("foodlist");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  };

  // Lưu danh sách món ăn vào AsyncStorage
  const saveContextFoodList = async (list) => {
    await AsyncStorage.setItem("foodlist", JSON.stringify(list));
  };

  // Thêm món ăn
  const addContextFood = async (food) => {
    const list = await getContextFoodList();
    const newList = [...list, food];
    await saveContextFoodList(newList);
  };

  // Xóa món ăn theo id
  const removeContextFood = async (id) => {
    const list = await getContextFoodList();
    const newList = list.filter((item) => item.id !== id);
    await saveContextFoodList(newList);
  };

  // Xóa toàn bộ món ăn
  const clearContextFood = async () => {
    await AsyncStorage.removeItem("foodlist");
  };

  return <FoodContext.Provider value={{
    getContextFoodList,
    saveContextFoodList,
    addFood: addContextFood,
    removeFood: removeContextFood,
    clearFood: clearContextFood,
  }}>{children}</FoodContext.Provider>;
};