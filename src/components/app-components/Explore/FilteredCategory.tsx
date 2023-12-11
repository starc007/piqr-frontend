import { ArrowDiagonalSVG } from "@assets/index";
import { Link } from "@components";
import { FILTERED_CATEGORY } from "@utils";
import React from "react";

const FilteredCategory = () => {
  return (
    <div className="hide__scrollbar md:mb-0 mb-4 max-w-screen-xl overflow-x-auto">
      <div className="flex gap-4 w-max">
        {FILTERED_CATEGORY.map((item) => (
          <Link
            href={`/user/${item.slug}`}
            key={item.id}
            className={`rounded-3xl w-72 p-5 ${item.bgCol} hover:scale-95 transition-all duration-300 ease-in-out`}
          >
            <div className="flex justify-between items-center">
              <p
                className={`text-xl ${item.txtCol} font-bold border rounded-full w-16 h-16 flex justify-center items-center`}
              >
                {item.num}+
              </p>
              <ArrowDiagonalSVG
                className={`mr-4 ${
                  item.txtCol === "text-dark border-dark"
                    ? "fill-dark"
                    : "fill-white"
                }`}
              />
            </div>

            <p className={`mt-8 font-medium text-center ${item.txtCol}`}>
              {item.title}
            </p>
            <p
              className={`mt-4 font-bold text-center text-[32px] font-sans ${item.txtCol}`}
            >
              {item.subTitle}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilteredCategory;
