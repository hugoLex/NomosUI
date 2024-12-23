import { SVGProps } from "react";

export const RigthArrowIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2563 4.13128C10.598 3.78957 11.152 3.78957 11.4937 4.13128L16.7437 9.38128C17.0854 9.72299 17.0854 10.277 16.7437 10.6187L11.4937 15.8687C11.152 16.2104 10.598 16.2104 10.2563 15.8687C9.91457 15.527 9.91457 14.973 10.2563 14.6313L14.0126 10.875L3.875 10.875C3.39175 10.875 3 10.4832 3 10C3 9.51675 3.39175 9.125 3.875 9.125H14.0126L10.2563 5.36872C9.91457 5.02701 9.91457 4.47299 10.2563 4.13128Z"
        fill="white"
      />
    </svg>
  );
};

export const LoaderIcon = ({ animate = false }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={`${
        animate ? "animate-spin-right" : ""
      } -ml-1 mr-3 h-5 w-5 textWhite"`}
      style={{ "--duration": ".6s" }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const CollapseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className={props.className}
    width={props.width ?? 36}
    height={props.height ?? 32}
    viewBox="0 0 18 16"
    color="#909393"
    fill="none"
    xmlns="http://www.w3.org/2000s/svg"
  >
    <path
      d="M0.875 10.5137C0.875 10.8773 1.16758 11.1699 1.53125 11.1699C1.89492 11.1699 2.1875 10.8773 2.1875 10.5137V1.32617C2.1875 0.9625 1.89492 0.669922 1.53125 0.669922C1.16758 0.669922 0.875 0.9625 0.875 1.32617V10.5137ZM4.58281 5.44141C4.45156 5.56445 4.375 5.73945 4.375 5.91992C4.375 6.10039 4.44883 6.27266 4.58281 6.39844L8.30156 9.89844C8.5668 10.1473 8.97969 10.1336 9.22852 9.87109C9.47734 9.60859 9.46367 9.19297 9.20117 8.94414L6.68555 6.57617H8.96875H12.4688C12.8324 6.57617 13.125 6.28359 13.125 5.91992C13.125 5.55625 12.8324 5.26367 12.4688 5.26367H8.96875H6.68555L9.19844 2.89844C9.46367 2.64961 9.47461 2.23398 9.22578 1.97148C8.97695 1.70898 8.56133 1.69531 8.29883 1.94414L4.58008 5.44414L4.58281 5.44141Z"
      fill="currentColor"
    />
  </svg>
);

export const ExpandIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.125 1.72656C2.125 1.20703 1.70703 0.789062 1.1875 0.789062C0.667969 0.789062 0.25 1.20703 0.25 1.72656V14.8516C0.25 15.3711 0.667969 15.7891 1.1875 15.7891C1.70703 15.7891 2.125 15.3711 2.125 14.8516V1.72656ZM17.4531 8.97266C17.6406 8.79688 17.75 8.54688 17.75 8.28906C17.75 8.03125 17.6445 7.78516 17.4531 7.60547L12.1406 2.60547C11.7617 2.25 11.1719 2.26953 10.8164 2.64453C10.4609 3.01953 10.4805 3.61328 10.8555 3.96875L14.4492 7.35156H11.1875H6.1875C5.66797 7.35156 5.25 7.76953 5.25 8.28906C5.25 8.80859 5.66797 9.22656 6.1875 9.22656H11.1875H14.4492L10.8594 12.6055C10.4805 12.9609 10.4648 13.5547 10.8203 13.9297C11.1758 14.3047 11.7695 14.3242 12.1445 13.9688L17.457 8.96875L17.4531 8.97266Z"
      fill="#13343B"
    />
  </svg>
);

export const LoginIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    color="#909393"
    xmlns="http://www.w3.org/2000s/svg"
  >
    <path
      d="M8 12.2711L11.4375 8.83984L8 5.40859V7.08984C8 7.50547 7.66563 7.83984 7.25 7.83984H3.5V9.83984H7.25C7.66563 9.83984 8 10.1742 8 10.5898V12.2711ZM13 8.83984C13 9.19922 12.8562 9.54297 12.6031 9.79609L8.975 13.4148C8.70312 13.6867 8.33437 13.8398 7.95 13.8398C7.15 13.8398 6.5 13.1898 6.5 12.3898V11.3398H3.5C2.67188 11.3398 2 10.668 2 9.83984V7.83984C2 7.01172 2.67188 6.33984 3.5 6.33984H6.5V5.28984C6.5 4.48984 7.15 3.83984 7.95 3.83984C8.33437 3.83984 8.70312 3.99297 8.975 4.26484L12.6031 7.88359C12.8562 8.13672 13 8.48047 13 8.83984ZM12.75 14.3398H15.25C15.9406 14.3398 16.5 13.7805 16.5 13.0898V4.58984C16.5 3.89922 15.9406 3.33984 15.25 3.33984H12.75C12.3344 3.33984 12 3.00547 12 2.58984C12 2.17422 12.3344 1.83984 12.75 1.83984H15.25C16.7688 1.83984 18 3.07109 18 4.58984V13.0898C18 14.6086 16.7688 15.8398 15.25 15.8398H12.75C12.3344 15.8398 12 15.5055 12 15.0898C12 14.6742 12.3344 14.3398 12.75 14.3398Z"
      fill="currentColor"
    />
  </svg>
);

export const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.5 7.33984C11.5 6.01376 10.9732 4.74199 10.0355 3.80431C9.09785 2.86663 7.82608 2.33984 6.5 2.33984C5.17392 2.33984 3.90215 2.86663 2.96447 3.80431C2.02678 4.74199 1.5 6.01376 1.5 7.33984C1.5 8.66593 2.02678 9.9377 2.96447 10.8754C3.90215 11.8131 5.17392 12.3398 6.5 12.3398C7.82608 12.3398 9.09785 11.8131 10.0355 10.8754C10.9732 9.9377 11.5 8.66593 11.5 7.33984ZM10.5344 12.4367C9.42813 13.3148 8.025 13.8398 6.5 13.8398C2.90937 13.8398 0 10.9305 0 7.33984C0 3.74922 2.90937 0.839844 6.5 0.839844C10.0906 0.839844 13 3.74922 13 7.33984C13 8.86484 12.475 10.268 11.5969 11.3742L15.7812 15.5586C16.075 15.8523 16.075 16.3273 15.7812 16.618C15.4875 16.9086 15.0125 16.9117 14.7219 16.618L10.5344 12.4367Z"
      fill="#8C8F8F"
    />
  </svg>
);

export const PlusCircleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.25 1.3125C8.75842 1.3125 10.2051 1.91172 11.2717 2.97833C12.3383 4.04494 12.9375 5.49158 12.9375 7C12.9375 8.50842 12.3383 9.95506 11.2717 11.0217C10.2051 12.0883 8.75842 12.6875 7.25 12.6875C5.74158 12.6875 4.29494 12.0883 3.22833 11.0217C2.16172 9.95506 1.5625 8.50842 1.5625 7C1.5625 5.49158 2.16172 4.04494 3.22833 2.97833C4.29494 1.91172 5.74158 1.3125 7.25 1.3125ZM7.25 14C9.10652 14 10.887 13.2625 12.1997 11.9497C13.5125 10.637 14.25 8.85652 14.25 7C14.25 5.14348 13.5125 3.36301 12.1997 2.05025C10.887 0.737498 9.10652 0 7.25 0C5.39348 0 3.61301 0.737498 2.30025 2.05025C0.987498 3.36301 0.25 5.14348 0.25 7C0.25 8.85652 0.987498 10.637 2.30025 11.9497C3.61301 13.2625 5.39348 14 7.25 14ZM6.59375 9.40625C6.59375 9.76992 6.88633 10.0625 7.25 10.0625C7.61367 10.0625 7.90625 9.76992 7.90625 9.40625V7.65625H9.65625C10.0199 7.65625 10.3125 7.36367 10.3125 7C10.3125 6.63633 10.0199 6.34375 9.65625 6.34375H7.90625V4.59375C7.90625 4.23008 7.61367 3.9375 7.25 3.9375C6.88633 3.9375 6.59375 4.23008 6.59375 4.59375V6.34375H4.84375C4.48008 6.34375 4.1875 6.63633 4.1875 7C4.1875 7.36367 4.48008 7.65625 4.84375 7.65625H6.59375V9.40625Z"
      fill="#64645F"
    />
  </svg>
);

export const LibraryIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 2.33984C7.725 2.33984 7.5 2.56484 7.5 2.83984V14.8398C7.5 15.1148 7.725 15.3398 8 15.3398H16C16.275 15.3398 16.5 15.1148 16.5 14.8398V2.83984C16.5 2.56484 16.275 2.33984 16 2.33984H8ZM6 2.83984C6 1.73672 6.89687 0.839844 8 0.839844H16C17.1031 0.839844 18 1.73672 18 2.83984V14.8398C18 15.943 17.1031 16.8398 16 16.8398H8C6.89687 16.8398 6 15.943 6 14.8398V2.83984ZM3 3.08984C3 2.67422 3.33437 2.33984 3.75 2.33984C4.16563 2.33984 4.5 2.67422 4.5 3.08984V14.5898C4.5 15.0055 4.16563 15.3398 3.75 15.3398C3.33437 15.3398 3 15.0055 3 14.5898V3.08984ZM0 4.58984C0 4.17422 0.334375 3.83984 0.75 3.83984C1.16562 3.83984 1.5 4.17422 1.5 4.58984V13.0898C1.5 13.5055 1.16562 13.8398 0.75 13.8398C0.334375 13.8398 0 13.5055 0 13.0898V4.58984Z"
      fill="#64645F"
    />
  </svg>
);

export const KeyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.9961 11.6309C14.0336 11.6309 16.4961 9.16836 16.4961 6.13086C16.4961 3.09336 14.0336 0.630859 10.9961 0.630859C7.95859 0.630859 5.49609 3.09336 5.49609 6.13086C5.49609 6.71523 5.58672 7.28086 5.75547 7.80898L0.714844 12.8496C0.574219 12.9902 0.496094 13.1809 0.496094 13.3809V15.8809C0.496094 16.2965 0.830469 16.6309 1.24609 16.6309H3.74609C4.16172 16.6309 4.49609 16.2965 4.49609 15.8809V14.6309H5.74609C6.16172 14.6309 6.49609 14.2965 6.49609 13.8809V12.6309H7.74609C7.94609 12.6309 8.13672 12.5527 8.27734 12.4121L9.31797 11.3715C9.84609 11.5402 10.4117 11.6309 10.9961 11.6309ZM12.2461 3.63086C12.5776 3.63086 12.8956 3.76256 13.13 3.99698C13.3644 4.2314 13.4961 4.54934 13.4961 4.88086C13.4961 5.21238 13.3644 5.53032 13.13 5.76474C12.8956 5.99916 12.5776 6.13086 12.2461 6.13086C11.9146 6.13086 11.5966 5.99916 11.3622 5.76474C11.1278 5.53032 10.9961 5.21238 10.9961 4.88086C10.9961 4.54934 11.1278 4.2314 11.3622 3.99698C11.5966 3.76256 11.9146 3.63086 12.2461 3.63086Z"
      fill="#13343B"
    />
  </svg>
);

export const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.625 8.81211C15.625 13.234 12.5969 16.3809 8.125 16.3809C3.8375 16.3809 0.375 12.9184 0.375 8.63086C0.375 4.34336 3.8375 0.880859 8.125 0.880859C10.2125 0.880859 11.9688 1.64648 13.3219 2.90898L11.2125 4.93711C8.45312 2.27461 3.32188 4.27461 3.32188 8.63086C3.32188 11.334 5.48125 13.5246 8.125 13.5246C11.1938 13.5246 12.3438 11.3246 12.525 10.184H8.125V7.51836H15.5031C15.575 7.91523 15.625 8.29648 15.625 8.81211Z"
      fill="#13343B"
    />
  </svg>
);

export const GearIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.00023 0C7.46508 0 7.91898 0.0464844 8.36195 0.13125C8.57797 0.172266 8.95805 0.298047 9.16586 0.680859C9.22055 0.782031 9.26429 0.888672 9.29164 1.00352L9.54594 2.05625C9.58422 2.21484 9.85219 2.3707 10.008 2.32422L11.0471 2.01797C11.1565 1.98516 11.2686 1.96875 11.3807 1.96602C11.8209 1.95234 12.119 2.22305 12.2639 2.38711C12.8682 3.07344 13.333 3.88008 13.6284 4.74688C13.6995 4.95469 13.7815 5.34297 13.5545 5.71484C13.4944 5.81328 13.4205 5.90625 13.3358 5.98828L12.551 6.73477C12.4362 6.84414 12.4362 7.15859 12.551 7.26797L13.3358 8.01445C13.4205 8.09648 13.4944 8.18945 13.5545 8.28789C13.7787 8.65977 13.6967 9.04805 13.6284 9.25586C13.333 10.1227 12.8682 10.9266 12.2639 11.6156C12.119 11.7797 11.8182 12.0504 11.3807 12.0367C11.2686 12.034 11.1565 12.0148 11.0471 11.9848L10.008 11.6758C9.85219 11.6293 9.58422 11.7852 9.54594 11.9437L9.29164 12.9965C9.26429 13.1113 9.22055 13.2207 9.16586 13.3191C8.95531 13.702 8.57523 13.825 8.36195 13.8688C7.91898 13.9535 7.46508 14 7.00023 14C6.53539 14 6.08148 13.9535 5.63851 13.8688C5.4225 13.8277 5.04242 13.702 4.83461 13.3191C4.77992 13.218 4.73617 13.1113 4.70883 12.9965L4.45453 11.9437C4.41625 11.7852 4.14828 11.6293 3.99242 11.6758L2.95336 11.982C2.84398 12.0148 2.73187 12.0312 2.61976 12.034C2.17953 12.0477 1.88148 11.777 1.73656 11.6129C1.135 10.9266 0.667421 10.1199 0.372108 9.25313C0.301014 9.04531 0.218983 8.65703 0.445936 8.28516C0.506092 8.18672 0.579921 8.09375 0.664686 8.01172L1.44945 7.26523C1.5643 7.15586 1.5643 6.84141 1.44945 6.73203L0.661952 5.98555C0.577186 5.90352 0.503358 5.81055 0.443202 5.71211C0.218983 5.34023 0.301014 4.95195 0.372108 4.74688C0.667421 3.88008 1.13226 3.07617 1.73656 2.38711C1.88148 2.22305 2.18226 1.95234 2.61976 1.96602C2.73187 1.96875 2.84398 1.98789 2.95336 2.01797L3.99242 2.32422C4.14828 2.3707 4.41625 2.21484 4.45453 2.05625L4.70883 1.00352C4.73617 0.888672 4.77992 0.779297 4.83461 0.680859C5.04516 0.298047 5.42523 0.175 5.63851 0.13125C6.08148 0.0464844 6.53539 0 7.00023 0ZM5.96391 1.40547L5.73148 2.36523C5.5182 3.24844 4.49281 3.83906 3.62055 3.58477L2.67719 3.30586C2.22601 3.83359 1.87055 4.44609 1.63812 5.10234L2.35453 5.7832C3.01078 6.40664 3.01078 7.59336 2.35453 8.2168L1.63812 8.89766C1.87055 9.55391 2.22601 10.1664 2.67719 10.6941L3.62328 10.4152C4.49281 10.1582 5.52094 10.7516 5.73422 11.6348L5.96664 12.5945C6.6393 12.7176 7.36937 12.7176 8.04203 12.5945L8.27445 11.6348C8.48773 10.7516 9.51312 10.1609 10.3854 10.4152L11.3315 10.6941C11.7827 10.1664 12.1381 9.55391 12.3705 8.89766L11.6541 8.2168C10.9979 7.59336 10.9979 6.40664 11.6541 5.7832L12.3705 5.10234C12.1381 4.44609 11.7827 3.83359 11.3315 3.30586L10.3854 3.58477C9.51586 3.8418 8.48773 3.24844 8.27445 2.36523L8.04203 1.40547C7.36937 1.28242 6.6393 1.28242 5.96664 1.40547H5.96391ZM5.68773 7C5.68773 7.3481 5.82601 7.68194 6.07216 7.92808C6.3183 8.17422 6.65214 8.3125 7.00023 8.3125C7.34833 8.3125 7.68217 8.17422 7.92831 7.92808C8.17445 7.68194 8.31273 7.3481 8.31273 7C8.31273 6.6519 8.17445 6.31806 7.92831 6.07192C7.68217 5.82578 7.34833 5.6875 7.00023 5.6875C6.65214 5.6875 6.3183 5.82578 6.07216 6.07192C5.82601 6.31806 5.68773 6.6519 5.68773 7ZM7.00023 9.625C6.30404 9.625 5.63636 9.34844 5.14408 8.85616C4.65179 8.36387 4.37523 7.69619 4.37523 7C4.37523 6.30381 4.65179 5.63613 5.14408 5.14384C5.63636 4.65156 6.30404 4.375 7.00023 4.375C7.69643 4.375 8.36411 4.65156 8.85639 5.14384C9.34867 5.63613 9.62523 6.30381 9.62523 7C9.62523 7.69619 9.34867 8.36387 8.85639 8.85616C8.36411 9.34844 7.69643 9.625 7.00023 9.625Z"
      fill="#64645F"
    />
  </svg>
);

export const FilterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.625 1.40625C0.625 1.04258 0.917578 0.75 1.28125 0.75H12.2188C12.5824 0.75 12.875 1.04258 12.875 1.40625C12.875 1.76992 12.5824 2.0625 12.2188 2.0625H1.28125C0.917578 2.0625 0.625 1.76992 0.625 1.40625ZM2.375 5.78125C2.375 5.41758 2.66758 5.125 3.03125 5.125H10.4688C10.8324 5.125 11.125 5.41758 11.125 5.78125C11.125 6.14492 10.8324 6.4375 10.4688 6.4375H3.03125C2.66758 6.4375 2.375 6.14492 2.375 5.78125ZM8.5 10.1562C8.5 10.5199 8.20742 10.8125 7.84375 10.8125H5.65625C5.29258 10.8125 5 10.5199 5 10.1562C5 9.79258 5.29258 9.5 5.65625 9.5H7.84375C8.20742 9.5 8.5 9.79258 8.5 10.1562Z"
      fill="#64645F"
    />
  </svg>
);

export const CompassIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 8.83984C14.5 7.11594 13.8152 5.46264 12.5962 4.24365C11.3772 3.02466 9.72391 2.33984 8 2.33984C6.27609 2.33984 4.62279 3.02466 3.40381 4.24365C2.18482 5.46264 1.5 7.11594 1.5 8.83984C1.5 10.5638 2.18482 12.2171 3.40381 13.436C4.62279 14.655 6.27609 15.3398 8 15.3398C9.72391 15.3398 11.3772 14.655 12.5962 13.436C13.8152 12.2171 14.5 10.5638 14.5 8.83984ZM0 8.83984C0 6.71811 0.842855 4.68328 2.34315 3.18299C3.84344 1.6827 5.87827 0.839844 8 0.839844C10.1217 0.839844 12.1566 1.6827 13.6569 3.18299C15.1571 4.68328 16 6.71811 16 8.83984C16 10.9616 15.1571 12.9964 13.6569 14.4967C12.1566 15.997 10.1217 16.8398 8 16.8398C5.87827 16.8398 3.84344 15.997 2.34315 14.4967C0.842855 12.9964 0 10.9616 0 8.83984ZM9.58438 10.9992L5.075 12.7336C4.46875 12.968 3.87187 12.3711 4.10625 11.7648L5.84062 7.25547C5.94375 6.98984 6.15 6.78359 6.41563 6.68047L10.925 4.94609C11.5312 4.71172 12.1281 5.30859 11.8938 5.91484L10.1594 10.4242C10.0594 10.6898 9.85 10.8961 9.58438 10.9992ZM9 8.83984C9 8.57463 8.89464 8.32027 8.70711 8.13274C8.51957 7.9452 8.26522 7.83984 8 7.83984C7.73478 7.83984 7.48043 7.9452 7.29289 8.13274C7.10536 8.32027 7 8.57463 7 8.83984C7 9.10506 7.10536 9.35941 7.29289 9.54695C7.48043 9.73449 7.73478 9.83984 8 9.83984C8.26522 9.83984 8.51957 9.73449 8.70711 9.54695C8.89464 9.35941 9 9.10506 9 8.83984Z"
      fill="#8C8F8F"
    />
  </svg>
);
export const CaretUp = ({
  stroke = "white",
  width = "24",
  height = "24",
}: SVGProps<SVGSVGElement>) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.2929 8.79289C11.6834 8.40237 12.3166 8.40237 12.7071 8.79289L17.7071 13.7929C18.0976 14.1834 18.0976 14.8166 17.7071 15.2071C17.3166 15.5976 16.6834 15.5976 16.2929 15.2071L12 10.9142L7.70711 15.2071C7.31658 15.5976 6.68342 15.5976 6.29289 15.2071C5.90237 14.8166 5.90237 14.1834 6.29289 13.7929L11.2929 8.79289Z"
      fill="#000000"
    />
  </svg>
);
export const CaretDown = ({
  stroke = "white",
  width = "24",
  height = "24",
}: SVGProps<SVGSVGElement>) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.29289 8.79289C6.68342 8.40237 7.31658 8.40237 7.70711 8.79289L12 13.0858L16.2929 8.79289C16.6834 8.40237 17.3166 8.40237 17.7071 8.79289C18.0976 9.18342 18.0976 9.81658 17.7071 10.2071L12.7071 15.2071C12.3166 15.5976 11.6834 15.5976 11.2929 15.2071L6.29289 10.2071C5.90237 9.81658 5.90237 9.18342 6.29289 8.79289Z"
      fill="#000000"
    />
  </svg>
);

export const ArrowUpRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.47026 0.625C8.83394 0.625 9.12651 0.917578 9.12651 1.28125V7.84375C9.12651 8.20742 8.83394 8.5 8.47026 8.5C8.10659 8.5 7.81401 8.20742 7.81401 7.84375V2.86445L1.49761 9.18359C1.24058 9.44063 0.824953 9.44063 0.570656 9.18359C0.316359 8.92656 0.313624 8.51094 0.570656 8.25664L6.88706 1.94023H1.90777C1.54409 1.94023 1.25152 1.64766 1.25152 1.28398C1.25152 0.920312 1.54409 0.627734 1.90777 0.627734H8.47026V0.625Z"
      fill="#13343B"
    />
  </svg>
);

export const AppleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 18 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.94766 8.02773C9.94141 6.88086 10.4602 6.01523 11.5102 5.37773C10.9227 4.53711 10.0352 4.07461 8.86328 3.98398C7.75391 3.89648 6.54141 4.63086 6.09766 4.63086C5.62891 4.63086 4.55391 4.01523 3.71016 4.01523C1.96641 4.04336 0.113281 5.40586 0.113281 8.17773C0.113281 8.99648 0.263281 9.84232 0.563281 10.7152C0.963281 11.8621 2.40703 14.6746 3.91328 14.6277C4.70078 14.609 5.25703 14.0684 6.28203 14.0684C7.27578 14.0684 7.79141 14.6277 8.66953 14.6277C10.1883 14.6059 11.4945 12.0496 11.8758 10.8996C9.83828 9.94023 9.94766 8.08711 9.94766 8.02773ZM8.17891 2.89648C9.03203 1.88398 8.95391 0.962109 8.92891 0.630859C8.17578 0.674609 7.30391 1.14336 6.80703 1.72148C6.26016 2.34023 5.93828 3.10586 6.00703 3.96836C6.82266 4.03086 7.56641 3.61211 8.17891 2.89648Z"
      fill="#13343B"
    />
  </svg>
);

export const ClipPaperIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
      />
    </svg>
  );
};

export const LoadingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export const Filter2Icon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Capa_1"
      x="0px"
      y="0px"
      viewBox="0 0 512.051 512.051"
      width="19"
      height="19"
      fill="#8C8F8F"
      {...props}
    >
      <g>
        <path d="M21.359,101.359h58.368c11.52,42.386,55.219,67.408,97.605,55.888c27.223-7.399,48.489-28.665,55.888-55.888h257.472   c11.782,0,21.333-9.551,21.333-21.333s-9.551-21.333-21.333-21.333H233.22C221.7,16.306,178.001-8.716,135.615,2.804   c-27.223,7.399-48.489,28.665-55.888,55.888H21.359c-11.782,0-21.333,9.551-21.333,21.333S9.577,101.359,21.359,101.359z" />
        <path d="M490.692,234.692h-58.368c-11.497-42.38-55.172-67.416-97.552-55.92c-27.245,7.391-48.529,28.674-55.92,55.92H21.359   c-11.782,0-21.333,9.551-21.333,21.333c0,11.782,9.551,21.333,21.333,21.333h257.493c11.497,42.38,55.172,67.416,97.552,55.92   c27.245-7.391,48.529-28.674,55.92-55.92h58.368c11.782,0,21.333-9.551,21.333-21.333   C512.025,244.243,502.474,234.692,490.692,234.692z" />
        <path d="M490.692,410.692H233.22c-11.52-42.386-55.219-67.408-97.605-55.888c-27.223,7.399-48.489,28.665-55.888,55.888H21.359   c-11.782,0-21.333,9.551-21.333,21.333c0,11.782,9.551,21.333,21.333,21.333h58.368c11.52,42.386,55.219,67.408,97.605,55.888   c27.223-7.399,48.489-28.665,55.888-55.888h257.472c11.782,0,21.333-9.551,21.333-21.333   C512.025,420.243,502.474,410.692,490.692,410.692z" />
      </g>
    </svg>
  );
};

export const ChevronDownIcon = () => {
  return (
    <svg
      width="23px"
      height="23px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 9.5L12 14.5L7 9.5"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    className={props.className}
    width={props.width ?? 24}
    height={props.height ?? 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 6V18"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 12H18"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MoreIcon = () => (
  <svg
    width="13"
    height="3"
    viewBox="0 0 13 3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.1758 1.5C12.1758 1.8481 12.0375 2.18194 11.7914 2.42808C11.5452 2.67422 11.2114 2.8125 10.8633 2.8125C10.5152 2.8125 10.1813 2.67422 9.9352 2.42808C9.68906 2.18194 9.55078 1.8481 9.55078 1.5C9.55078 1.1519 9.68906 0.818064 9.9352 0.571922C10.1813 0.325781 10.5152 0.1875 10.8633 0.1875C11.2114 0.1875 11.5452 0.325781 11.7914 0.571922C12.0375 0.818064 12.1758 1.1519 12.1758 1.5ZM7.80078 1.5C7.80078 1.67236 7.76683 1.84303 7.70087 2.00227C7.63491 2.16151 7.53824 2.3062 7.41636 2.42808C7.29448 2.54995 7.14979 2.64663 6.99055 2.71259C6.83131 2.77855 6.66064 2.8125 6.48828 2.8125C6.31592 2.8125 6.14525 2.77855 5.98601 2.71259C5.82677 2.64663 5.68208 2.54995 5.5602 2.42808C5.43833 2.3062 5.34165 2.16151 5.27569 2.00227C5.20973 1.84303 5.17578 1.67236 5.17578 1.5C5.17578 1.32764 5.20973 1.15697 5.27569 0.997728C5.34165 0.838488 5.43833 0.693799 5.5602 0.571922C5.68208 0.450045 5.82677 0.353367 5.98601 0.287408C6.14525 0.221449 6.31592 0.1875 6.48828 0.1875C6.66064 0.1875 6.83131 0.221449 6.99055 0.287408C7.14979 0.353367 7.29448 0.450045 7.41636 0.571922C7.53824 0.693799 7.63491 0.838488 7.70087 0.997728C7.76683 1.15697 7.80078 1.32764 7.80078 1.5ZM2.11328 2.8125C1.76518 2.8125 1.43135 2.67422 1.1852 2.42808C0.939062 2.18194 0.800781 1.8481 0.800781 1.5C0.800781 1.1519 0.939062 0.818064 1.1852 0.571922C1.43135 0.325781 1.76518 0.1875 2.11328 0.1875C2.46138 0.1875 2.79522 0.325781 3.04136 0.571922C3.2875 0.818064 3.42578 1.1519 3.42578 1.5C3.42578 1.8481 3.2875 2.18194 3.04136 2.42808C2.79522 2.67422 2.46138 2.8125 2.11328 2.8125Z"
      fill="#64645F"
    />
  </svg>
);

export const Share1Icon = () => (
  <svg
    width="15"
    height="13"
    viewBox="0 0 15 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.2383 5.1875L8.98828 10H8.11328V7.375H5.92578C4.2332 7.375 2.86328 8.74492 2.86328 10.4375C2.86328 11.75 3.73828 12.625 3.73828 12.625C3.73828 12.625 0.238281 11.3125 0.238281 7.8125C0.238281 5.15469 2.39297 3 5.05078 3H8.11328V0.375H8.98828L14.2383 5.1875Z"
      fill="white"
    />
  </svg>
);

export const ArrowLeftIcon = ({
  stroke = "white",
  width = "24",
  height = "24",
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M4.25 12.2744L19.25 12.2744"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowRightIcon = ({
  stroke = "white",
  width = "24",
  height = "24",
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M19.75 11.7256L4.75 11.7256"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.7002 5.70124L19.7502 11.7252L13.7002 17.7502"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
