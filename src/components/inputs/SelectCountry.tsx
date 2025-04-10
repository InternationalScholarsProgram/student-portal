import AutoComplete from "./AutoComplete";
import { countries } from "../../utils/constants";

const SelectCountry: React.FC<SelectCountryProps> = ({
  defaultValue,
  ...props
}) => {
  return (
    <AutoComplete
      {...props}
      options={countries}
      defaultValue={countries.find(
        (country) => country.toLowerCase() === defaultValue?.toLowerCase()
      )}
      getOptionLabel={(option) => option}
    />
  );
};

export default SelectCountry;

type SelectCountryProps = {
  defaultValue?: string;
  [key: string]: any;
};
