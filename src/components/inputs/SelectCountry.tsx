import AutoComplete from "./AutoComplete";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../utils/constants";

function SelectCountry({ ...props }) {
  const { data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
  return (
    <AutoComplete
      {...props}
      options={countries || []}
      getOptionLabel={(option) => option.label}
      name="country"
    />
  );
}

export default SelectCountry;
