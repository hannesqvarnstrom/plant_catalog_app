
import { DeepPlant, ShallowPlant } from "Plants";
import React from "react";


export interface CreatePlantInputGroupProps {
    checked?: boolean;
    switchChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    switchName: string;
    textFieldLabel: string;
    textFieldName: string;
    textFieldChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    initialValue?: string;
}

export interface NavbarProps {
    authenticated: boolean;
}

export interface PlantEditProps {
    manageType: "create" | "edit";
    plantArgs?: ShallowPlant | DeepPlant;
    closeEdit?: () => void;
}

export interface PlantQRCodeProps {
    plantData: { id: string; name: ShallowPlant["name"]; from: string };
    fontSize: string;
    // pdfSettings: QRPDFSettings;
}