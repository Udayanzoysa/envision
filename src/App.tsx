import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import RouterConfigs from "./routes/route";
import ContextProvider from "./provider/contectProvider";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

const queryClient = new QueryClient();
ModuleRegistry.registerModules([AllCommunityModule]);

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export const App = () => {
  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RouterConfigs />
        </BrowserRouter>
      </QueryClientProvider>
    </ContextProvider>
  );
};

export default App;
