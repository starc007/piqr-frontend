import { CustomButton, Modal } from "@components";
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import React, { FC } from "react";
import { toast } from "react-hot-toast";

interface Props {
  text: string;
  oppId: string;
  isOpen: boolean;
  closeModal: () => void;
}

const ReferToFriend: FC<Props> = ({ text, oppId, isOpen, closeModal }) => {
  const url = `www.sanchar.xyz/jobs?type=open&id=${oppId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  const txt = `Hey,\nI just found this opportunity on Sanchar 😉. Apply now!! @sanchar_hq`;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Refer" cls="max-w-lg">
      <div className="flex flex-col items-center justify-center p-5">
        <div className="flex flex-col">
          <p>Share this opportunity with your friends</p>
          <p className="font-semibold text-xl text-center mt-2">
            {text?.length > 25 ? `${text?.slice(0, 50)}...` : text}
          </p>
        </div>
        <div className="flex gap-5 mt-5">
          <TwitterShareButton url={url} title={txt}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={url} title={txt} separator=":: ">
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>
        <div className="flex items-center justify-between border rounded-xl px-3 py-2 mt-7 w-full">
          <p className="text-gray-500 font-semibold w-2/3 truncate">{url}</p>
          <CustomButton
            onClick={copyLink}
            cls="ml-5 w-32 bg-primary/10 text-primary h-11 text-sm font-semibold rounded-2xl"
          >
            Copy Link
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
};

export default ReferToFriend;
