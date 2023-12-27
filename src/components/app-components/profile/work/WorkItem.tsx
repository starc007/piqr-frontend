/* eslint-disable @next/next/no-img-element */
import { DeleteSVG, EditSVG, ExternalLinkSVG } from "@assets";
import { Button, Image, Link } from "@components";
import { useAppBoundStore } from "@store";
import React from "react";
import { toast } from "react-hot-toast";

const WorkItem: React.FC<
  ActivityItemResponse & {
    isEditable: boolean;
  }
> = ({ title, description, collaborators, isEditable, _id, date, link }) => {
  const { deleteActivity, setSelectedId, openAddHighlightModal } =
    useAppBoundStore((state) => ({
      deleteActivity: state.deleteActivity,
      setSelectedId: state.setSelectedId,
      openAddHighlightModal: state.openAddHighlightModal,
    }));

  return (
    <div className=" border border-gray-300 p-4 gap-4 rounded-2xl">
      <div className="flex-1">
        <div className="flex justify-between">
          {link ? (
            <Link
              className="flex items-center space-x-2"
              href={
                link?.startsWith("http") || link?.startsWith("https")
                  ? link
                  : "https://" + link
              }
              target="_blank"
              passHref
            >
              <span className="font-semibold text-lg text-gray-700 hover:underline">
                {title}
              </span>
              <ExternalLinkSVG fill="black" />
            </Link>
          ) : (
            <p className="font-bold text-lg text-gray-700">{title}</p>
          )}
          {isEditable ? (
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => {
                  setSelectedId(_id!);
                  openAddHighlightModal();
                }}
                cls="p-1.5"
              >
                <EditSVG class="w-4" />
              </Button>
              <Button
                cls="p-1.5"
                onClick={() => {
                  if (isEditable) {
                    toast.promise(deleteActivity(_id!), {
                      loading: "Deleting...",
                      success: "Deleted",
                      error: "Error deleting",
                    });
                  }
                }}
              >
                <DeleteSVG className="w-4" />
              </Button>
            </div>
          ) : null}
        </div>
        {date ? (
          <p className="text-xs font-semibold text-gray-600 mt-1">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}
      </div>
      <p
        className={`text-sm text-gray-500 font-medium whitespace-pre-line ${
          date ? "mt-4" : "mt-1"
        }`}
      >
        {description}
      </p>
      {collaborators.length > 0 ? (
        <>
          <p className="mt-4 font-semibold text-gray-600">Collaborators</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {collaborators?.map((item, id) => (
              <Link
                href={`/${item?.username}`}
                target="_blank"
                key={id}
                className={`${id == 0 ? " " : "-ml-4"}`}
              >
                <Image
                  className="object-center object-cover rounded-full w-6 h-6"
                  src={item.avatar}
                  alt=""
                />
                {/* <span className="text-sm text-gray-600 font-medium">
                  @{item.username}
                </span> */}
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default WorkItem;
