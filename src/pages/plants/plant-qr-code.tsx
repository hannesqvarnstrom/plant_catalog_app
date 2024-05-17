/* eslint-disable react/display-name */
import { ShallowPlant } from "Plants";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import PlantModel from "./plant-model";
// import { QRPDFSettings } from "./plant-qr-code-pdf";

export const FRONTEND_URL = "192.168.0.143:5173";

export interface PlantQRCodeProps {
  plantData: { id: string; name: ShallowPlant["name"]; from: string };
  // pdfSettings: QRPDFSettings;
}

const PlantQRCode = React.forwardRef(
  ({ plantData /*, pdfSettings*/ }: PlantQRCodeProps, ref) => {
    const { id, name } = plantData;
    const plantURL = `${FRONTEND_URL}/plants/${id}`;
    const plant = new PlantModel({ id, name });
    // const maxWidth = window.innerWidth <= 768 ? "default" : "85%";

    return (
      <div
        // @ts-expect-error Ref is defined and should not be throwing any errors.
        ref={ref}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: "0.5rem",
          color: "black",
          fontSize: "14px",
          // minWidth: "35mm",
          // maxWidth,
          // minHeight: "40mm",
          // ...pdfSettings,
          width: "300px",
          height: "200px",
          justifyContent: "space-between",
        }}
      >
        {plant.getName()}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <QRCodeCanvas value={plantURL} size={80}></QRCodeCanvas>
        </div>
      </div>
    );
  }
);

export default PlantQRCode;
