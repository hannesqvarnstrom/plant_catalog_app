import PlantQRCode, { PlantQRCodeProps } from "./plant-qr-code";
import jsPDF, { ImageOptions } from "jspdf";
import html2canvas from "html2canvas";
import React from "react";
import { Box, Button, FormControl, Slider } from "@mui/material";
import { usePlantStore } from "../../store/plants";

// export interface QRPDFSettings {
//   fontSize: string;
//   padding: string;
//   minWidth: string;
//   minHeight: string;
// }

const PlantQRCodePDF = ({ plantData }: PlantQRCodeProps) => {
  const plantsStore = usePlantStore();
  const plant = plantsStore.plants.find((plant) => plant.id === plantData.id);
  console.log("plant:", plant);
  const componentRef = React.useRef(null);
  const [fontSize, setFontSize] = React.useState(
    plant?.settings?.fontSize ?? 15
  );
  // const defaultPDFSettings: QRPDFSettings = {
  //   fontSize: "10px",
  //   padding: "0.5rem",
  //   minWidth: "40mm",
  //   minHeight: "30mm",
  // };

  // const [pdfSettings, setPDFSettings] =
  //   useState<QRPDFSettings>(defaultPDFSettings);

  const handleDownloadPDF = async () => {
    const componentNode = componentRef.current as unknown as HTMLElement;
    if (!componentNode) {
      console.error("Node is not available");
      return;
    }

    try {
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm" });
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      const canvas = await html2canvas(componentNode, { /*height,*/ width });

      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Create a PDF using jsPDF
      const imageOptions: ImageOptions = {
        imageData: dataUrl,
        x: 0,
        y: 0,
        width,
        height,
      };
      pdf.addImage(imageOptions);
      pdf.save("plant_qr_code" + new Date().toISOString() + ".pdf");
    } catch (e) {
      console.error("error trying to download pdf", e);
    }
  };

  return (
    <div>
      <PlantQRCode
        ref={componentRef}
        plantData={plantData}
        fontSize={fontSize}
      ></PlantQRCode>
      <Box sx={{ width: "100%" }}>
        <FormControl>
          <Slider
            marks
            value={fontSize}
            valueLabelDisplay="auto"
            step={1}
            min={10}
            max={30}
            onChange={(event, value) => {
              /**
               * @todo
               * - SAVE this value in state -> backend, so its always the same for the plant
               */
              if (typeof value === "number") setFontSize(value);
            }}
          ></Slider>
          (current fontsize: {fontSize})
        </FormControl>
        <Button
          onClick={() => {
            if (plant !== undefined) {
              const newPlantObject = {
                ...plant,
                settings: { fontSize: fontSize },
              };
              plantsStore
                .update(newPlantObject, plant.id)
                .catch((e) =>
                  console.error("error while updating fontsize", e)
                );
            }
          }}
        >
          Save new fontsize value
        </Button>
      </Box>
      <button
        onClick={() => {
          void handleDownloadPDF();
        }}
      >
        Download PDF
      </button>
    </div>
  );
};

export default PlantQRCodePDF;
