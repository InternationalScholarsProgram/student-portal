import { MenuItem } from "@mui/material";
import SelectCountry from "./SelectCountry";
import Select from "./Select";
import InputField from "./InputField";
import { useEffect, useState } from "react";

type Props = { fields: any[]; handleChange?: any; values?: any };

const MapFormFields: React.FC<Props> = ({ fields, handleChange }) => {
  const [formData, setFormData] = useState(convert(fields));

  useEffect(() => {
    setFormData(convert(fields));
  }, [fields]);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
    if (handleChange) handleChange(name, value);
  };

  if (formData?.length === 0) return null;

  return fields?.map((field: any, index) => {
    const value = formData[field.name] || field.value || "";
    return (
      <div key={index} className="form-group">
        <label className="">{field.label} </label>
        {field.type === "country" ? (
          <SelectCountry defaultValue={value} name={field.name} required />
        ) : field.type === "select" ? (
          <Select
            name={field.name}
            required={field.required}
            className="p-2 border rounded-md"
            value={value}
            onChange={onChange}
          >
            {field.options?.map((option: any, idx: number) => (
              <MenuItem key={idx} value={option?.value || option}>
                {option?.label || option}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <InputField
            type={field.type}
            name={field.name}
            {...(field.type !== "file" && { value })}
            // {...(field.type === "date" && { defaultValue: value })}
            required={field.required}
            placeholder={field.placeholder || ""}
            onChange={onChange}
          />
        )}
      </div>
    );
  });
};

export default MapFormFields;
const convert = (fields: any) =>
  fields.map((field: any) => ({ [field.name]: field.value }));
