import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import ApolloAppProvider from "./Utils/ApolloProvider";

const App = () => {
  return (
    <ApolloAppProvider>
      <RouterProvider router={router} />
    </ApolloAppProvider>
  );
};

export default App;
