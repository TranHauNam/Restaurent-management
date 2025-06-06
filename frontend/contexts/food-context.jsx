import React, { createContext, useContext, useState } from "react";

const FoodContext = createContext();

export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within a FoodContextProvider");
  }
  return context;
};

export const FoodContextProvider = ({ children }) => {
  const [foodList, setFoodList] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);

  const addFood = (food) => setFoodList((prev) => [...prev, food]);
  const removeFood = (id) =>
    setFoodList((prev) => prev.filter((item) => item.id !== id));
  const clearFood = () => setFoodList([]);
  

  return (
    <FoodContext.Provider
      value={{
        foodList,
        setFoodList,
        selectedFood,
        setSelectedFood,
        addFood,
        removeFood,
        clearFood,
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};