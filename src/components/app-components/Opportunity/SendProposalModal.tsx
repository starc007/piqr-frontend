import { Button, Modal, TextArea } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
  closeModal: () => void;
  isOpen: boolean;
  name: string;
  oppId: string;
}

const SendProposalModal: FC<Props> = ({ closeModal, isOpen, name, oppId }) => {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { applyOpportunity, profilePercent } = useAppBoundStore((state) => ({
    applyOpportunity: state.applyOpportunity,
    profilePercent: state.profilePercent,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (profilePercent < 90) {
      return toast.error(
        "Please complete your profile to apply for this opportunity.(90%)"
      );
    }

    if (!message) return toast.error("Please enter your proposal message. ");
    if (!oppId)
      return toast.error("Something went wrong. Please try again later. ");

    setLoading(true);
    await applyOpportunity(oppId, message, closeModal);
    setLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      cls="max-w-xl"
      title={"Send proposal to " + name + ""}
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
            variant="tertiary"
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
