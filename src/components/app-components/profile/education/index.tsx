import { useAppBoundStore } from "@store";
import React from "react";
import EducationItem from "./EducationItem";

type Props = {
  isEditable: boolean;
  education?: EducationType[];
};

const Educations = (props: Props) => {
  const education = props.education;
  return (
    <div
      className={`
      space-y-4 mt-4`}
    >
      {education?.map((item, id) => (
        <EducationItem key={id} {...item} isEditable={props.isEditable} />
      ))}
      {education?.length === 0 && (
        <div className="flex justify-center mt-10">
          <p className="text-gray-500">No Education</p>
        </div>
      )}
    </div>
  );
};

export default Educations;
