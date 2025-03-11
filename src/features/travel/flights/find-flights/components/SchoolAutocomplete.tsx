import { useState } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  TextFieldProps,
} from "@mui/material";
import flightApi from "../../services/flightApi";
import { useQuery } from "@tanstack/react-query";
import { inputStyles } from "../../../../../styles/styles";

type Props = {
  suggestedAirport: (value: any) => void;
  [key: string]: TextFieldProps | any;
};

const SchoolAutocomplete = ({ suggestedAirport, ...props }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<any>();

  const { data: options = [], isLoading } = useQuery({
    queryKey: ["airports", inputValue],
    queryFn: () => flightApi.fetchSchoolAirport(inputValue),
    enabled: inputValue.length >= 1,
    staleTime: 5 * 60 * 1000,
  });

  const handleSelect = (_: any, value: any) => {
    suggestedAirport(value);
    setSelected(value);
  };

  return (
    <div className="m-3">
      <label>Search Destination School</label>
      <Autocomplete
        getOptionLabel={(option: any) => `${option?.school_name}`}
        options={options}
        onChange={handleSelect}
        loading={isLoading}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            {...props}
            sx={inputStyles}
            size="small"
            placeholder="Enter School Name"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />
      {selected?.airport && (
        <p>
          Suggested airport :{" "}
          <span
            onClick={() => suggestedAirport(selected)}
            className="text-secondary-main cursor-pointer"
          >
            {selected?.airport}
          </span>
        </p>
      )}
    </div>
  );
};
export default SchoolAutocomplete;
