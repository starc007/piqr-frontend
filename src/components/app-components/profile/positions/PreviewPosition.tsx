import { DeleteSVG, EditSVG } from "@assets";
import { Button } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import React, { FC } from "react";
import { toast } from "react-hot-toast";

const boxtitle = "font-semibold text-left md:text-base text-sm";
const boxSubtitle = "text-gray-600 text-left md:text-sm text-xs font-medium";

const PreviewPosition: FC<WorkExperienceType> = ({
  position,
  companyName,
  from,
  to,
  current,
  description,
  location,
  _id,
}) => {
  const { deleteWorkExperience, setSelectedId, openAddPositionModal } =
    useAppBoundStore();

  return (
    <div className="flex flex-col border border-gray-300 p-4 gap-4 rounded-xl">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className={boxtitle}>
            {position} | {companyName}
          </p>
          <p className={boxSubtitle}>{location}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => {
              setSelectedId(_id!);
              openAddPositionModal();
            }}
            cls="p-1.5"
          >
            <EditSVG class="w-4" />
          </Button>
          <Button
            cls="p-1.5"
            onClick={() =>
              toast.promise(deleteWorkExperience(_id!), {
                loading: "Deleting...",
                success: "Deleted",
                error: "Error deleting",
              })
            }
          >
            <DeleteSVG className="w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-1 mt-3">
        {description.split("-").map((item, index) =>
          item ? (
            <p
              className="text-xs md:text-sm text-gray-500 font-medium"
              key={index}
            >
              ·{item}
            </p>
          ) : null
        )}
      </div>
      <p className="text-sm text-gray-500 mt-2 font-medium">
        {new Date(from).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}{" "}
        -{" "}
        {current
          ? "Present"
          : new Date(to).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
      </p>
    </div>
  );
};

export default PreviewPosition;
