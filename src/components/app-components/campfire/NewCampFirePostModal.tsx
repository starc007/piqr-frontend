/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Button, Image, Modal, Select, TextArea } from "@components";
import { TAGS } from "@utils";
import { toast } from "react-hot-toast";
import { useAppBoundStore } from "@store";

import { PictureSVG, deleteIcon } from "@assets/index";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const NewCampFirePostModal = ({ isOpen, closeModal }: Props) => {
  const [formData, setFormData] = useState({
    description: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string[]>([]);

  const { createNewPost } = useAppBoundStore((state) => ({
    createNewPost: state.createNewPost,
  }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.description)
      return toast.error("Please fill all the required fields");

    if (image.length > 2) return toast.error("You can upload maximum 2 images");

    const FileformData = new FormData();
    FileformData.append("description", formData.description);
    FileformData.append("tags", JSON.stringify(formData.tags));

    for (let i = 0; i < image.length; i++) {
      FileformData.append("imageToPost", image[i]);
    }

    setLoading(true);
    createNewPost(FileformData).then((res) => {
      setLoading(false);
      closeModal();
      setFormData({
        description: "",
        tags: [],
      });
      setImage([]);
    });
  };

  const handleImageChange = (e: any) => {
    const files = e.target.files;
    if (files.length > 2) {
      toast.error("You can upload maximum 2 images");
      return;
    }
    const selectedFiles: string[] = [];

    for (let i = 0; i < files.length; i++) {
      selectedFiles.push(files[i]);
    }

    setImage([...image, ...selectedFiles]);
  };

  return (
    <Modal
      title="Post"
      isOpen={isOpen}
      closeModal={closeModal}
      cls="max-w-2xl overflow-auto"
    >
      <form onSubmit={handleSubmit} className="p-3 space-y-4 pb-10 md:pb-5">
        <TextArea
          placeholder="What's on your mind?"
          isRequired
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={7}
          cls="bg-secondGray border-none"
        />

        <Select
          placeholder="Add tags related to your post (Max 4)"
          options={TAGS.map((item) => {
            return { label: item, value: item };
          })}
          isRequired
          isMulti
          placement="top"
          isCreatable
          onChange={(e: any) => {
            if (e.length < 4) {
              setFormData({
                ...formData,
                tags: e.map((item: any) => item.value),
              });
            }
          }}
        />

        {image.length > 0 && (
          <div className="overflow-x-auto hide__scrollbar">
            <div className="flex gap-4 h-56 w-max">
              {image?.map((item, index) => (
                <div key={index} className="border w-56 h-full relative">
                  <Image
                    src={
                      typeof item === "string"
                        ? item
                        : URL.createObjectURL(item)
                    }
                    alt="image"
                    className="w-full h-full object-contain"
                  />
                  <div
                    className="absolute top-0 right-0 cursor-pointer rounded-full bg-white p-1"
                    onClick={() => {
                      const filtered = image.filter((_, i) => i !== index);
                      setImage(filtered);
                    }}
                  >
                    <Image src={deleteIcon.src} className="w-5" alt="del" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="m-2 flex items-center justify-between gap-5">
          <div className="relative overflow-hidden flex items-center gap-2">
            <div className="bg-gray-100 p-2 rounded-full w-10 ">
              <PictureSVG />
            </div>
            <span className="text-sm text-gray-500">
              Max(2 images you can uplaod)
            </span>
            <input
              type="file"
              accept="image/*"
              name="image"
              className="absolute inset-0 opacity-0 text-transparent bg-transparent border-0"
              multiple={true}
              onChange={handleImageChange}
            />{" "}
          </div>
          <Button
            type="submit"
            isLoading={loading}
            variant="primary"
            disabled={loading || !formData.description}
            cls="w-24 h-11"
          >
            Post
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewCampFirePostModal;
