import React, { FC } from "react";
import { Button, Modal } from "@components";

import {
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import { toast } from "react-hot-toast";

interface Props {
  text: string;
  postId: string;
  isOpen: boolean;
  closeModal: () => void;
}

const ShareModal: FC<Props> = ({ text, postId, isOpen, closeModal }) => {
  const url = `https://piqr.xyz/feed/${postId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Share" cls="max-w-lg">
      <div className="flex flex-col items-center justify-center p-5">
        <div className="flex flex-col">
          <p className="font-semibold text-xl text-center">
            {text?.length > 25 ? `${text?.slice(0, 50)}...` : text}
          </p>
        </div>
        <div className="flex gap-5 mt-5">
          <TwitterShareButton url={url} title={text}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <WhatsappShareButton
            url={url}
            title={text?.length > 25 ? `${text?.slice(0, 50)}...` : text}
            separator=":: "
          >
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>
        <div className="flex items-center justify-between border rounded-xl px-3 py-2 mt-7 w-full">
          <p className="text-gray-500 font-semibold w-2/3 truncate">{url}</p>
          <Button onClick={copyLink} cls="ml-5 w-28 h-11 text-sm font-semibold">
            Copy Link
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
