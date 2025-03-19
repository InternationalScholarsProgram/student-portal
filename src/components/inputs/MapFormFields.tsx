import { MenuItem } from "@mui/material";
import SelectCountry from "./SelectCountry";
import Select from "./Select";
import InputField from "./InputField";

const MapFormFields: React.FC<{ fields: any[]; handleChange?: any }> = ({
  fields = [],
  handleChange,
}) => {
  return fields?.map((field: any, index: number) => (
    <div key={index} className="form-group">
      <label className="">{field.label}</label>
      {field.name === "citizenship" || field.name === "country" ? (
        <SelectCountry name={field.name} required />
      ) : field.type === "select" ? (
        <Select
          name={field.name}
          required={field.required}
          className="p-2 border rounded-md"
          onChange={handleChange}
        >
          <MenuItem value="">Select</MenuItem>
          {field.options?.map((option: any, idx: number) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <InputField
          type={field.type}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder || ""}
          onChange={handleChange}
        />
      )}
    </div>
  ));
};

export default MapFormFields;
