import { Button } from "@mui/base";
import { usePlantStore } from "../../store/plants";
import { Link } from "react-router-dom";
import PlantModel from "./plant-model";

function Plants() {
  const { plants, devPurgeAll } = usePlantStore();
  return (
    <div>
      <h2>PLANTS</h2>
      <div></div>
      <Link to={"create"}>
        <Button>Create a new plant</Button>
      </Link>
      <Button onClick={() => devPurgeAll()}>
        {" "}
        (DEV) Delete all plants from state
      </Button>
      {plants.length ? (
        <ul>
          {plants.map((plant, i) => (
            <li key={i}>
              <Link to={plant.id}>{new PlantModel(plant).getName()}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No plants right now</p>
      )}
    </div>
  );
}

export default Plants;
