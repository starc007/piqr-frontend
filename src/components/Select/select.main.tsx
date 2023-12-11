// @ts-nocheck

import { FC } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { SelectProps } from "./typings";

const CustomSelect: FC<SelectProps> = ({
  isMulti,
  cls,
  options,
  labelCls,
  label,
  isCreatable = false,
  onChange,
  isRequired = false,
  isDisabled = false,
  placement = "auto",
  ...props
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className={`text-gray-500  text-sm font-medium ${labelCls}`}>
          {label} {isRequired && <span className="text-red-600">*</span>}
        </label>
      )}
      {isCreatable ? (
        <CreatableSelect
          className={`text-sm ${cls}`}
          isMulti={isMulti ? isMulti : false}
          options={options}
          maxMenuHeight={150}
          onChange={onChange}
          isDisabled={isDisabled}
          menuPlacement={placement}
          styles={{
            control: (provided) => ({
              ...provided,
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              "&:focus": {
                boxShadow: "none",
                outline: "none",
              },
              "&:hover": {
                border: "1px solid #e2e8f0",
              },
              minHeight: "47px",
            }),
            indicatorSeparator: (state) => ({
              display: "none",
            }),
          }}
          theme={(theme) => {
            return {
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#2E98FB",
                primary25: "#D8EAFF",
              },
            };
          }}
          {...props}
        />
      ) : (
        <Select
          className={`text-sm ${cls}`}
          isMulti={isMulti ? isMulti : false}
          options={options}
          maxMenuHeight={150}
          onChange={onChange}
          menuPlacement={placement}
          styles={{
            control: (provided) => ({
              ...provided,
              border: "1px solid #e2e8f0",
              borderRadius: "0.75rem",
              "&:focus": {
                boxShadow: "none",
                outline: "none",
              },
              "&:hover": {
                border: "1px solid #e2e8f0",
              },
              minHeight: "47px",
            }),
            indicatorSeparator: (state) => ({
              display: "none",
            }),
          }}
          theme={(theme) => {
            return {
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#2E98FB",
                primary25: "#D8EAFF",
              },
            };
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default CustomSelect;
