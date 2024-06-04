import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Paper,
  Link as MuiLink,
  Container,
} from "@mui/material";
import { usePlantStore } from "../../store/plants";
import { useTraderStore } from "../../store/traders/traders";
import PlantQRCodePDF from "./plant-qr-code-pdf";
import ManagePlantForm from "./manage-plant-form";
import { Link } from "react-router-dom";
import PlantModel from "./plant-model";

export interface ViewPlantProps {
  id: string;
}

const ViewPlant: React.FC<ViewPlantProps> = ({ id }) => {
  const plantStore = usePlantStore();
  const plant = plantStore.plants.find(
    (plant) => plant.id === id || plant.id.toString() === id.toString()
  );
  const [editFormOpen, setEditFormOpen] = useState(false);
  const { traders } = useTraderStore();

  if (!plant) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">
          Could not find plant. Go back to plants and try again
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/plants"
          sx={{ mt: 2 }}
        >
          Go to Plants
        </Button>
      </Box>
    );
  }

  const plantModel = new PlantModel(plant);

  return editFormOpen ? (
    <ManagePlantForm
      plantArgs={plant}
      manageType="edit"
      closeEdit={() => setEditFormOpen(false)}
    />
  ) : (
    <Container>
      <Box textAlign="center" my={4}>
        <Button
          variant="outlined"
          onClick={() => setEditFormOpen(true)}
          sx={{ mb: 2 }}
        >
          Edit Plant
        </Button>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {plantModel.getName()}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="body1" color="textSecondary">
                    Location:
                  </Typography>
                  <Typography variant="body1">
                    {plant.location ? plant.location : "No location set"}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="body1" color="textSecondary">
                    Grown from:
                  </Typography>
                  <Typography variant="body1">
                    {plant.type ? plant.type : "No type set"}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="body1" color="textSecondary">
                    Trader:
                  </Typography>
                  <Typography variant="body1">
                    {plant.fromTrader ? (
                      <MuiLink
                        component={Link}
                        to={`/traders/${plant.fromTrader}`}
                      >
                        {
                          traders.find(
                            (trader) => trader.id === plant.fromTrader
                          )?.name
                        }
                      </MuiLink>
                    ) : (
                      "No trader set"
                    )}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 2 }}>
                  <Typography variant="body1" color="textSecondary">
                    ID:
                  </Typography>
                  <Typography variant="body1">{plant.id}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
                  <PlantQRCodePDF
                    plantData={{
                      name: plant.name,
                      id: plant.id,
                      from: plant.from ?? "",
                    }}
                    fontSize="plant.fontSize"
                  />
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ViewPlant;

// import { Button } from "@mui/material";
// import { usePlantStore } from "../../store/plants";
// import { useTraderStore } from "../../store/traders/traders";
// import PlantQRCodePDF from "./plant-qr-code-pdf";
// import React, { useState } from "react";
// import PlantModel from "./plant-model";
// import { Link } from "react-router-dom";
// import ManagePlantForm from "./manage-plant-form";

// export interface ViewPlantProps {
//   id: string;
// }

// const ViewPlant: React.FC<ViewPlantProps> = ({ id }) => {
//   const plantStore = usePlantStore();
//   const plant = plantStore.plants.find(
//     (plant) => plant.id === id || plant.id.toString() === id.toString()
//   );
//   const [editFormOpen, setEditFormOpen] = useState(false);
//   const { traders } = useTraderStore();
//   if (!plant) {
//     return <div>Could not find plant. Go back to plants and try again</div>;
//   }

//   const plantModel = new PlantModel(plant);
//   return editFormOpen ? (
//     <ManagePlantForm
//       plantArgs={plant}
//       manageType="edit"
//       closeEdit={() => setEditFormOpen(false)}
//     ></ManagePlantForm>
//   ) : (
//     <div>
//       <Button variant="outlined" onClick={() => setEditFormOpen(true)}>
//         Edit plant
//       </Button>
//       <div>{plantModel.getName()}</div>
//       {plant.location ? (
//         <div>Location: {plant.location}</div>
//       ) : (
//         <div>No location set</div>
//       )}

//       {plant.type ? (
//         <div>Grown from: {plant.type}</div>
//       ) : (
//         <div>No type set</div>
//       )}
//       <div></div>
//       {plant.fromTrader ? (
//         <p>
//           <Link to={"/traders/" + plant.fromTrader}>
//             Traded from{" "}
//             {
//               traders.find((trader) => {
//                 return trader.id === plant.fromTrader;
//               })?.name
//             }
//           </Link>
//         </p>
//       ) : (
//         <span>No trader set</span>
//       )}
//       <div>(ID: {plant.id})</div>

//       <PlantQRCodePDF
//         plantData={{
//           name: plant.name,
//           id: plant.id,
//           from: plant.from ?? "",
//         }}
//         fontSize="plant.fontSize"
//       ></PlantQRCodePDF>
//     </div>
//   );
// };

// export default ViewPlant;
