import { urlify } from "@utils";
import React, { FC } from "react";
import Endorsements from "../endorsements";
import { Badge } from "@components";

type Props = {
  bio: string;
  availableFor: string[];
  skills: string[];
  endorsements: any;
};

const skillCls =
  "py-1.5 px-4 text-sm font-medium text-gray-800 border border-gray-200 duration-200 ease-out rounded-full cursor-pointer";

const About: FC<Props> = ({ bio, availableFor, skills, endorsements }) => {
  return (
    <div>
      <p
        className="text-dark mt-4 whitespace-pre-line"
        id="editor-text"
        dangerouslySetInnerHTML={{
          __html: urlify(bio),
        }}
      ></p>
      <h6 className="font-medium text-gray-500 mt-6">Available for</h6>
      <div className="flex gap-2 flex-wrap mt-2">
        {availableFor?.map((item) => (
          <Badge
            key={item}
            text={item}
            cls="rounded-full px-4 py-1.5 text-sm"
          />
        ))}
      </div>
      {skills.length > 0 ? (
        <>
          <h6 className="font-medium text-gray-500 mt-6">Skills</h6>
          <div className="flex gap-2 flex-wrap mt-4">
            {skills?.map((item) => (
              <p key={item} className={skillCls}>
                {item}
              </p>
            ))}
          </div>
        </>
      ) : null}

      <h6 className="font-medium text-gray-500 mt-6 mb-4">Endorsements</h6>

      <Endorsements endorsements={endorsements} />
    </div>
  );
};

export default About;
