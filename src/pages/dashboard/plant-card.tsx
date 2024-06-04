import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { DeepPlant } from "Plants";
import PlantModel from "../plants/plant-model";
import { useTraderStore } from "../../store/traders/traders";
import { Link } from "react-router-dom";

interface PlantCardProps {
  plant: DeepPlant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }: PlantCardProps) => {
  const { traders } = useTraderStore();

  const trader = plant.fromTrader
    ? traders.find((trader) => trader.id === plant.fromTrader)?.name
    : "None";

  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <Link to={`/plants/${plant.id}`}>
        <CardContent sx={{ padding: "2rem" }}>
          <Typography variant="h5" component="div" color="textPrimary">
            {new PlantModel(plant).getName()}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="textSecondary">
            Trader: {trader}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="textSecondary">
            Location: {plant.location ? plant.location : "None"}
          </Typography>
          <CardActions></CardActions>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PlantCard;
