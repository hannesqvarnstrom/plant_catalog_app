import { Button } from "@mui/base";
import { usePlantStore } from "../../store/plants";
import { Link } from "react-router-dom";
import { useTraderStore } from "../../store/traders/traders";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Plants() {
  const { plants, remove } = usePlantStore();
  const { traders } = useTraderStore();

  return (
    <div>
      <h2>PLANTS</h2>
      <Link to={"create"}>
        <Button>Create a new plant</Button>
      </Link>
      {plants.length ? (
        <ul>
          {plants.map((plant, i) => (
            <li key={i}>
              <p>{plant.name}</p>
              <p>
                Trader:{" "}
                {plant.from
                  ? traders.find((trader) => trader.id === plant.from)?.name
                  : "Unknown"}
              </p>
              <small>(ID: {plant.id})</small>
              <IconButton
                onClick={() => {
                  const confirmed = confirm(
                    "Are you sure you want to delete this plant?"
                  );

                  /**
                    @note i guess this is how to handle the "Promise-returning function provided to attribute where a void return was expected." error
                     */
                  if (confirmed) {
                    void remove(plant.id);
                  }
                }}
              >
                <DeleteIcon></DeleteIcon>
              </IconButton>
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
