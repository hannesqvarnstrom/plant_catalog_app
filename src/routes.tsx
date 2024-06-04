import Plants from "./pages/plants";
import ViewPlant from "./pages/plants/view-plant";
import ManagePlantForm from "./pages/plants/manage-plant-form";
import ErrorPage from "./components/error-page";
import Traders from "./pages/traders";
import TraderCreationForm from "./pages/traders/trader-form";
import Home from "./pages/home";
import Settings from "./pages/settings";
import { RouteObject, useParams } from "react-router-dom";
import Dashboard from "./pages/dashboard";

const PlantIDWrapper: React.FC = () => {
  const { id } = useParams();
  if (!id) {
    console.log({ id });
    return <ErrorPage></ErrorPage>;
  }
  return <ViewPlant id={id} />;
};

export const Routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "plants",
        element: <Plants />,
      },
      {
        path: "plants/create",
        element: <ManagePlantForm manageType="create" />,
      },
      {
        path: "plants/:id",
        element: <PlantIDWrapper />,
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
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
];
