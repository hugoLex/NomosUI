export default function SmallTextBtn({
  smallBtnData,
  divStyle,
  btnStyle,
}: {
  smallBtnData: string[];
  divStyle: string;
  btnStyle: string;
}) {
  return (
    <div className={`${divStyle}`}>
      {smallBtnData.map((justice) => (
        <button
          type="button"
          className={` ${btnStyle} text-[13px] block px-2 rounded-md border border-solid bg-[rgb(255,229,153,0.5)] text-center align-middle`}
          key={justice}
        >
          {justice}
        </button>
      ))}{" "}
    </div>
  );
}
