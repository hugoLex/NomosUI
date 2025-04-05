import Link from "next/link";

export default function SuccessUI({
  heading,
  subheading,
  link,
  action,
}: {
  heading: string;
  subheading: string;
  link: string;
  action: string;
}) {
  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white rounded-lg shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{heading}</h1>
        <p className="text-gray-600">{subheading}</p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
        <p className="text-sm text-blue-700 font-medium">
          Welcome to Lexanalytics where research and drafting is at your
          fingertips.
        </p>
      </div>

      <div className="text-center">
        <Link
          href={link}
          className="block w-full relative py-[16px] px-4 h-[56px] rounded-md tracking-wide text-white transition-colors duration-200 bg-blue_btn rounded-[5px]`}
"
        >
          {action}
        </Link>
        <p className="mt-4 text-sm text-gray-500">
          Need help?{" "}
          <Link href="/" className="text-blue-600 hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
