import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { PaletteMode } from "@mui/material";

interface SettingsState {
  paletteMode: PaletteMode;
  toggleColorMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => {
        return {
          paletteMode: "dark",
          toggleColorMode: () => {
            set((prevState) => ({
              ...prevState,
              paletteMode: prevState.paletteMode === "dark" ? "light" : "dark",
            }));
          },
        };
      },
      { name: "settingsStore" }
    )
  )
);
