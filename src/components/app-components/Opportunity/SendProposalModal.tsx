import { Button, Modal, TextArea } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  closeModal: () => void;
  isOpen: boolean;
  name: string;
  jobId: string;
}

const SendProposalModal: FC<Props> = ({ closeModal, isOpen, name, jobId }) => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { applyForJob } = useAppBoundStore((state) => ({
    applyForJob: state.applyForJob,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return toast.error("Please enter your proposal message. ");
    if (!jobId)
      return toast.error("Something went wrong. Please try again later. ");

    setLoading(true);
    await applyForJob(
      {
        jobId,
        whyGoodFit: message,
      },
      closeModal
    );
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      cls="max-w-xl"
      title={"Apply to " + name + ""}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex p-4 flex-col gap-4">
          <TextArea
            rows={5}
            placeholder={`Why you are the best fit for this opportunity.`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            cls="bg-secondGray border-none !focus:ring-0 focus:outline-none"
          />
        </div>
        <hr />
        <div className="flex justify-center gap-4 p-4">
          <Button
            onClick={closeModal}
            type="button"
            cls="w-36 text-sm font-medium h-11"
          >
            Back
          </Button>
          <Button
            isLoading={loading}
            disabled={loading}
            type="submit"
            variant="primaryNoOutline"
            cls="w-40 text-sm font-medium h-11"
          >
            Apply
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default SendProposalModal;
