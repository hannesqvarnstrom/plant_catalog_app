import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/index.tsx";
import ErrorPage from "./components/error-page.tsx";
import Plants from "./pages/plants/index.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "plants/",
        element: <Plants />,
        
          
      },
      {
        path: "plants/:plantId",
        element: (
          <div>
            <h1>Unimplemented plants module</h1>
          </div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>,
);
