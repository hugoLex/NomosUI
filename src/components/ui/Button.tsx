import { ComponentProps } from "@app/types";
import React, { FC, Fragment, ReactElement } from "react";

type Variant = "default" | "icon";

interface ButtonProps extends ComponentProps {
  disabled?: boolean;
  icon?: ReactElement | any;
  label: string;
  onClick?: () => void;
  variant?: Variant;
  type?: "button" | "submit";
}

const Button: FC<ButtonProps> = ({
  className,
  disabled = false,
  icon,
  label,
  onClick,
  variant = "default",
  type = "button",
}) => {
  return (
    <Fragment>
      {variant === "default" && (
        <button
          className={`btn ${className ? className : ""}`}
          disabled={disabled}
          onClick={onClick}
          type={type}
        >
          <span>{label}</span>
        </button>
      )}
      {variant === "icon" && (
        <button
          className={`btn ${className ? className : ""}`}
          onClick={onClick}
          type={type}
          disabled={disabled}
        >
          <span>{label}</span>
          {icon && <span className="ml-2">{icon}</span>}
        </button>
      )}
    </Fragment>
  );
};

export default Button;
