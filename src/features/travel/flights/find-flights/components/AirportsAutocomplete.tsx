import { useEffect, useState } from "react";
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
  selectedValue: (value: any) => void;
  completedValue: any;
  [key: string]: TextFieldProps | any;
};

const AirportsAutocomplete = ({
  selectedValue,
  completedValue,
  ...props
}: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedAirport, setSelectedAirport] = useState<any>(null); // Track the selected value

  const { data: options = [], isLoading } = useQuery({
    queryKey: ["airports", inputValue],
    queryFn: () => flightApi.fetchAirports(inputValue),
    enabled: inputValue.length >= 1, // Only fetch when input has 2+ characters
    staleTime: 5 * 60 * 1000, // Cache the results for 5 minutes
  });

  useEffect(() => {
    if (completedValue) {
      setSelectedAirport(completedValue);
    }
  }, [completedValue]);

  const getLabel = (option: any) => {
    if (!option?.name) return "";
    const cityName = option?.city_name ? ", " + option?.city_name : "";
    return `${option?.name} (${option.iata_code}) ${cityName}`;
  };

  return (
    <Autocomplete
      getOptionLabel={getLabel}
      value={selectedAirport}
      options={options}
      onChange={(_, selected) => {
        setSelectedAirport(selected);
        selectedValue(selected);
      }}
      loadingText="Loading..."
      loading={isLoading}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props}
          sx={inputStyles}
          size="small"
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
  );
};
export default AirportsAutocomplete;
