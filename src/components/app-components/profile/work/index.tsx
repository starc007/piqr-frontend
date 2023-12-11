import { useAppBoundStore } from "@store/mainStore";
import React from "react";
import WorkItem from "./WorkItem";

type Props = {
  isEditable: boolean;
  activity?: ActivityItemResponse[];
};

const Highlight = (props: Props) => {
  const { isEditable } = props;
  const activity = props.activity;

  return (
    <div
      className={`
      space-y-4
      ${props.isEditable && "mt-4"}`}
    >
      {activity?.map((item, id) => (
        <WorkItem key={id} {...item} isEditable={isEditable} />
      ))}

      {activity?.length === 0 && (
        <div className="flex justify-center mt-10">
          <p className="text-gray-500">No Highlights</p>
        </div>
      )}
    </div>
  );
};

export default Highlight;
