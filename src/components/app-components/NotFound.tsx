import React from "react";
import { Link } from "@components";

const NotFound = () => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start md:px-8 mt-40">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          <h6 className="font-bold text-primary bg-primary/10 w-fit px-3 rounded-full mx-auto">
            404 ERROR
          </h6>
          <h3 className="text-gray-800 text-4xl font-semibold sm:text-5xl">
            Page not found
          </h3>
          <p className="text-gray-600">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
          <Link
            href="/"
            className="bg-primary flex items-center justify-center  rounded-full duration-200 ease-out px-4 h-10 w-fit mx-auto text-white font-semibold hover:brightness-95  "
          >
            Go back
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
