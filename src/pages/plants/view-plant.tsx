import { IconButton } from "@mui/material";
import { usePlantStore } from "../../store/plants";
import { useTraderStore } from "../../store/traders/traders";
import DeleteIcon from "@mui/icons-material/Delete";
import PlantQRCodePDF from "./plant-qr-code-pdf";
import React from "react";
import PlantModel from "./plant-model";

export interface ViewPlantProps {
  id: string;
}

const ViewPlant: React.FC<ViewPlantProps> = ({ id }) => {
  const plantStore = usePlantStore();
  const plant = plantStore.plants.find((plant) => plant.id === id);

  const { traders } = useTraderStore();
  if (!plant) {
    return <div>Could not find plant. Go back to plants and try again</div>;
  }

  const plantModel = new PlantModel(plant);
  return (
    <div>
      <div>{plantModel.getName()}</div>

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
