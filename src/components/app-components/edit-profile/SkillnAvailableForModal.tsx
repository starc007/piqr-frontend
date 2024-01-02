import { Button, Modal, Select } from "@components";
import { SKILLS, AVAILABLE_FOR } from "@utils";
import { useAppBoundStore } from "@store/mainStore";
import { arrayCompare } from "@utils";

interface FormProps {
  skills: {
    label: string;
    value: string;
  }[];
  availableFor: {
    label: string;
    value: string;
  }[];
}

const SkillnAvailableForModal = () => {
  const {
    skillnAvailableForModal,
    closeSkillnAvailableForModal,
    user,
    setDatatoUpdate,
    dataToUpdate,
  } = useAppBoundStore();

  const availableForCheck = arrayCompare(
    dataToUpdate?.availableFor!,
    user?.availableFor!
  );

  const availableFor = availableForCheck
    ? user?.availableFor!
    : dataToUpdate?.availableFor! !== undefined
    ? dataToUpdate?.availableFor!
    : user?.availableFor!;

  const skillsCheck = arrayCompare(dataToUpdate?.skills!, user?.skills!);

  const skills = skillsCheck
    ? user?.skills!
    : dataToUpdate?.skills! !== undefined
    ? dataToUpdate?.skills!
    : user?.skills!;

  return (
    <Modal
      title="Add Details"
      isOpen={skillnAvailableForModal}
      closeModal={closeSkillnAvailableForModal}
      cls="max-w-lg overflow-visible"
    >
      <div className="p-4">
        <Select
          isMulti
          options={SKILLS.map((item) => ({ label: item, value: item }))}
          label="Skills"
          isCreatable
          onChange={(e: any) => {
            // setFormData({ ...formData, skills: e });
            setDatatoUpdate({
              ...dataToUpdate,
              skills: e.map((item: any) => item.value),
            });
          }}
          defaultValue={skills?.map((item) => ({ label: item, value: item }))}
        />
        <Select
          isMulti
          options={AVAILABLE_FOR.map((item) => ({ label: item, value: item }))}
          label="Available for"
          labelCls="mt-6"
          isCreatable
          onChange={(e: any) => {
            // setFormData({ ...formData, availableFor: e });
            setDatatoUpdate({
              ...dataToUpdate,
              availableFor: e.map((item: any) => item.value),
            });
          }}
          defaultValue={availableFor?.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>
      <hr className="col-span-3" />
      <div className="flex justify-center gap-4 p-4">
        <Button
          onClick={closeSkillnAvailableForModal}
          type="button"
          variant="default"
          cls="w-36 text-sm font-medium h-11"
        >
          Back
        </Button>
        <Button
          onClick={closeSkillnAvailableForModal}
          variant="primaryNoOutline"
          cls="w-40 text-sm font-medium h-11"
        >
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default SkillnAvailableForModal;
