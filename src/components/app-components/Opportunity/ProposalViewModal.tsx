import { Button, Modal } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { urlify } from "@utils";
import React, { FC, useState } from "react";

interface Props {
  closeModal: () => void;
  isOpen: boolean;
  proposalText: string;
  jobId: string;
  applicantId: string;
}

const ProposalViewModal: FC<Props> = ({
  isOpen,
  closeModal,
  proposalText,
  jobId,
  applicantId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [rejectLoading, setRejectLoading] = useState<boolean>(false);

  // const { acceptOrReject } = useAppBoundStore((state) => ({
  //   acceptOrReject: state.acceptOrReject,
  // }));

  const handleSubmit = async (status: string) => {
    if (!applicantId || !jobId || !status) return;

    if (status === "rejected") setRejectLoading(true);
    else setLoading(true);
    // await acceptOrReject(oppId, applicantId, status, closeModal);
    if (status === "rejected") setRejectLoading(false);
    else setLoading(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      cls="max-w-xl"
      title="Proposal"
    >
      <>
        <div className="flex px-3 pb-3 flex-col gap-4">
          <p
            id="editor-text"
            className="bg-secondGray whitespace-pre-line text-sm text-gray-600 p-4 rounded-lg"
            dangerouslySetInnerHTML={{ __html: urlify(proposalText as string) }}
          />
        </div>
        <hr />
        <div className="flex justify-center gap-4 p-4">
          <Button
            onClick={() => handleSubmit("rejected")}
            cls="w-36 text-sm font-medium h-11"
            isLoading={rejectLoading}
            loaderColor="text-dark"
            disabled={rejectLoading || loading}
          >
            Reject
          </Button>
          <Button
            isLoading={loading}
            disabled={loading || rejectLoading}
            type="submit"
            variant="primary"
            cls="w-40 text-sm font-medium h-11"
            onClick={() => handleSubmit("accepted")}
          >
            Accept
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default ProposalViewModal;
