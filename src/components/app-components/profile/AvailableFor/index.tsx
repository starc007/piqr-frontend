import { PlusCircleSVG } from "@assets";
import { Button } from "@components";
import { useAppBoundStore } from "@store";
import { arrayCompare } from "@utils";
const AvailableFor = () => {
  const { user, openSkillnAvailableForModal, dataToUpdate } =
    useAppBoundStore();

  const isCheck = arrayCompare(
    dataToUpdate?.availableFor!,
    user?.availableFor!
  );

  const availableFor = isCheck
    ? user?.availableFor!
    : dataToUpdate?.availableFor! !== undefined
    ? dataToUpdate?.availableFor!
    : user?.availableFor!;

  return (
    <div className="space-y-2 border-t pt-4">
      <p className="font-semibold text-gray-400">Available for</p>
      <div className="flex items-center gap-2 flex-wrap mt-4">
        {availableFor?.map((item) => (
          <p
            key={item}
            className="py-1.5 px-3 text-sm font-medium border rounded-full"
          >
            {item}
          </p>
        ))}
        <Button
          variant="primary"
          cls="px-4 py-2 text-sm gap-1"
          onClick={openSkillnAvailableForModal}
        >
          <PlusCircleSVG className="w-4" /> Add Tag
        </Button>
      </div>
    </div>
  );
};

export default AvailableFor;
