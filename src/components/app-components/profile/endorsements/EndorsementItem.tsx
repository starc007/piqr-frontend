import { Image } from "@components";
import { useRouter } from "next/router";
import React from "react";

const EndorsementItem: React.FC<EndorseTypeResponse> = ({ message, user }) => {
  const router = useRouter();

  const name = user?.name ? user?.name : "Deleted User";
  const username = user?.username ? user?.username : "deleteduser";

  return (
    <div
      onClick={() => {
        if (!user) return;

        router.push(`/${user?.username}`);
      }}
      className={`flex flex-col  border border-gray-200 p-4 gap-4 rounded-2xl hover:bg-gray-50 duration-200 ease-out ${
        !user ? "cursor-default" : "cursor-pointer"
      }`}
    >
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full h-10 w-10 overflow-hidden aspect-square object-cover object-center border"
          src={user?.avatar ? user?.avatar : name}
          alt={name}
        />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-primary/90 text-xs font-medium">@{username}</p>
        </div>
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default EndorsementItem;
