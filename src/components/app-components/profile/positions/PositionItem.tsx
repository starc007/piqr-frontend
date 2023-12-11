import React from "react";
import { SuitcaseSVG, TimeSVG, locationIcon } from "@assets";
import { Image } from "@components/Image";

const PositionItem: React.FC<
  WorkExperienceType & {
    isLastItem?: boolean;
  }
> = ({
  companyName,
  current,
  description,
  from,
  location,
  position,
  to,
  isLastItem,
}) => {
  return (
    <div className="flex gap-4 w-full">
      <div className="flex flex-col items-center">
        <div className="grid place-items-center h-12 w-12 border rounded-full border-gray-300">
          <SuitcaseSVG />
        </div>
        {!isLastItem && <div className="bg-gray-200 w-[1px] h-max" />}
      </div>
      <div className="w-5/6 md:w-11/12">
        <div className="flex justify-between md:items-center md:flex-row flex-col">
          <div className="flex flex-col">
            <p className="font-semibold">{position}</p>
            <p className="font-medium text-gray-600 text-sm">@{companyName}</p>
          </div>
          <div className="flex items-center gap-1 md:mt-0 mt-1">
            <TimeSVG className="w-4" />
            <p className="text-gray-500 text-xs font-medium">
              {
                // @ts-ignore
                new Date(from).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              }{" "}
              -{" "}
              {current
                ? "Present"
                : new Date(to).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  }) || "Present"}
            </p>
          </div>
          <div className="flex items-center gap-1 md:mt-0 mt-1">
            <Image src={locationIcon} alt="location" width={13} height={13} />{" "}
            <p className="text-gray-500 text-xs font-medium">{location}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mt-3">
          <p className="text-sm text-gray-500 whitespace-pre-line">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PositionItem;
