import { ArrowSVG } from "@assets/index";
import { Button, Loader, PrivateLayout } from "@components";
import FollowCard from "@components/app-components/profile/FollowCard";
import { useAppBoundStore } from "@store/mainStore";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const MyNetwork = () => {
  const { getFollowersFollowing, usersNetwork, followingIds } =
    useAppBoundStore((state) => ({
      getFollowersFollowing: state.getFollowersFollowing,
      usersNetwork: state.usersNetwork,
      followingIds: state.followingIds,
    }));

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { type } = router.query;

  const isValidType = type === "followers" || type === "following";

  const validType = isValidType ? type : "followers";

  useEffect(() => {
    if (id) {
      setLoading(true);
      getFollowersFollowing(id as string).then(() => setLoading(false));
    }
  }, [id, getFollowersFollowing]);

  const followers = usersNetwork?.followers || [];
  const following = usersNetwork?.following || [];

  const dataToRender = validType === "followers" ? followers : following;

  const RenderComponent = useMemo(() => {
    if (dataToRender.length === 0)
      return <p className="text-center mt-10">No {validType} found</p>;

    return (
      <div className="max-w-xl divide-y">
        {dataToRender.map((item) => {
          return (
            <FollowCard
              key={item._id}
              name={item.name}
              username={item.username as string}
              avatar={item.avatar}
              title={item.title || "No title"}
              id={item._id}
            />
          );
        })}
      </div>
    );
  }, [dataToRender, validType]);

  return (
    <PrivateLayout title="My Network | Piqr">
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader col="text-dark" />
        </div>
      ) : (
        <div className="border-r min-h-screen flex-flex-col">
          <button
            onClick={() => {
              router.back();
            }}
            className="font-semibold text-primary flex items-center gap-1 border-b w-full h-12 px-4 sticky top-0 bg-white"
          >
            <ArrowSVG className="-rotate-90 w-5" /> go back
          </button>
          <div className="flex gap-5 p-3 border-b">
            {["followers", "following"].map((tab) => (
              <Button
                key={tab}
                onClick={() => {
                  router.push({
                    pathname: `/network/${id}`,
                    query: { type: tab },
                  });
                }}
                cls={`duration-300 transition font-semibold ${
                  validType === tab ? "bg-gray-100 " : "text-gray-500"
                } px-4 py-2 rounded-full`}
              >
                {tab}
              </Button>
            ))}
          </div>
          <div className="px-4">{RenderComponent}</div>
        </div>
      )}
    </PrivateLayout>
  );
};

export default MyNetwork;
