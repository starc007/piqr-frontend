import Educations from "../education";
import EducationItem from "../education/EducationItem";
import PositionItem from "./PositionItem";
import PreviewPosition from "./PreviewPosition";

type Props = {
  isEditable?: boolean;
  workExp?: WorkExperienceType[];
  education?: EducationType[];
};

const Positions = (props: Props) => {
  const workExp = props.workExp;
  const sortedWorkExp = workExp?.sort((a, b) => {
    return new Date(b.from).getTime() - new Date(a.from).getTime();
  });

  const education = props.education;
  const sortedEducation = education?.sort((a, b) => {
    return new Date(b.from).getTime() - new Date(a.from).getTime();
  });

  return (
    <>
      <p className="font-medium mt-5">Work Experience</p>
      <div
        className={`${
          props.isEditable ? "mt-4 " : "mt-4"
        } border-b pb-4 space-y-8`}
      >
        {props.isEditable
          ? sortedWorkExp?.map((item, id) => (
              <PreviewPosition key={id} {...item} />
            ))
          : sortedWorkExp?.map((item, id) => {
              return (
                <PositionItem
                  key={item._id}
                  {...item}
                  isLastItem={id === sortedWorkExp.length - 1}
                />
              );
            })}

        {workExp?.length === 0 && (
          <div className="flex justify-center mt-10">
            <p className="text-gray-500">No Work Experience</p>
          </div>
        )}
      </div>
      <p className="font-medium mt-5">Education</p>
      <Educations
        isEditable={props.isEditable as boolean}
        education={sortedEducation}
      />
    </>
  );
};

export default Positions;
