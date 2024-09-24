import { Fragment } from "react";
import { LoadingIcon } from "../icons";

export const Shimmer = () => {
  return (
    <div className="space-y-2 w-full bg-[#eaf0f2]  rounded-lg p-3 mb-4">
      <div
        className="h-3 rounded-full w-full bg-white animate-fade"
        style={{ "--duration": "4s", "--delay": ".1s" }}
      />
      <div
        className="h-3 rounded-full w-9/12 bg-white animate-fade"
        style={{ "--duration": "3s", "--delay": ".2s" }}
      />
      <div
        className="h-3 rounded-full w-10/12 bg-white animate-fade"
        style={{ "--duration": "2s", "--delay": ".3s" }}
      />
    </div>
  );
};

export const Loader = ({
  variant = "default",
  size = 24,
  color = "#245B91",
}) => (
  <Fragment>
    {variant === "default" && (
      <span
        className="animate-spin-right h-14 w-14 text-center"
        style={{ "--duration": "0.75s", "--delay": "0" }}
      >
        <LoadingIcon />
      </span>
    )}
    {variant === "classic" && (
      <div
        className="loader"
        style={{ height: size, width: size, background: color }}
      />
    )}
  </Fragment>
);
