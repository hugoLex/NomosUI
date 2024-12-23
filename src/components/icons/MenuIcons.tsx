import { SVGProps } from "react";

export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <title />

    <g id="cross">
      <line x1="7" x2="25" y1="7" y2="25" stroke={props.stroke} />
      <line x1="7" x2="25" y1="25" y2="7" stroke={props.stroke} />
    </g>
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

export const Search = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#909393"
    fill="none"
  >
    <path
      d="M14 14L16.5 16.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M16.4333 18.5252C15.8556 17.9475 15.8556 17.0109 16.4333 16.4333C17.0109 15.8556 17.9475 15.8556 18.5252 16.4333L21.5667 19.4748C22.1444 20.0525 22.1444 20.9891 21.5667 21.5667C20.9891 22.1444 20.0525 22.1444 19.4748 21.5667L16.4333 18.5252Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16 9C16 5.13401 12.866 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const Library = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#909393"
    fill="none"
  >
    <path
      d="M2 15H15C15.9319 15 16.3978 15 16.7654 15.1522C17.2554 15.3552 17.6448 15.7446 17.8478 16.2346C18 16.6022 18 17.0681 18 18C18 18.9319 18 19.3978 17.8478 19.7654C17.6448 20.2554 17.2554 20.6448 16.7654 20.8478C16.3978 21 15.9319 21 15 21H2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 3H15C15.9319 3 16.3978 3 16.7654 3.15224C17.2554 3.35523 17.6448 3.74458 17.8478 4.23463C18 4.60218 18 5.06812 18 6C18 6.93188 18 7.39782 17.8478 7.76537C17.6448 8.25542 17.2554 8.64477 16.7654 8.84776C16.3978 9 15.9319 9 15 9H2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 9H9C8.06812 9 7.60218 9 7.23463 9.15224C6.74458 9.35523 6.35523 9.74458 6.15224 10.2346C6 10.6022 6 11.0681 6 12C6 12.9319 6 13.3978 6.15224 13.7654C6.35523 14.2554 6.74458 14.6448 7.23463 14.8478C7.60218 15 8.06812 15 9 15H22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 15C19.8954 15 19 13.6569 19 12C19 10.3431 19.8954 9 21 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 3C4.10457 3 5 4.34315 5 6C5 7.65685 4.10457 9 3 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 15C4.10457 15 5 16.3431 5 18C5 19.6569 4.10457 21 3 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const Bench = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#909393"
    fill="none"
  >
    <path
      d="M10 11.6273L5.07498 17.4215C4.41411 18.199 3.23201 18.2464 2.51138 17.5241C1.79074 16.8019 1.83795 15.6172 2.61376 14.9549L8.3953 10.019"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M18 10.0667L13.0476 15.03M9.95238 2.00146L5 6.96472M9.33337 2.62183L5.61908 6.34428C5.61908 6.34428 7.47622 8.82591 9.33337 10.6871C11.1905 12.5484 13.6667 14.4096 13.6667 14.4096L17.381 10.6871C17.381 10.6871 15.5238 8.2055 13.6667 6.34428C11.8096 4.48306 9.33337 2.62183 9.33337 2.62183Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 11.659L22 10.019M20 14.9389L22 16.0322"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.002 21.9988H20.9998M12.2267 21.9988C12.7782 21.0113 13.19 19.1216 15.142 19.0158C15.7218 18.9843 16.3117 18.9843 16.8914 19.0158C18.8434 19.1216 19.2572 21.0113 19.8087 21.9988"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
