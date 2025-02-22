import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Add from "./components/Pages/Add/Add";
import List from "./components/Pages/List/List";
import Orders from "./components/Pages/Orders/Orders";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/list",
          element: <List />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
