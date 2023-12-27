/* eslint-disable @next/next/no-img-element */
import { CustomButton, Image, Link } from "@components";
import React from "react";
import ProposalViewModal from "./ProposalViewModal";

const ProposalCard = ({
  item,
  oppId,
}: {
  item: ApplicationProps;
  oppId: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const appliedByDetails = item?.appliedBy as ProfileResponse;

  return (
    <>
      <div className="flex items-center justify-between gap-4 py-3 px-2">
        <div className="flex items-center gap-4">
          <Image
            src={appliedByDetails?.avatar}
            alt="profile"
            className="rounded-xl h-11 w-11"
          />
          <div className="flex flex-col">
            <Link
              href={`/${appliedByDetails?.username}`}
              className="font-medium text-dark"
            >
              {appliedByDetails?.name}
            </Link>
            <p className="text-xs text-gray-500 truncate w-40">
              {item?.proposal}
            </p>
          </div>
        </div>
        <CustomButton
          onClick={() => setIsOpen(true)}
          cls="w-14 h-8 border rounded-lg text-sm font-medium"
        >
          view
        </CustomButton>
      </div>
      {isOpen && (
        <ProposalViewModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          name={appliedByDetails?.name}
          proposalText={item?.proposal as string}
          applicantId={item?._id as string}
          oppId={oppId}
        />
      )}
    </>
  );
};

export default ProposalCard;
