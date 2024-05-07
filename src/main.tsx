import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/index.tsx";
import ErrorPage from "./components/error-page.tsx";
import Plants from "./pages/plants/index.tsx";
import PlantCreationForm from "./pages/plants/plant-form.tsx";
import Traders from "./pages/traders/index.tsx";
import TraderCreationForm from "./pages/traders/trader-form.tsx";

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
        path: "plants/create",
        element: <PlantCreationForm />,
      },
      {
        path: "plants/:plantId",
        element: (
          <div>
            <h1>Unimplemented plants module</h1>
          </div>
        ),
      },
      {
        path: "traders",
        element: <Traders />,
      },
      {
        path: "traders/create",
        element: <TraderCreationForm />,
      },
      {
        path: "traders/:id",
        element: (
          <div>
            <h1>Unimplemented specific trader route</h1>
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
  </React.StrictMode>
);
