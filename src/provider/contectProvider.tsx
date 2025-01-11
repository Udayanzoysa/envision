import { createContext, useState, ReactNode } from "react";

// Define types for the context state
interface StoreState {
  [key: string]: any; // You can refine this type further if you know the structure
}

// Define types for the context provider props
interface ContextProviderProps {
  children: ReactNode;
}

// Create the StoreContext with proper types
export const StoreContext = createContext<{
  getValue: (path: string) => any;
  setValue: ({ path, data }: { path: string; data: any }) => void;
}>({
  getValue: () => undefined,
  setValue: () => {},
});

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [store, setStore] = useState<StoreState>({});

  const setValue = ({ path, data }: { path: string; data: any }) => {
    setStore((prevStore) => ({ ...prevStore, [path]: data }));
  };

  const getValue = (path: string) => {
    return store[path];
  };

  return <StoreContext.Provider value={{ getValue, setValue }}>{children}</StoreContext.Provider>;
};

export default ContextProvider;
