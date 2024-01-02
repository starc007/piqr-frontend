import { Button, Input, Modal } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AddEducationModal = () => {
  const {
    addEducation,
    addEducationModal,
    closeAddEducationModal,
    education,
    selectedId,
    updateEducation,
  } = useAppBoundStore((state) => ({
    addEducation: state.addEducation,
    addEducationModal: state.addEducationModal,
    closeAddEducationModal: state.closeAddEducationModal,
    education: state.education,
    selectedId: state.selectedId,
    updateEducation: state.updateEducation,
  }));

  const [formData, setFormData] = useState({
    schoolName: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
  });
  const [loading, setLoading] = useState(false);

  const data = education?.find((item) => item._id === selectedId);

  useEffect(() => {
    if (selectedId) {
      setFormData({
        schoolName: data?.schoolName || "",
        degree: data?.degree || "",
        fieldOfStudy: data?.fieldOfStudy || "",
        from: data?.from || "",
        to: data?.to || "",
        current: data?.current || false,
      });
    }
  }, [selectedId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.schoolName ||
      !formData.degree ||
      !formData.fieldOfStudy ||
      !formData.from
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!formData.current) {
      if (!formData.to) {
        toast.error("Please fill all the fields");
        return;
      }
    }
    setLoading(true);
    await addEducation(formData);
    setLoading(false);
    setFormData({
      schoolName: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.schoolName ||
      !formData.degree ||
      !formData.fieldOfStudy ||
      !formData.from
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!formData.current) {
      if (!formData.to) {
        toast.error("Please fill all the fields");
        return;
      }
    }
    const dataToUpdate: Partial<EducationType> = {};

    if (formData.schoolName !== data?.schoolName)
      dataToUpdate.schoolName = formData.schoolName;
    if (formData.degree !== data?.degree) dataToUpdate.degree = formData.degree;
    if (formData.fieldOfStudy !== data?.fieldOfStudy)
      dataToUpdate.fieldOfStudy = formData.fieldOfStudy;
    if (formData.from !== data?.from) dataToUpdate.from = formData.from;
    if (formData.to !== data?.to) dataToUpdate.to = formData.to;
    if (formData.current !== data?.current)
      dataToUpdate.current = formData.current;

    if (Object.keys(dataToUpdate).length === 0) {
      closeAddEducationModal();
      return;
    }
    setLoading(true);
    await updateEducation(dataToUpdate, selectedId!);
    setLoading(false);
    setFormData({
      schoolName: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      current: false,
    });
  };

  return (
    <Modal
      title="Add Education"
      isOpen={addEducationModal}
      closeModal={closeAddEducationModal}
      cls="max-w-2xl"
    >
      <form onSubmit={selectedId ? handleUpdate : handleSubmit}>
        <div className="flex p-4 flex-col gap-6">
          <Input
            label="Institute Name"
            isRequired
            placeholder="Enter your institute Name"
            onChange={(e) =>
              setFormData({ ...formData, schoolName: e.target.value })
            }
            value={formData.schoolName}
          />
          <div className="flex max-sm:flex-wrap gap-6">
            <Input
              label="Degree"
              isRequired
              placeholder="Enter degree"
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
              value={formData.degree}
            />
            <Input
              label="Field of study"
              isRequired
              placeholder="Enter field of study"
              onChange={(e) =>
                setFormData({ ...formData, fieldOfStudy: e.target.value })
              }
              value={formData.fieldOfStudy}
            />
          </div>
          <div className="flex max-sm:flex-wrap gap-6">
            <Input
              label="Starting Date"
              type="date"
              isRequired
              onChange={(e) =>
                setFormData({ ...formData, from: e.target.value })
              }
              value={
                formData.from
                  ? new Date(formData.from).toISOString().substr(0, 10)
                  : ""
              }
            />
            <Input
              label="Ending Date"
              type="date"
              disabled={formData.current}
              cls={formData.current ? "bg-gray-100" : ""}
              value={
                formData.to
                  ? new Date(formData.to).toISOString().substr(0, 10)
                  : ""
              }
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="current"
              className={`text-gray-500 text-sm font-medium `}
            >
              Are you still studying ?
            </label>
            <div className="flex max-sm:flex-wrap gap-4">
              <label className="flex items-center gap-4">
                Yes
                <input
                  name="current"
                  type="radio"
                  value="yes"
                  onChange={() => setFormData({ ...formData, current: true })}
                  checked={formData.current}
                />
              </label>
              <label className="flex items-center gap-4">
                No
                <input
                  name="current"
                  type="radio"
                  value="no"
                  onChange={() => setFormData({ ...formData, current: false })}
                  checked={!formData.current}
                />
              </label>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-center gap-4 p-4">
          <Button
            onClick={closeAddEducationModal}
            type="button"
            variant="default"
            cls="w-36 text-sm font-medium h-11"
          >
            Back
          </Button>
          <Button
            isLoading={loading}
            disabled={loading}
            variant="primaryNoOutline"
            type="submit"
            cls="w-40 text-sm font-medium h-11"
          >
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEducationModal;
