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
  const getFoodList = async () => {
    try {
      const stored = await AsyncStorage.getItem("foodlist");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  };

  // Lưu danh sách món ăn vào AsyncStorage
  const saveFoodList = async (list) => {
    await AsyncStorage.setItem("foodlist", JSON.stringify(list));
  };

  // Thêm món ăn
  const addFood = async (food) => {
    const list = await getFoodList();
    const newList = [...list, food];
    await saveFoodList(newList);
  };

  // Xóa món ăn theo id
  const removeFood = async (id) => {
    const list = await getFoodList();
    const newList = list.filter((item) => item.id !== id);
    await saveFoodList(newList);
  };

  // Xóa toàn bộ món ăn
  const clearFood = async () => {
    await AsyncStorage.removeItem("foodlist");
  };

  return (
    <FoodContext.Provider
      value={{
        getFoodList,
        saveFoodList,
        addFood,
        removeFood,
        clearFood,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};