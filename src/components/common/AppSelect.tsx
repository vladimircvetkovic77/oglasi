import React from "react";
import { Select } from "antd";
import { ReactComponent as Chevron } from "../../assets/icons/chevron.svg";
const { Option } = Select;

interface AppSelectProps {
  options: string[];
  mode?: "multiple" | "tags" | undefined;
  placeholder?: string;
  defaultValue?: string | null | undefined;
  maxTagPlaceholder?: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

export const AppSelect = ({
  options,
  mode,
  placeholder,
  defaultValue,
  maxTagPlaceholder,
  onChange,
  style,
}: AppSelectProps) => {
  return (
    <div className="appselect-container">
      <Select
        mode={mode}
        style={style}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        optionLabelProp="label"
        maxTagCount={0}
        maxTagPlaceholder={maxTagPlaceholder}
        suffixIcon={<Chevron />}
        showArrow
      >
        {options.length &&
          options.map((option, index) => {
            return (
              <Option key={index} value={option.toLowerCase()} label={option}>
                <div className="demo-option-label-item">{option}</div>
              </Option>
            );
          })}
      </Select>
    </div>
  );
};
