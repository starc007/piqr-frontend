/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { __getUsersbyUsername } from "@api/api";
import { Button, CustomButton, Input, Modal, TextArea } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { arrayCompare, debounce } from "@utils";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AsyncSelect from "react-select/async";

const AddHighlightModal = () => {
  const {
    addHighlightModal,
    closeAddHighlightModal,
    addActivity,
    activity,
    selectedId,
    updateActivity,
  } = useAppBoundStore((state) => ({
    addHighlightModal: state.addHighlightModal,
    closeAddHighlightModal: state.closeAddHighlightModal,
    addActivity: state.addActivity,
    activity: state.activity,
    selectedId: state.selectedId,
    updateActivity: state.updateActivity,
  }));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    collaborators: [] as readonly any[],
    date: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchUsers, setSearchUsers] = useState<any>([]);

  const data = activity?.find((item) => item._id === selectedId);

  useEffect(() => {
    if (selectedId) {
      setFormData({
        title: data?.title || "",
        description: data?.description || "",
        collaborators:
          data?.collaborators.map((item) => ({
            value: item._id,
            label: item.username,
            image: item.avatar,
          })) || ([] as readonly any[]),
        date: data?.date || "",
        link: data?.link || "",
      });
    }
  }, [selectedId]);

  const getData = (inputValue: string, callback: any) => {
    __getUsersbyUsername({
      username: inputValue,
    }).then((res) => {
      const dataFilter = res?.data?.users?.map((item: any) => ({
        value: item._id,
        label: item.username,
        image: item.avatar,
      }));
      callback(dataFilter);
    });
  };

  const debouncedLoadOptions = debounce(getData, 500);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.description)
      return toast.error("Please fill all the required fields!!");

    const collaborators = formData.collaborators.map((item) => item.value);
    const data = {
      ...formData,
      collaborators,
    };
    setLoading(true);
    await addActivity(data);
    setLoading(false);
    setFormData({
      title: "",
      description: "",
      collaborators: [] as readonly any[],
      date: "",
      link: "",
    });
  };

  const isDisabled = !formData.title || !formData.description;

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.description)
      return toast.error("Please fill all the required fields!!");
    const dataToUpdate: Partial<ActivityType> = {};
    if (formData.title !== data?.title) dataToUpdate.title = formData.title;
    if (formData.description !== data?.description)
      dataToUpdate.description = formData.description;
    if (formData.date !== data?.date) dataToUpdate.date = formData.date;
    if (formData.link !== data?.link) dataToUpdate.link = formData.link;
    const collaborators = formData.collaborators.map((item) => item.value);
    if (data!.collaborators.length > 0) {
      const res = data?.collaborators?.map((item) => item._id);
      const isSame = arrayCompare(res!, collaborators);
      if (!isSame) dataToUpdate.collaborators = collaborators;
    } else {
      dataToUpdate.collaborators = collaborators;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      closeAddHighlightModal();
      return;
    }
    setLoading(true);
    await updateActivity(dataToUpdate, selectedId!);
    setLoading(false);
    setFormData({
      title: "",
      description: "",
      collaborators: [] as readonly any[],
      date: "",
      link: "",
    });
  };

  return (
    <Modal
      title="Add Highlight"
      isOpen={addHighlightModal}
      closeModal={closeAddHighlightModal}
      cls="max-w-lg"
    >
      <form onSubmit={selectedId ? handleUpdate : handleSubmit}>
        <div className="flex p-4 flex-col gap-4">
          <Input
            label="Title"
            placeholder="Enter title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
            isRequired
          />
          <TextArea
            label="Description"
            rows={3}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
            isRequired
            placeholder="Enter description"
          />
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-500">
              Select Users
            </label>
            <AsyncSelect
              isMulti
              cacheOptions
              placeholder="Type username..."
              maxMenuHeight={150}
              className="text-sm mt-1"
              loadOptions={debouncedLoadOptions}
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.375rem",
                  "&:focus": {
                    boxShadow: "none",
                    outline: "none",
                  },
                  "&:hover": {
                    border: "1px solid #e2e8f0",
                  },
                  minHeight: "40px",
                  background: "none",
                }),
                indicatorSeparator: (state) => ({
                  display: "none",
                }),
              }}
              theme={(theme) => {
                return {
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "#2E98FB",
                    primary25: "#D8EAFF",
                  },
                };
              }}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  collaborators: e,
                });
              }}
              formatOptionLabel={(option) => (
                <div className="flex items-center">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={option.image}
                    alt="profile"
                  />
                  <p className="ml-2 text-sm">{option.label}</p>
                </div>
              )}
              value={formData.collaborators}
            />
          </div>
          <Input
            label="Link"
            placeholder="https://example.com"
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            value={formData.link}
          />
          <Input
            label="Date"
            type="date"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            value={
              formData.date
                ? new Date(formData.date).toISOString().substr(0, 10)
                : ""
            }
          />
        </div>
        <hr />

        <div className="flex justify-center gap-4 p-4">
          <CustomButton
            onClick={closeAddHighlightModal}
            type="button"
            variant="tertiary"
            cls="w-36 text-sm font-medium h-11"
          >
            Back
          </CustomButton>
          <CustomButton
            isLoading={loading}
            disabled={(isDisabled && !selectedId) || loading}
            variant="primaryNoOutline"
            type="submit"
            cls="w-40 text-sm font-medium h-11"
          >
            Add
          </CustomButton>
        </div>
      </form>
    </Modal>
  );
};

export default AddHighlightModal;
