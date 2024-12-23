export default function TextBox({
  smallBtnData,
  divStyle,
}: {
  smallBtnData: string[];
  divStyle: string;
}) {
  return (
    <div className={`${divStyle}`}>
      {smallBtnData?.map((name) => (
        <button
          type="button"
          className={` px-2 py-[0.125rem] bg-stone-100 rounded text-center text-teal-900 text-sm font-medium
`}
          key={name}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
