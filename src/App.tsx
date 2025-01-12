import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import RouterConfigs from "./routes/route";
import ContextProvider from "./provider/contectProvider";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

const queryClient = new QueryClient();
ModuleRegistry.registerModules([AllCommunityModule]);

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
