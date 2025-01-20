import { CSVLink } from "react-csv";
import { exportToPDF, exportToXLSX, formatText } from "../../utils/utils";
import DropDown from "../DropDown";
import { Icon } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

interface TableHeaderProps {
  data: any[];
  fileName: string;
}

function TableHeader({ data, fileName }: TableHeaderProps) {
  const formatObjectKeys = (obj: any) => {
    return Object.keys(obj).reduce((acc: any, key) => {
      const formattedKey = formatText(key);
      acc[formattedKey] = obj[key];
      return acc;
    }, {});
  };
  const formattedData = data?.map(formatObjectKeys);

  if (!formattedData) return null;

  return (
    <DropDown
      title={
        <div className="text-primary-light">
          <FileDownloadOutlinedIcon />
          <span>Export</span>
        </div>
      }
      preventDefault
    >
      <div className="table-toolbar">
        <button>
          <CSVLink
            data={formattedData}
            filename={`${fileName}.csv`}
            target="_blank"
          >
            CSV
          </CSVLink>
        </button>
        <button onClick={() => exportToXLSX(fileName, formattedData)}>
          Excel
        </button>
        <button
          onClick={() =>
            exportToPDF(formattedData, formatText(fileName), fileName)
          }
        >
          PDF
        </button>
      </div>
    </DropDown>
  );
}

export default TableHeader;
