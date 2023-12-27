import { Image, Link } from "@components";
import React from "react";

const EndorsementItem: React.FC<EndorseTypeResponse> = ({ message, user }) => {
  return (
    <Link
      href={`/${user?.username}`}
      className="flex flex-col  border border-gray-200 p-4 gap-4 rounded-2xl hover:bg-gray-50 duration-200 ease-out"
    >
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full h-10 w-10 overflow-hidden aspect-square object-cover object-center border"
          src={user?.avatar!}
          alt={user?.name!}
        />
        <div>
          <p className="font-medium">{user?.name}</p>
          <p className="text-primary/90 text-xs font-medium">
            @{user?.username}
          </p>
        </div>
      </div>
      <p className="text-sm">{message}</p>
    </Link>
  );
};

export default EndorsementItem;
