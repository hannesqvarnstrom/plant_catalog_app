import { create } from "zustand";
import { getResourceWithIDAfterMS } from "../helpers";
import { devtools, persist } from "zustand/middleware";
import { DeepPlant, ShallowPlant } from "Plants";

async function addPlantToDatabase(plantArgs: ShallowPlant): Promise<DeepPlant> {
  const plant: ShallowPlant = {
    name: plantArgs.name,
  };
  if (plantArgs.from) plant.from = plantArgs.from;
  if (plantArgs.image) plant.image = plantArgs.image;

  return getResourceWithIDAfterMS(plant);
}

interface PlantsState {
  plants: DeepPlant[];

  add: (args: ShallowPlant) => Promise<void>;
  remove: (id: string) => Promise<boolean>;
}

async function removePlantFromDatabase(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("removing plant with id: " + id);
      resolve(true);
    }, 1000);
  });
}

export const usePlantStore = create<PlantsState>()(
  devtools(
    persist(
      (set) => {
        return {
          add: async (args) => {
            console.log("args:", args);
            const resultingPlant = await addPlantToDatabase(args);
            set((state) => {
              return {
                plants: [...state.plants, resultingPlant],
              };
            });
          },
          remove: async (id: string) => {
            const result = await removePlantFromDatabase(id);
            console.log(result);
            set((state) => {
              return {
                plants: state.plants.filter((plant) => plant.id !== id),
              };
            });

            return true;
          },
          plants: [],
        };
      },
      { name: "plantsStore" }
    )
  )
);
