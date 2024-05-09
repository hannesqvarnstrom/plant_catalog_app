import PlantQRCode, { PlantQRCodeProps } from "./plant-qr-code";
import jsPDF, { ImageOptions } from "jspdf";
import html2canvas from "html2canvas";
import React from "react";

// export interface QRPDFSettings {
//   fontSize: string;
//   padding: string;
//   minWidth: string;
//   minHeight: string;
// }

const PlantQRCodePDF = ({ plantData }: PlantQRCodeProps) => {
  const componentRef = React.useRef(null);
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

  // const setSettingValue = (name: keyof QRPDFSettings, value: string) => {
  //   let finalValue = "";
  //   switch (name) {
  //     case "fontSize":
  //       finalValue = value + "px";
  //       break;

  //     case "minHeight":
  //     case "minWidth":
  //       finalValue = value + "mm";
  //       break;

  //     case "padding":
  //       finalValue = value + "rem";
  //       break;
  //     default:
  //       console.error("Input name not recognised", name);
  //       return;
  //   }
  //   setPDFSettings({ ...pdfSettings, [name]: finalValue });
  // };

  return (
    <div>
      <PlantQRCode
        ref={componentRef}
        plantData={plantData}
        // pdfSettings={pdfSettings}
      ></PlantQRCode>
      <button
        onClick={() => {
          void handleDownloadPDF();
        }}
      >
        Download PDF
      </button>

      {/* <div>
        <div>
          <label htmlFor="fontsize">Font Size</label>
          <input
            type="text"
            name="fontsize"
            value={pdfSettings.fontSize}
            onChange={(event) =>
              setSettingValue("fontSize", event.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="padding">Padding (in rem)</label>
          <input
            type="text"
            name="padding"
            value={pdfSettings.padding}
          />
          <button onClick={(event) => setSettingValue("padding", event.target.value)}>Save</button>
        </div>
        <div>
          <label htmlFor="minWidth">Min Width (in millimeters) </label>
          <input
            type="text"
            name="minWidth"
            value={pdfSettings.minWidth}
            onChange={(event) =>
              setSettingValue("minWidth", event.target.value)
            }
          />
        </div>
        <div>
          <label htmlFor="minHeight">Min Height (in millimeters)</label>
          <input
            type="text"
            name="minHeight"
            value={pdfSettings.minHeight}
            onChange={(event) =>
              setSettingValue("minHeight", event.target.value)
            }
          />
        </div>
      </div> */}
    </div>
  );
};

export default PlantQRCodePDF;
