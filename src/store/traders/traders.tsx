import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DeepTrader, TraderCreationArgs } from "TraderTypes";
import httpAgent from "../../http";

async function removeTraderFromDatabase(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("removing trader with id: " + id);
      resolve(true);
    }, 1000);
  });
}

async function createTrader(createTraderArgs: {
  name: string;
  location?: string;
}): Promise<DeepTrader> {
  const { data } = await httpAgent.post<DeepTrader>(
    "/traders",
    createTraderArgs
  );

  return data;
}

async function updateTrader(
  id: string,
  updateTraderArgs: { name?: string; location?: string }
): Promise<DeepTrader> {
  const { data } = await httpAgent.put<DeepTrader>(
    "/traders/" + id,
    updateTraderArgs
  );
  return data;
}
interface PlantTradersState {
  traders: DeepTrader[];
  add: (args: TraderCreationArgs) => Promise<void>;
  remove: (id: string) => Promise<void>;
  update: (
    id: string,
    args: { name?: string; location?: string }
  ) => Promise<void>;
  fetch: () => Promise<void>;
}

export const useTraderStore = create<PlantTradersState>()(
  devtools(
    persist(
      (set) => {
        return {
          traders: [],
          add: async (args) => {
            const resultingTrader = await createTrader(args);
            set((state) => ({ traders: [...state.traders, resultingTrader] }));
          },
          update: async (id, args) => {
            const updatedTrader = await updateTrader(id, args);
            set((state) => ({
              traders: [
                ...state.traders.filter(
                  (trader) => trader.id !== updatedTrader.id
                ),
                updatedTrader,
              ],
            }));
          },
          remove: async (id) => {
            await removeTraderFromDatabase(id);

            set((state) => ({
              traders: state.traders.filter((trader) => trader.id !== id),
            }));
          },
          fetch: async () => {
            const { data } = await httpAgent.get<DeepTrader[]>("/traders");

            set((prevState) => ({ ...prevState, traders: data }));
          },
        };
      },
      { name: "plantTradersStore" }
    )
  )
);
