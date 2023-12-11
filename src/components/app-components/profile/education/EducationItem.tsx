import { DeleteSVG, EditSVG, EducationSVG } from "@assets";
import { Button } from "@components/Button";
import { useAppBoundStore } from "@store";
import React from "react";
import { toast } from "react-hot-toast";

const boxStyle =
  "flex items-center justify-center p-1 w-12 h-12 border rounded-full";
const boxtitle = "font-semibold text-left md:text-base text-sm";
const boxSubtitle = "text-gray-600 text-left md:text-sm text-xs font-medium";

const EducationItem: React.FC<
  EducationType & {
    isEditable: boolean;
  }
> = ({
  schoolName,
  degree,
  fieldOfStudy,
  from,
  to,
  current,
  isEditable,
  _id,
}) => {
  const { deleteEducation, setSelectedId, openAddEducationModal } =
    useAppBoundStore();

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-2xl ${
        isEditable ? "border p-4" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        {!isEditable ? (
          <div className={boxStyle}>
            <EducationSVG className="" />
          </div>
        ) : null}
        <div>
          <p className={boxtitle}>
            {degree} | {fieldOfStudy}
          </p>
          <p className={boxSubtitle}>{schoolName}</p>
          <p className="text-sm text-gray-500">
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
      </div>
      {isEditable ? (
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => {
              setSelectedId(_id!);
              openAddEducationModal();
            }}
            cls="p-1.5"
          >
            <EditSVG class="w-4" />
          </Button>
          <Button
            cls="p-1.5"
            onClick={() => {
              if (isEditable) {
                toast.promise(deleteEducation(_id!), {
                  loading: "Deleting...",
                  success: "Deleted",
                  error: "Error deleting",
                });
              }
            }}
          >
            <DeleteSVG className="w-4" />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default EducationItem;
