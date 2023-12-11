/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import { Image, Link } from "@components";

interface Props {
  profiles: {
    username: string;
    count: number;
    avatar: string;
  }[];
}

const cmnStyle =
  "hover:shadow-[0px_0px_0px_3px_rgba(255,255,255,1)] rounded-full hover:scale-105 transition-all duration-200 ease-in-out md:w-20 md:h-20 w-16 h-16";

const ShowProfile: FC<Props> = ({ profiles }) => {
  return (
    <div className="flex lg:flex-row flex-col items-center lg:items-start gap-x-9 md:mt-0 mt-6">
      <div className="flex lg:flex-col flex-row lg:gap-7 gap-5 lg:-mt-8">
        {profiles?.slice(0, 6)?.map((profile) => (
          <Link
            key={profile.username}
            href={`/${profile.username}`}
            className={cmnStyle}
          >
            <img
              src={profile.avatar}
              alt={profile.username}
              className="rounded-full w-full h-full object-cover object-center"
            />
          </Link>
        ))}
      </div>
      <div className="flex lg:flex-col flex-row lg:gap-7 gap-5 py-5">
        {profiles?.slice(6, 11)?.map((profile) => (
          <Link
            key={profile.username}
            href={`/${profile.username}`}
            className={cmnStyle}
          >
            <img
              src={profile.avatar}
              alt={profile.username}
              className="rounded-full w-full h-full object-cover object-center"
            />
          </Link>
        ))}
      </div>
      <div className="flex lg:flex-col flex-row lg:gap-7 gap-5 lg:-mt-8">
        {profiles?.slice(12, 18)?.map((profile) => (
          <Link
            key={profile.username}
            href={`/${profile.username}`}
            className={cmnStyle}
          >
            <img
              src={profile.avatar}
              alt={profile.username}
              className="rounded-full w-full h-full object-cover object-center"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShowProfile;
