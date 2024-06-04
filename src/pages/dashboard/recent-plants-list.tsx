import { Container, Typography } from "@mui/material";
import { DeepPlant } from "Plants";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import PlantCard from "./plant-card";
interface RecentPlantListProps {
  plants: DeepPlant[];
}
const RecentPlantsList: React.FC<RecentPlantListProps> = ({
  plants,
}: RecentPlantListProps) => {
  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Recent Plants
      </Typography>
      {plants.length ? (
        <Grid2 container spacing={3}>
          {plants.map((plant, i) => (
            <Grid2 xs={12} sm={6} md={4} key={i}>
              <PlantCard plant={plant} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        // <List>

        // </List>
        <Typography variant="body1">No plants available</Typography>
      )}
    </Container>
  );
};

export default RecentPlantsList;
