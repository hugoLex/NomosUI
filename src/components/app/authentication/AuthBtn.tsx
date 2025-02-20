import SmallLoadingSpinner from "./smLoadingSpinner";
type AuthBtnProps = {
  btnProps: {
    isLoading: boolean;
    action: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
} & ({ checked: boolean } | {});

function AuthBtn({ btnProps, ...check }: AuthBtnProps) {
  const { isLoading, action } = btnProps;
  // console.log("button prop", check);
  // if (check?.hasOwnProperty("checked")) {
  // if ("checked" in check) {
  //   return (
  //     <button
  //       disabled={!check?.checked}
  //       type="submit"
  //       className="w-full  py-[16px] px-4  tracking-wide text-white transition-colors duration-200 bg-primary shadow-[0_10px_15px_-3px_rgba(1,16,38,0.30),_0_4px_6px_-4px_rgba(1,16,38,0.30)] rounded-[5px]  focus:outline-none "
  //     >
  //       {isLoading ? <LoadingSpinner /> : action}
  //     </button>
  //   );
  // }
  return (
    <button
      disabled={"checked" in check && !check?.checked}
      type="submit"
      className={`w-full ${
        "checked" in check && !check?.checked && "disabled:cursor-not-allowed"
      } py-[16px] px-4 h-[56px]  tracking-wide text-white transition-colors duration-200 bg-primary shadow-[0_10px_15px_-3px_rgba(1,16,38,0.30),_0_4px_6px_-4px_rgba(1,16,38,0.30)] rounded-[5px]`}
    >
      {/* <LoadingSpinner /> */}
      {isLoading ? <SmallLoadingSpinner /> : action}
    </button>
  );
}

export default AuthBtn;
