import AutoComplete from "./AutoComplete";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../utils/constants";
import AxiosError from "../errors/AxiosError";

function SelectCountry({ defaultValue, ...props }: SelectCountryProps) {
  const {
    data: countries,
    isLoading,
    error,
    isError
  } = useQuery<CountryOption[]>({
    queryKey: ["countries"],
    queryFn: getCountries,
    retry: 10,
  });

  if (isLoading) return <p>Loading Countries....</p>;
  if (isError) return <AxiosError error={error} />;
  if (!countries || countries.length === 0)
    return <p>Error feching countries</p>;

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
