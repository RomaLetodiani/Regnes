import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import ApolloAppProvider from "./Utils/ApolloProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import Loading from "./Pages/Loading/Loading";
const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ApolloAppProvider>
        <ToastContainer />
        <div className="h-screen w-full min-w-[375px]">
          <RouterProvider router={router} />
        </div>
      </ApolloAppProvider>
    </Suspense>
  );
};

export default App;
