import { html2pdf } from "../../../../utils/utils";

export async function generateBlob(
  filename: string,
  element: any,
  margin?: number
) {
  const opt = {
    margin: margin || 0,
    filename: `${filename}_Signed.pdf`,
    image: {
      type: "jpeg",
      quality: 0.7,
    },
    html2canvas: {
      scale: 2,
    },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
    pagebreak: { mode: ["avoid-all", "css"] },
  };

  const pdf = await html2pdf().set(opt).from(element).toPdf().get("pdf");
  const download = () => html2pdf().set(opt).from(element).save();
  return { blob: pdf.output("blob"), download: download, name: filename };
}
export async function generatePdf(filename: string, element: any) {
  const opt = {
    margin: 0.5,
    filename: `${filename}.pdf`,
    image: {
      type: "jpeg",
      quality: 1,
    },
    html2canvas: {
      scale: 2,
    },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] },
  };

  const download = () => html2pdf().set(opt).from(element).save();
  download();
}
