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
