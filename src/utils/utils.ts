import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import axios from "axios";

type TableData = (string | number)[][];

function formatCurrency(amount: number | bigint | any) {
  if (typeof amount === "string") amount = parseFloat(amount);
  if (typeof amount === "object") return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount?.toFixed(2));
}

const contacts = (country: string) =>
  country.toLowerCase() === "kenya"
    ? "+(254) 742 849 555"
    : country === "zimbabwe"
    ? "+(263) 716 323 343"
    : "+1 (813) 333 1080";

// Function to export data to XLSX
const exportToXLSX = (fileName: string, data: TableData) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};

const exportToPDF = (data: any[], title: string, fileName: string) => {
  const doc = new jsPDF();
  // Add Title
  doc.setFontSize(18);
  doc.text(title, 10, 10); // Adjust the position as needed

  // Extract the keys of the first object as table headers
  const headers = Object.keys(data[0]).map((key) => formatText(key));

  // Use the array of objects directly as table data
  autoTable(doc, {
    head: [headers],
    body: data.map((row) => Object.values(row)),
    startY: 10, // Optional: Adjust starting position
  });

  // Save the PDF
  doc.save(`${fileName}.pdf`);
};
const formatText = (text: string): string => {
  if (text.includes("_")) {
    text = text.replace(/_/g, " ");
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};
function formData2json(formData: FormData) {
  const jsonObject: Record<string, any> = {};
  formData.forEach((value, key) => (jsonObject[key] = value));
  return jsonObject;
}

function json2formData(json: any) {
  const formData = new FormData();

  Object.entries(json).forEach(([key, value]) => {
    if (typeof value === "undefined" || value === null) {
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
      return;
    }

    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
      return;
    }

    formData.append(key, value.toString());
  });

  return formData;
}

const formatDate = (date: string | Date, format?: string) => {
  return dayjs(new Date(date)).format(format || "dddd, MMMM D, YYYY");
};
function capitalizeFirstCharacter(str: string) {
  if (!str) return ""; // Handle empty or undefined strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const capitalize = (str: string) =>
  str?.toLowerCase()?.replace(/\b[a-z]/g, function (letter: string) {
    return letter?.toUpperCase();
  });
type IpData = {
  ip: string;
  city: string;
  country_name: string;
};

const fetchIp = async () => {
  try {
    const ipResponse = await axios.get<IpData>("https://ipapi.co/json/");
    const resData: IpData = ipResponse.data;
    return resData;
  } catch (error) {
    console.error("Error fetching IP data:", error);
  }
};
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const pdfOptions = {
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

export async function printPDF(filename: string, element: any) {
  const opt = {
    ...pdfOptions,
    margin: 1,
    filename: filename,
  };
  html2pdf().set(opt).from(element).save();
}

// function convertImageToBase64(url: string) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "Anonymous"; // Prevents CORS issues if the image is hosted elsewhere
//     img.src = url;

//     img.onload = function () {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");

//       ctx?.drawImage(img, 0, 0);
//       const dataURL = canvas.toDataURL("image/png"); // Converts image to Base64

//       resolve(dataURL); // Return Base64 image
//     };

//     img.onerror = reject; // Handle errors
//   });
// }
function convertImageToBase64(url: string, quality: number = 0.7) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;

    img.onload = function () {
      const canvas = document.createElement("canvas");

      // Reduce resolution to avoid unnecessary large images
      const maxWidth = 800; // Adjust based on your needs
      const maxHeight = 500;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height;
        if (width > height) {
          width = maxWidth;
          height = maxWidth / aspectRatio;
        } else {
          height = maxHeight;
          width = maxHeight * aspectRatio;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      const outputFormat = "png";

      // Convert to JPEG instead of PNG to reduce size
      const dataURL = canvas.toDataURL(`image/${outputFormat}`, quality);
      resolve(dataURL);
    };

    img.onerror = reject;
  });
}
function isValidURL(str: string) {
  try {
    new URL(str); // Try to create a URL object
    return true; // If successful, return true (it's a valid URL)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false; // If an error occurs, return false (invalid URL)
  }
}

export {
  capitalize,
  formatCurrency,
  contacts,
  exportToPDF,
  exportToXLSX,
  formatText,
  json2formData,
  formatDate,
  fetchIp,
  delay,
  capitalizeFirstCharacter,
  formData2json,
  convertImageToBase64,
  isValidURL,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import html2pdf from "html2pdf.js";
export { html2pdf };
