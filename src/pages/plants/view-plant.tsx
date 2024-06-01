import { Button, IconButton } from "@mui/material";
import { usePlantStore } from "../../store/plants";
// import { useTraderStore } from "../../store/traders/traders";
import DeleteIcon from "@mui/icons-material/Delete";
import PlantQRCodePDF from "./plant-qr-code-pdf";
import React, { useState } from "react";
import PlantModel from "./plant-model";
import PlantEditForm from "./edit-plant";

export interface ViewPlantProps {
  id: string;
}

const ViewPlant: React.FC<ViewPlantProps> = ({ id }) => {
  const plantStore = usePlantStore();
  const plant = plantStore.plants.find(
    (plant) => plant.id === id || plant.id.toString() === id.toString()
  );
  const [editFormOpen, setEditFormOpen] = useState(false);
  // const { traders } = useTraderStore();
  if (!plant) {
    return <div>Could not find plant. Go back to plants and try again</div>;
  }

  const plantModel = new PlantModel(plant);
  return editFormOpen ? (
    <PlantEditForm
      name={plant.name}
      id={plant.id}
      fontSize={plant.fontSize}
      closeEdit={() => setEditFormOpen(false)}
    ></PlantEditForm>
  ) : (
    <div>
      <Button variant="outlined" onClick={() => setEditFormOpen(true)}>
        Edit plant
      </Button>
      <div>{plantModel.getName()}</div>
      {/* <span onClick={() => setEditFormOpen(true)}>Edit plant</span> */}

      {/* <p>
        Trader:{" "}
        {plant.from
          ? traders.find((trader) => trader.id === plant.from)?.name
          : "Unknown"}
      </p> */}
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
            void plantStore.remove(plant.id);
          }
        }}
      >
        <DeleteIcon></DeleteIcon>
      </IconButton>
      <PlantQRCodePDF
        plantData={{
          name: plant.name,
          id: plant.id,
          from: plant.from ?? "",
        }}
        fontSize="plant.fontSize"
      ></PlantQRCodePDF>
      {/* <IconButton
  onClick={() => {
    // showQRCode(plant.id, plant.name);
    // setPlantViewing({ id: plant.id, name: plant.name });
  }}
>
  <QrCode2Outlined></QrCode2Outlined>
</IconButton> */}
      {/* <IconButton onClick={downloadQRPDF}>
  <Download></Download>
</IconButton> */}
    </div>
  );
};

export default ViewPlant;
