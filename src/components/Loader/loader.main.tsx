import { LoaderProps } from "./typings";

const Loader = ({
  h,
  w,
  col,
  loaderType = "spinner",
  barsCount = 3,
}: LoaderProps) => {
  return loaderType === "spinner" ? (
    <svg
      fill="none"
      className={`
        ${h ? h : "h-10"}
        ${w ? w : "w-10"}
        ${col ? col : "text-white"}
      animate-spin`}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  ) : (
    <div className="space-y-4">
      {[...Array(barsCount)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-100 animate-pulse h-10 w-full px-4 py-2 rounded-md text-white rounded-tl-none"
        />
      ))}
    </div>
  );
};

export default Loader;
