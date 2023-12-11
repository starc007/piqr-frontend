import { Button, CustomButton, Modal, TextArea } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { CHAT_CONST } from "@utils";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  name: string;
  userId: string;
};

const SendMessageModal = ({ isOpen, closeModal, name, userId }: Props) => {
  const { sendMessage } = useAppBoundStore((state) => ({
    sendMessage: state.sendMessage,
  }));
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;
    if (!message) return toast.error("Enter a message");
    const obj = {
      message: message,
      uid: userId,
    };
    setLoading(true);
    await sendMessage(obj);
    setLoading(false);
    closeModal();
    setMessage("");
    toast.success("Message sent");
  };
  return (
    <Modal
      title={`Send message to ${name}`}
      isOpen={isOpen}
      closeModal={closeModal}
      cls="max-w-lg"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex p-4 flex-col gap-4">
          <TextArea
            label="Enter Message"
            labelCls="mb-2"
            rows={3}
            placeholder={`Hi ${name}, `}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            cls="bg-secondGray border-none"
          />
        </div>
        <hr />
        <div className="flex justify-center gap-4 p-4">
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

export default SendMessageModal;
