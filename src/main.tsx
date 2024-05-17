import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.tsx'
import "./index.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  useParams,
} from "react-router-dom";
import Home from "./pages/home/index.tsx";
import ErrorPage from "./components/error-page.tsx";
import Plants from "./pages/plants/index.tsx";
import PlantCreationForm from "./pages/plants/plant-form.tsx";
import Traders from "./pages/traders/index.tsx";
import TraderCreationForm from "./pages/traders/trader-form.tsx";
import ViewPlant from "./pages/plants/view-plant.tsx";

const MyComponentWrapper: React.FC = () => {
  const { id } = useParams();
  if (!id) {
    console.log({ id });
    return <ErrorPage></ErrorPage>;
  }
  return <ViewPlant id={id}></ViewPlant>;
};

export const Routes: RouteObject[] = [
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
        path: "plants/:id",
        element: <MyComponentWrapper></MyComponentWrapper>,
        // element: <ViewPlant id={plantId} />,
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
];

const router = createBrowserRouter(Routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
