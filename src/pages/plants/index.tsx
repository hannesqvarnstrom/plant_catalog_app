import { Button } from "@mui/base";
import { usePlantStore } from "../../store/plants";
import { Link } from "react-router-dom";

function Plants() {
  const { plants } = usePlantStore();

  return (
    <div>
      <h2>PLANTS</h2>
      <div></div>
      <Link to={"create"}>
        <Button>Create a new plant</Button>
      </Link>

      {plants.length ? (
        <ul>
          {plants.map((plant, i) => (
            <li key={i}>
              <Link to={plant.id}>{plant.name.sciName}</Link>
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
