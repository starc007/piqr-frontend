import { CustomButton, Modal } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { urlify } from "@utils";
import React, { FC, useState } from "react";

interface Props {
  closeModal: () => void;
  isOpen: boolean;
  name: string;
  proposalText: string;
  oppId: string;
  applicantId: string;
}

const ProposalViewModal: FC<Props> = ({
  isOpen,
  closeModal,
  name,
  proposalText,
  oppId,
  applicantId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rejectLoading, setRejectLoading] = useState<boolean>(false);

  const { acceptOrReject } = useAppBoundStore((state) => ({
    acceptOrReject: state.acceptOrReject,
  }));

  const handleSubmit = async (status: string) => {
    if (!applicantId || !oppId || !status) return;

    if (status === "rejected") setRejectLoading(true);
    else setLoading(true);
    await acceptOrReject(oppId, applicantId, status, closeModal);
    if (status === "rejected") setRejectLoading(false);
    else setLoading(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      cls="max-w-xl"
      title={`${name}'s Proposal`}
    >
      <>
        <div className="flex p-4 flex-col gap-4">
          <p
            id="editor-text"
            className="bg-secondGray whitespace-pre-line text-sm text-gray-600 p-4 rounded-2xl"
            dangerouslySetInnerHTML={{ __html: urlify(proposalText as string) }}
          />
        </div>
        <hr />
        <div className="flex justify-center gap-4 p-4">
          <CustomButton
            onClick={() => handleSubmit("rejected")}
            type="button"
            variant="tertiary"
            cls="w-36 text-sm font-medium h-11"
            isLoading={rejectLoading}
            loaderColor="text-secondary"
            disabled={rejectLoading || loading}
          >
            Reject
          </CustomButton>
          <CustomButton
            isLoading={loading}
            disabled={loading || rejectLoading}
            type="submit"
            variant="primaryNoOutline"
            cls="w-40 text-sm font-medium h-11"
            onClick={() => handleSubmit("accepted")}
          >
            Accept
          </CustomButton>
        </div>
      </>
    </Modal>
  );
};

export default ProposalViewModal;
