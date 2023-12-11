import { Button, CustomButton, Modal, TextArea } from "@components";
import { useAppBoundStore } from "@store";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  name: string;
  userId: string;
};

const EndorseModal = ({ isOpen, closeModal, name, userId }: Props) => {
  const message = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);

  const { endorseUser } = useAppBoundStore((state) => ({
    endorseUser: state.endorseUser,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const msg = message?.current?.value;
    if (!msg || msg.trim() === "" || msg.trim().length < 1)
      return toast.error("Please type a message");
    setLoading(true);
    const obj = {
      message: msg,
      endorseTo: userId,
    };
    await endorseUser(obj);
    setLoading(false);
    closeModal();
  };

  return (
    <Modal
      title={`Endorse ${name}`}
      isOpen={isOpen}
      closeModal={closeModal}
      cls="max-w-lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex p-4 flex-col gap-4">
          <TextArea
            label="Enter Message"
            labelCls="mb-2"
            rows={4}
            placeholder="Write a message here ..."
            ref={message}
            cls="bg-secondGray border-none"
          />
        </div>
        <hr />
        <div className="flex justify-center gap-4 p-4">
          {/* <Button onClick={closeModal} type="button" variant="secondary">
            Back
          </Button>
          <Button
            isLoading={loading}
            disabled={loading}
            type="submit"
            variant="primary"
          >
            Endorse
          </Button> */}
          <CustomButton
            onClick={closeModal}
            type="button"
            variant="tertiary"
            cls="w-36 text-sm font-medium h-11"
          >
            Back
          </CustomButton>
          <CustomButton
            isLoading={loading}
            disabled={loading}
            type="submit"
            variant="primaryNoOutline"
            cls="w-40 text-sm font-medium h-11"
          >
            Send Message
          </CustomButton>
        </div>
      </form>
    </Modal>
  );
};
export default EndorseModal;
