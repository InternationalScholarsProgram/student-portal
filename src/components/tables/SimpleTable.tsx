import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
type Props = {
  columns: GridColDef[];
  rows: any[];
};

const SimpleTable: React.FC<Props> = ({ columns, rows }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col: GridColDef, index) => (
            <TableCell key={index} sx={{ color: "primary.main" }}>
              {col.headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((col: GridColDef, colIndex) => (
              <TableCell key={colIndex}>{row[col.field]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SimpleTable;
