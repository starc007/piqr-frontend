import { Button, Input, Modal, TextArea } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AddPositionModal = () => {
  const {
    addPositionModal,
    closeAddPositionModal,
    addWorkExperience,
    selectedId,
    updateWorkExperience,
    workExp,
  } = useAppBoundStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    location: "",
    description: "",
    from: "",
    to: "",
    current: false,
  });

  const data = workExp?.find((item) => item._id === selectedId);

  useEffect(() => {
    if (selectedId) {
      setFormData({
        companyName: data?.companyName || "",
        position: data?.position || "",
        location: data?.location || "",
        description: data?.description || "",
        from: data?.from || "",
        to: data?.to || "",
        current: data?.current || false,
      });
    }
  }, [selectedId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.companyName ||
      !formData.position ||
      !formData.location ||
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
    await addWorkExperience(formData);
    setLoading(false);
    setFormData({
      companyName: "",
      position: "",
      location: "",
      description: "",
      from: "",
      to: "",
      current: false,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.companyName ||
      !formData.position ||
      !formData.location ||
      !formData.from ||
      !formData.description
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

    const dataToUpdate: Partial<WorkExperienceType> = {};

    if (formData.companyName !== data?.companyName)
      dataToUpdate.companyName = formData.companyName;
    if (formData.position !== data?.position)
      dataToUpdate.position = formData.position;
    if (formData.location !== data?.location)
      dataToUpdate.location = formData.location;
    if (formData.description !== data?.description)
      dataToUpdate.description = formData.description;
    if (formData.from !== data?.from) dataToUpdate.from = formData.from;
    if (formData.to !== data?.to && data?.current === false)
      dataToUpdate.to = formData.to;

    if (formData.current !== data?.current)
      dataToUpdate.current = formData.current;

    if (Object.keys(dataToUpdate).length === 0) {
      closeAddPositionModal();
      return;
    }
    setLoading(true);
    await updateWorkExperience(formData, selectedId!);
    setLoading(false);
    setFormData({
      companyName: "",
      position: "",
      location: "",
      description: "",
      from: "",
      to: "",
      current: false,
    });
  };

  return (
    <Modal
      title="Add Position"
      isOpen={addPositionModal}
      closeModal={closeAddPositionModal}
      cls="max-w-2xl"
    >
      <form onSubmit={selectedId ? handleUpdate : handleSubmit}>
        <div className="flex p-4 flex-col gap-4">
          <Input
            label="Company Name"
            isRequired
            placeholder="Enter your company Name"
            onChange={(e) =>
              setFormData({ ...formData, companyName: e.target.value })
            }
            value={formData.companyName}
          />
          <div className="flex max-sm:flex-wrap gap-4">
            <Input
              label="Position"
              isRequired
              placeholder="Enter your Postion"
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
              value={formData.position}
            />
            <Input
              label="Location"
              isRequired
              placeholder="Enter company Location"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              value={formData.location}
            />
          </div>
          <TextArea
            label="Description"
            isRequired
            placeholder="Enter your description (Try to make it bullet points)"
            rows={2}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
          />
          <div className="flex max-sm:flex-wrap gap-4">
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
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              disabled={formData.current}
              cls={formData.current ? "bg-gray-100" : ""}
              value={
                formData.to
                  ? new Date(formData.to).toISOString().substr(0, 10)
                  : ""
              }
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="current"
              className={`text-gray-500 text-sm font-medium `}
            >
              Are you still working ?
            </label>
            <div className="flex gap-4">
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
            onClick={closeAddPositionModal}
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

export default AddPositionModal;
