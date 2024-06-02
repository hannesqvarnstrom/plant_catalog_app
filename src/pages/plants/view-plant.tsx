import { Button } from "@mui/material";
import { usePlantStore } from "../../store/plants";
import { useTraderStore } from "../../store/traders/traders";
import PlantQRCodePDF from "./plant-qr-code-pdf";
import React, { useState } from "react";
import PlantModel from "./plant-model";
import { Link } from "react-router-dom";
import ManagePlantForm from "./manage-plant-form";

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
    return <div>Could not find plant. Go back to plants and try again</div>;
  }

  const plantModel = new PlantModel(plant);
  return editFormOpen ? (
    <ManagePlantForm
      plantArgs={plant}
      manageType="edit"
      closeEdit={() => setEditFormOpen(false)}
    ></ManagePlantForm>
  ) : (
    <div>
      <Button variant="outlined" onClick={() => setEditFormOpen(true)}>
        Edit plant
      </Button>
      <div>{plantModel.getName()}</div>
      {plant.location ? (
        <div>Location: {plant.location}</div>
      ) : (
        <div>No location set</div>
      )}

      {plant.type ? (
        <div>Grown from: {plant.type}</div>
      ) : (
        <div>No type set</div>
      )}
      <div></div>
      {plant.fromTrader ? (
        <p>
          <Link to={"/traders/" + plant.fromTrader}>
            Traded from{" "}
            {
              traders.find((trader) => {
                return trader.id === plant.fromTrader;
              })?.name
            }
          </Link>
        </p>
      ) : (
        <span>No trader set</span>
      )}
      <div>(ID: {plant.id})</div>

      <PlantQRCodePDF
        plantData={{
          name: plant.name,
          id: plant.id,
          from: plant.from ?? "",
        }}
        fontSize="plant.fontSize"
      ></PlantQRCodePDF>
    </div>
  );
};

export default ViewPlant;
