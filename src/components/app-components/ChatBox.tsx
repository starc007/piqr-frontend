import React, { FC } from "react";
import moment from "moment";
import { useAppBoundStore } from "@store/mainStore";
import { urlify } from "../../utils/index";

type Props = {
  userId: string;
};

const ChatBox: FC<Props> = ({ userId }) => {
  const { userMessages, user } = useAppBoundStore();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [userMessages]);

  return (
    <div className="overflow-y-auto hide__scrollbar h-[60vh] md:h-[70vh] space-y-4 w-full px-6 pb-10 md:pt-4 pt-8">
      {userMessages?.map((item) =>
        item.sender === user?.user || item?.sender === user?._id ? (
          <div key={item?._id} className="flex flex-col items-end">
            <p
              className="bg-primary max-w-fit px-4 py-2 rounded-xl text-white rounded-tr-none md:text-sm text-xs whitespace-pre-line break-words"
              id="editor-text1"
              dangerouslySetInnerHTML={{ __html: urlify(item?.message) }}
            ></p>
            <span className="text-xs pt-1 pr-2 text-gray-400">
              {moment(item?.timestamp).calendar()}
            </span>
          </div>
        ) : (
          <div key={item?._id}>
            <p
              id="editor-text1"
              className="bg-gray-100 max-w-fit md:text-sm text-xs px-4 py-2 rounded-xl text-gray-700 rounded-tl-none whitespace-pre-line break-words"
              dangerouslySetInnerHTML={{ __html: urlify(item?.message) }}
            ></p>
            <span className="text-xs text-gray-400">
              {moment(item?.timestamp).calendar()}
            </span>
          </div>
        )
      )}
      <div ref={ref} />
    </div>
  );
};

export default ChatBox;
