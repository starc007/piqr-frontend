/* eslint-disable @next/next/no-img-element */
import { Button, Image, Layout } from "@components";
import Head from "next/head";
import NewCampFirePostModal from "@components/app-components/campfire/NewCampFirePostModal";
import { useEffect, useState } from "react";
import { useAppBoundStore } from "@store/mainStore";
import { EditSVG } from "@assets/index";
import { useRouter } from "next/router";
import MeetNewPeople from "@components/app-components/MeetNewPeople";
import Feed from "@components/app-components/Feed";

const tabs = ["new", "top", "following"];

const CampfireHomePage = () => {
  const [newPostModal, setNewPostModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const router = useRouter();

  const { tab } = router.query;

  const { getAllPosts, allPosts, isLoggedIn, totalPostPages, user } =
    useAppBoundStore((state) => ({
      getAllPosts: state.getAllPosts,
      allPosts: state.allPosts,
      isLoggedIn: state.isLoggedIn,
      totalPostPages: state.totalPostPages,
      user: state.user,
    }));

  // const isValidTab = tab && tabs.includes(tab as string);

  useEffect(() => {
    if (router.isReady) {
      setLoading(true);
      // if (tab && isValidTab) {
      //   setLoading(true);
      //   getAllPosts(0, tab as string).then(() => setLoading(false));
      // }
      // if (!tab || !isValidTab) {
      //   setLoading(true);
      //   router.push({
      //     pathname: "/feed",
      //     // query: { tab: "new" },
      //   });
      //   getAllPosts(0, "new").then(() => setLoading(false));
      // }
      getAllPosts(0).then(() => setLoading(false));
    }
  }, [getAllPosts, router]);

  const nextPost = async (page: number) => {
    setLoading(true);
    await getAllPosts(page).then(() => setLoading(false));
  };

  return (
    <Layout>
      <Head>
        <title>Share Something Interesting | Piqr</title>
        <meta
          name="description"
          content="Share your ideas with the world. Get feedback and collaborate with other like minded people. Find your next co-founder."
        />
        <meta
          name="keywords"
          content="Talent, Networking, Founders, hackathon partners, students, monetize, network"
        />
        <meta name="author" content="Piqr" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex min-h-screen w-full gap-5">
        <div className="flex flex-col lg:w-3/4  w-full">
          {isLoggedIn && (
            <div
              onClick={() => setNewPostModal(true)}
              className="lg:px-4 px-3 pt-6 pb-4 w-full flex items-center gap-3 font-medium lg:text-sm text-xs border-b cursor-pointer"
            >
              <div className="flex items-center w-full">
                <Image
                  src={user?.avatar!}
                  className="rounded-full md:h-12 md:w-12 w-10 h-10 object-cover object-center"
                  alt="avatar"
                />
                <div className="flex flex-col ml-3 w-[calc(100%-3rem)]">
                  <p className="text-left text-gray-800 font-medium">
                    Hey {user?.name}
                  </p>
                  <p className="text-left text-gray-400">
                    What's on your mind?
                  </p>
                </div>
              </div>
              <Button cls="lg:h-10 h-9 w-24 bg-primary/10 text-primary">
                <EditSVG className="w-4" />
                <span className="font-medium pl-2 text-sm">Post</span>
              </Button>
            </div>
          )}
          <Feed
            loading={loading}
            allPosts={allPosts}
            currentPage={page}
            nextPost={nextPost}
            setPage={setPage}
            totalPages={totalPostPages}
            setNewPostModal={setNewPostModal}
          />
        </div>
        <MeetNewPeople />
      </div>

      {isLoggedIn && newPostModal && (
        <NewCampFirePostModal
          isOpen={newPostModal}
          closeModal={() => setNewPostModal(false)}
        />
      )}
    </Layout>
  );
};
export default CampfireHomePage;
