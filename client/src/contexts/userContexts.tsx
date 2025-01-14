import { createContext, useState, ReactNode, useContext } from "react";

// Define the shape of the context
interface AppContextProps {
  sharedValue: string;
  setSharedValue: (value: string) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextProps>({
  sharedValue: "",
  setSharedValue: () => {},
});

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [sharedValue, setSharedValue] = useState("");

  return (
    <AppContext.Provider value={{ sharedValue, setSharedValue }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);
