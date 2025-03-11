import {
  DataGrid,
  DataGridProps,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import TableHeader from "./TableHeader";
import { inputStyles } from "../../styles/styles";

interface GridTableProps extends DataGridProps {
  name: string;
  headerData?: any;
}

const CustomToolBar = (props: any) => {
  const columns = props.columns.filter((column: any) => column.field !== "");
  const onlyRequiredFields = columns.map((column: any) => column.field);
  const data = props.rows.map((row: any) =>
    onlyRequiredFields.reduce(
      (acc: any, field: any) => ({ ...acc, [field]: row[field] }),
      {}
    )
  );
  return (
    <div className="row justify-between p-4">
      <TableHeader fileName={props.name} data={props.headerData || data} />
      <GridToolbarQuickFilter
        variant="outlined"
        size="small"
        sx={{ ...inputStyles }}
      />
    </div>
  );
};

function GridTable(props: GridTableProps) {
  return (
    <DataGrid
      {...props}
      disableRowSelectionOnClick
      getCellClassName={
        props.getCellClassName
          ? props.getCellClassName
          : () => "first-letter:uppercase"
      }
      sx={{
        ...props.sx,
        minHeight: "30vh",
      }}
      slots={{
        toolbar: (toolbarProps) => (
          <CustomToolBar
            {...toolbarProps}
            name={props.name}
            headerData={props.headerData}
            columns={props.columns}
            rows={props.rows}
          />
        ),
      }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
    />
  );
}

export default GridTable;
