import { PlusCircleSVG } from "@assets";
import { Button, CustomButton } from "@components";
import { useAppBoundStore } from "@store";
import { arrayCompare } from "@utils";

const Skills = () => {
  const { user, openSkillnAvailableForModal, dataToUpdate } =
    useAppBoundStore();

  const isCheck = arrayCompare(dataToUpdate?.skills!, user?.skills!);

  const skills = isCheck
    ? user?.skills!
    : dataToUpdate?.skills! !== undefined
    ? dataToUpdate?.skills!
    : user?.skills!;

  return (
    <div className="space-y-2">
      <p className="font-semibold text-gray-400">Skills</p>

      <div className="flex items-center  gap-2 flex-wrap mt-4">
        {skills?.map((item) => (
          <p
            key={item}
            className="py-1.5 px-3 text-sm font-medium border rounded-full"
          >
            {item}
          </p>
        ))}
        <CustomButton
          variant="primaryNoOutline"
          cls="px-4 py-1.5 text-sm gap-1"
          onClick={openSkillnAvailableForModal}
        >
          <PlusCircleSVG /> Add Skill
        </CustomButton>
      </div>
    </div>
  );
};

export default Skills;
