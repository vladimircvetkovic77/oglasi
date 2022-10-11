import React from "react";
import { Button } from "antd";

export enum AppButtonClasses {
  SIMPLE_BUTTON_BLACKHEART = "simple-button-blackheart",
  SIMPLE_BUTTON_USER = "simple-button-user",
}
export enum AppButtonTypes {
  PRIMARY = "primary",
  LINK = "link",
}
interface AppButtonProps {
  text: string;
  onClick: () => void;
  type?: AppButtonTypes | undefined;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  classes?: AppButtonClasses[];
}

export default function AppButton({
  text,
  type,
  icon,
  loading,
  style,
  classes,
  onClick,
}: AppButtonProps) {
  return (
    <div className="appbutton-container">
      <Button
        className={classes?.join(" ")}
        style={style}
        loading={loading}
        icon={icon}
        type={type}
        onClick={onClick}
      >
        {text}
      </Button>
    </div>
  );
}
