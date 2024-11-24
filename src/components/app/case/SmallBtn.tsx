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
          className={` ${btnStyle} text-sm block px-2 rounded-md border border-solid text-center align-middle`}
          key={justice}
        >
          {justice}
        </button>
      ))}{" "}
    </div>
  );
}
