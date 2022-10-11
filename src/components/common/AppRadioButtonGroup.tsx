import React from "react";
import { Radio, RadioChangeEvent } from "antd";

export enum AppRadioButtonGroupClasses {
  SIMPLE_TWO_RADIOS = "simple-two-radios",
}

interface AppRadioButtonGroupProps {
  options: string[];
  initialValue: string;
  onChange: (e: RadioChangeEvent) => void;
  classes?: string[];
}

export default function AppRadioButtonGroup({
  options,
  initialValue,
  onChange,
  classes,
}: AppRadioButtonGroupProps) {
  return (
    <div className="appradiobuttongroup-container">
      <Radio.Group
        onChange={onChange}
        value={initialValue}
        className={classes?.join(" ")}
      >
        {options &&
          options?.map((option, index) => {
            return (
              <Radio key={`${option}-${index}`} value={option}>
                {option}
              </Radio>
            );
          })}
      </Radio.Group>
    </div>
  );
}
