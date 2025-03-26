import AutoComplete from "./AutoComplete";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../utils/constants";

function SelectCountry({ defaultValue, ...props }: SelectCountryProps) {
  const { data: countries } = useQuery<CountryOption[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
  if (!countries || countries.length === 0) return null;

  const defaultCountry = defaultValue
    ? countries.find(
        (country) => country.value.toLowerCase() === defaultValue.toLowerCase()
      )
    : undefined;

  return (
    <AutoComplete
      {...props}
      options={countries}
      defaultValue={defaultCountry}
      getOptionLabel={(option: CountryOption) => option.label}
    />
  );
}

export default SelectCountry;

type CountryOption = {
  label: string;
  value: string;
};

type SelectCountryProps = {
  defaultValue?: string;
  [key: string]: any;
};
