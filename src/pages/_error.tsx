import { NextRequest, NextResponse } from "next/server";

const Error = ({ statusCode }: { statusCode: string | number }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
};

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  console.log(statusCode);
  return { statusCode };
};

export default Error;
