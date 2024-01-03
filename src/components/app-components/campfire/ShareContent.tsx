import { LinkTilted, LinkedinSVG, ShareSVG, TwitterSVG } from "@assets/index";
import {
  Dropdown,
  DropdownButton,
  DropdownContent,
  DropdownItem,
} from "@components/Dropdown";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";

const ShareContent = ({ name, _id }: { name: string; _id: string }) => {
  const textToPost = `${name} Posted on Piqr`;
  const footerText = `\n\nJoin Piqr now to get more posts from ${name} https://piqr.in`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${textToPost}&url=https://piqr.in/feed/${_id} ${footerText}`;

  //www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fpiqr.in%2Ffeed%2F650ece508bf00506237d5032&mini=true
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite?url=https://piqr.in/feed/${_id}&mini=true`;

  const copyLink = () => {
    navigator.clipboard.writeText(`https://piqr.in/feed/${_id}`);
    toast.success("Link copied");
  };

  return (
    <Dropdown>
      <DropdownButton cls="z-0">
        <ShareSVG className="w-5 text-gray-500 hover:text-primary" />
      </DropdownButton>
      <DropdownContent cls="w-36 py-2 mt-4 z-10 top-6 bg-white shadow-xl">
        <DropdownItem className="hover:bg-gray-100 w-full text-sm ">
          <Link
            href={twitterUrl}
            target="_blank"
            className="flex items-center gap-2"
          >
            {/* <TwitterIcon size={25} round /> <span>Twitter</span> */}
            <TwitterSVG /> <span>Twitter</span>
          </Link>
        </DropdownItem>
        <DropdownItem className="hover:bg-gray-100 w-full text-sm">
          <Link
            href={linkedinUrl}
            target="_blank"
            className="flex items-center gap-2 "
          >
            <LinkedinSVG className="w-6" /> <span>Linkedin</span>
          </Link>
        </DropdownItem>
        <DropdownItem
          onClick={copyLink}
          className="hover:bg-gray-100 w-full text-sm flex items-center gap-2"
        >
          <LinkTilted className="w-5" />
          <span>Copy URL</span>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

export default ShareContent;
