import React, { createContext, useState, ReactNode } from 'react';
import data from '../assets/json/data.json';

// Define the structure of your restaurant data
interface Restaurant {
  name: string;
  diningType: string;
  cuisine: string;
}

// Enums for dining style and cuisine type
export enum DiningStyle {
  SitDown = 'Sit Down',
  FastFood = 'Fast Food',
  All = 'All',
}

export enum CuisineType {
  Mexican = 'Mexican',
  Italian = 'Italian',
  American = 'American',
  All = 'All',
  Pizza = 'Pizza',
  MiddleEastern = 'Middle Eastern',
}

// Define the shape of your context value
interface FoodContextType {
  restaurant: string;
  pickRestaurant: () => void;
  changeDiningStyle: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  changeCuisineType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filterRestaurants: (diningType: string, cuisine: string) => Restaurant[];
  selectedCuisineType: CuisineType;
  selectedDiningStyle: DiningStyle;
}

// Create the context object
export const FoodContext = createContext<FoodContextType | undefined>(
  undefined
);

// Define props for the provider component
interface FoodContextProviderProps {
  children: ReactNode;
}

export const FoodContextProvider: React.FC<FoodContextProviderProps> = ({
  children,
}) => {
  const restaurants: Restaurant[] = data.restaurants;
  const [restaurant, setRestaurant] = useState<string>('Get Ready To Eat!');
  const [selectedDiningStyle, setSelectedDiningStyle] = useState<DiningStyle>(
    DiningStyle.All
  );
  const [selectedCuisineType, setSelectedCuisineType] = useState<CuisineType>(
    CuisineType.All
  );

  // Function to filter restaurants based on category
  const filterRestaurants = (
    diningType: string,
    cuisine: string
  ): Restaurant[] => {
    if (diningType === DiningStyle.All && cuisine === CuisineType.All) {
      return restaurants;
    } else if (diningType === DiningStyle.All) {
      return restaurants.filter((restaurant) => restaurant.cuisine === cuisine);
    } else if (cuisine === CuisineType.All) {
      return restaurants.filter(
        (restaurant) => restaurant.diningType === diningType
      );
    } else {
      return restaurants.filter(
        (restaurant) =>
          restaurant.diningType === diningType && restaurant.cuisine === cuisine
      );
    }
  };

  // Function to randomly pick a restaurant
  const pickRestaurant = () => {
    const filtered = filterRestaurants(
      selectedDiningStyle,
      selectedCuisineType
    );
    const random = Math.floor(Math.random() * filtered.length);
    setRestaurant(filtered[random]?.name || 'No restaurant found');
  };

  // Function to handle change in dining style category
  const changeDiningStyle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedDiningStyle(e.target.value as DiningStyle);
  };

  const changeCuisineType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedCuisineType(e.target.value as CuisineType);
  };

  // Construct the context value object
  const foodContextValue: FoodContextType = {
    restaurant,
    pickRestaurant,
    changeDiningStyle,
    changeCuisineType,
    filterRestaurants,
    selectedCuisineType,
    selectedDiningStyle,
  };

  // Provide the context value to its children
  return (
    <FoodContext.Provider value={foodContextValue}>
      {children}
    </FoodContext.Provider>
  );
};
