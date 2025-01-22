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
    <div className="row justify-between m-4 overflow-x-auto w-full">
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
      pagination={true}
      initialState={{
        ...props.initialState,
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
      }}
      pageSizeOptions={[10, 20, 50]}
      disableRowSelectionOnClick
      sx={{
        ...props.sx,
        minHeight: "30vh",
        width: "100%",
        height: "min-content",
        overflowX: "auto",
        "& .MuiDataGrid-scrollbarFiller": {
          display: "none", // Hides the scrollbar filler
        },
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
