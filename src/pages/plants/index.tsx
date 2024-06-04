import { usePlantStore } from "../../store/plants";
import { Link } from "react-router-dom";
import { Container, IconButton, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PlantCard from "../dashboard/plant-card";
import { Add } from "@mui/icons-material";

function Plants() {
  const { plants } = usePlantStore();

  return (
    <Container>
      <Grid2 container columns={12} marginBottom={"1rem"}>
        <Grid2 md={6} sm={6} xs={12} justifyContent={"center"} display={"flex"}>
          <Typography variant="h6" gutterBottom padding={"1rem"}>
            Your plants
          </Typography>
        </Grid2>

        <Grid2 md={6} sm={6} xs={12} justifyContent={"center"} display={"flex"}>
          <Link to={"/plants/create"}>
            <IconButton sx={{ border: "1px solid white", borderRadius: "8px" }}>
              <Add />
              Create
            </IconButton>
          </Link>
        </Grid2>
      </Grid2>
      {plants.length ? (
        <Grid2 container spacing={3}>
          {plants.map((plant, i) => (
            <Grid2 xs={12} sm={6} md={4} key={i}>
              <PlantCard plant={plant} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="body1">No plants available</Typography>
      )}
    </Container>
  );
}

export default Plants;
