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
  }).format(amount.toFixed(2));
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
const capitalize = (str: string) =>
  str?.toLowerCase()?.replace(/\b[a-z]/g, function (letter: string) {
    return letter?.toUpperCase();
  });
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
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import html2pdf from "html2pdf.js";

export { html2pdf };
