import React from "react";
import { Input } from "antd";

export enum AppSimpleInputClasses {
  SIMPLE_INPUT = "simple-input",
}

interface AppSimpleInputProps {
  placeholder: string;
  classes?: string[];
  onChange?: (e: any) => void;
  error?: string;
  suffix?: React.ReactNode;
}

const AppSimpleInput = ({
  placeholder,
  classes,
  error,
  onChange,
  suffix,
}: AppSimpleInputProps) => {
  return (
    <div className="appsimpleinput-container">
      <Input
        suffix={suffix}
        className={classes?.join(" ")}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <div className="error-field">{error}</div>}
    </div>
  );
};
export default AppSimpleInput;
