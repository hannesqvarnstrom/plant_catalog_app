/* eslint-disable react/display-name */
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import PlantModel from "./plant-model";
import { PlantQRCodeProps } from "../page-prop-types";
// import { QRPDFSettings } from "./plant-qr-code-pdf";

const PlantQRCode = React.forwardRef(
  ({ plantData, fontSize /*, pdfSettings*/ }: PlantQRCodeProps, ref) => {
    const { id, name } = plantData;
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL as string;
    const plantURL = `${frontendUrl}/plants/${id}`;
    const plant = new PlantModel({ id, name, fontSize });
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
          fontSize: fontSize,
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
