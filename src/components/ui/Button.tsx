import { ComponentProps } from "@app/types";
import React, { FC, Fragment, ReactElement } from "react";

type IconPosition = "left" | "right";

interface ButtonProps extends ComponentProps {
  disabled?: boolean;
  icon?: ReactElement | any;
  label: string;
  onClick?: () => void;
  iconPosition?: IconPosition;
  type?: "button" | "submit";
}

const Button: FC<ButtonProps> = ({
  className,
  disabled = false,
  icon,
  label,
  onClick,
  iconPosition = "left",
  type = "button",
}) => {
  return (
    <Fragment>
      {!icon && (
        <button
          className={`btn ${className ? className : ""} `}
          disabled={disabled}
          onClick={onClick}
          type={type}
        >
          <span>{label}</span>
        </button>
      )}
      {icon && (
        <button
          className={`btn ${className ? className : ""}`}
          onClick={onClick}
          type={type}
          disabled={disabled}
        >
          {iconPosition === "left" && <span className="mr-1">{icon}</span>}
          <span>{label}</span>
          {iconPosition === "right" && <span className="ml-1">{icon}</span>}
        </button>
      )}
    </Fragment>
  );
};

export default Button;
