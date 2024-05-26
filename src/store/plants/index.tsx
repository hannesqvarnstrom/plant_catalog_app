import { create } from "zustand";
import { getResourceAfterMS, getResourceWithIDAfterMS } from "../helpers";
import { devtools, persist } from "zustand/middleware";
import { DeepPlant, ShallowPlant } from "Plants";

async function addPlantToDatabase(plantArgs: ShallowPlant): Promise<DeepPlant> {
  const plant: ShallowPlant = {
    name: plantArgs.name,
    settings: { fontSize: 15 },
  };
  if (plantArgs.from) plant.from = plantArgs.from;
  if (plantArgs.image) plant.image = plantArgs.image;

  return getResourceWithIDAfterMS(plant);
}

async function updatePlantInDatabase(
  plantArgs: ShallowPlant,
  id: string
): Promise<DeepPlant> {
  return getResourceAfterMS({ ...plantArgs, id });
}

interface PlantsState {
  plants: DeepPlant[];

  add: (args: ShallowPlant) => Promise<void>;
  remove: (id: string) => Promise<boolean>;
  devPurgeAll: () => void;
  update: (args: ShallowPlant, id: string) => Promise<void>;
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
          update: async (args, id) => {
            const resultingPlant = await updatePlantInDatabase(args, id);
            set((state) => {
              const plants = state.plants;
              return {
                plants: [
                  ...plants.filter((plant) => plant.id !== id),
                  resultingPlant,
                ],
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
          devPurgeAll: () => {
            set((state) => ({
              plants: [],
            }));
          },
          plants: [],
        };
      },
      { name: "plantsStore" }
    )
  )
);
