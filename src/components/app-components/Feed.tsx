import React, { FC, useMemo } from "react";
import { Button, Link, Loader } from "..";
import CampfirePostPreview from "./campfire/CampfirePostPreview";
import { useAppBoundStore } from "@store/mainStore";

interface Props {
  allPosts: IdeaResponse[];
  loading?: boolean;
  setNewPostModal?: React.Dispatch<React.SetStateAction<boolean>>;
  totalPages: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  nextPost: (page: number) => void;
}

const Feed: FC<Props> = ({
  allPosts,
  loading,
  setNewPostModal,
  totalPages,
  currentPage,
  setPage,
  nextPost,
}) => {
  const PostsToRender = useMemo(() => {
    return allPosts?.map((item) => (
      <CampfirePostPreview key={item._id} item={item} />
    ));
  }, [allPosts]);

  return (
    <>
      <div className="flex flex-col divide-y">
        {/* {allPosts?.map((item) => (
          <CampfirePostPreview key={item._id} item={item} />
        ))} */}
        {PostsToRender}
        {!loading && allPosts?.length === 0 && (
          <div className="flex justify-center items-center flex-col text-sm mt-20">
            <p>
              No posts found.{" "}
              <span
                onClick={() => setNewPostModal!(true)}
                className="text-primary cursor-pointer"
              >
                Share something interesting
              </span>
            </p>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex justify-center mt-10 w-full">
          <Loader col="text-gray-800" />
        </div>
      )}

      {!loading && (
        <div className="flex justify-center mb-20 lg:mb-10 mt-10">
          {totalPages > currentPage + 1 ? (
            <Button
              isLoading={false}
              loaderColor="text-primary"
              disabled={loading}
              cls="w-28 text-sm h-10 font-semibold"
              onClick={() => {
                setPage(currentPage + 1);
                nextPost(currentPage + 1);
              }}
            >
              Load More
            </Button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Feed;
