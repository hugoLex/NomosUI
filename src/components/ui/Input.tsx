import React, { ChangeEventHandler, FC, HTMLInputTypeAttribute } from "react";

import { ComponentProps } from "@app/types";

interface InputProps extends ComponentProps {
  id?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
}

const Input: FC<InputProps> = ({
  id,
  className,
  name,
  onChange,
  type = "text",
  placeholder = "Type here...",
  required = true,
}) => {
  return (
    <>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={3}
          className={`input ${className ? className : ""}`}
          placeholder={placeholder}
        ></textarea>
      ) : (
        <input
          className={`input ${className ? className : ""}`}
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </>
  );
};

export default Input;
