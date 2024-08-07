import { SVGProps } from "react";

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.185 13.3764C20.442 13.1193 20.442 12.7037 20.185 12.4494C19.9279 12.1951 19.5123 12.1924 19.258 12.4494L16.0041 15.7033L12.7475 12.4467C12.4904 12.1896 12.0748 12.1896 11.8205 12.4467C11.5662 12.7037 11.5635 13.1193 11.8205 13.3736L15.0744 16.6275L11.8178 19.8842C11.5607 20.1412 11.5607 20.5568 11.8178 20.8111C12.0748 21.0654 12.4904 21.0682 12.7447 20.8111L15.9986 17.5572L19.2553 20.8139C19.5123 21.0709 19.9279 21.0709 20.1822 20.8139C20.4365 20.5568 20.4393 20.1412 20.1822 19.8869L16.9283 16.633L20.185 13.3764Z"
      fill="#64645F"
    />
  </svg>
);

export const CloseCircleIcon = () => (
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const MenuIcon = () => (
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
