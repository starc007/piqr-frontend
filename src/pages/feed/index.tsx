/* eslint-disable @next/next/no-img-element */
import { Layout } from "@components";
import Head from "next/head";
import NewCampFirePostModal from "@components/app-components/campfire/NewCampFirePostModal";
import { useEffect, useState } from "react";
import { useAppBoundStore } from "@store/mainStore";
import { EditSVG } from "@assets/index";
import { useRouter } from "next/router";
import MeetNewPeople from "@components/app-components/MeetNewPeople";
import Feed from "@components/app-components/Feed";

const quickSort = [
  { name: "Everyone", slug: "new", id: 1, isPrivate: false },
  { name: "Following", slug: "following", id: 3, isPrivate: true },
  { name: "Highlight", slug: "top", id: 2, isPrivate: false },
];

const tabs = ["new", "top", "following"];

const CampfireHomePage = () => {
  const [newPostModal, setNewPostModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const router = useRouter();

  const { tab } = router.query;

  const {
    getAllPosts,
    allPosts,
    isLoggedIn,
    totalPostPages,
    user,
    resetPosts,
  } = useAppBoundStore((state) => ({
    getAllPosts: state.getAllPosts,
    allPosts: state.allPosts,
    isLoggedIn: state.isLoggedIn,
    totalPostPages: state.totalPostPages,
    user: state.user,
    resetPosts: state.resetPosts,
  }));

  const isValidTab = tab && tabs.includes(tab as string);

  useEffect(() => {
    if (router.isReady) {
      if (tab && isValidTab) {
        setLoading(true);
        getAllPosts(0, tab as string).then(() => setLoading(false));
      }
      if (!tab || !isValidTab) {
        setLoading(true);
        router.push({
          pathname: "/feed",
          query: { tab: "new" },
        });
        getAllPosts(0, "new").then(() => setLoading(false));
      }
    }
  }, [tab, getAllPosts, isValidTab, router]);

  const nextPost = async (page: number) => {
    if (tab && isValidTab) {
      setLoading(true);
      await getAllPosts(page, tab as string).then(() => setLoading(false));
    } else {
      setLoading(true);
      await getAllPosts(page, "new").then(() => setLoading(false));
    }
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
      <div className="flex min-h-screen w-full">
        <div className="flex flex-col lg:w-3/4 border-r">
          <div className="flex justify-center items-center gap-2 px-3 h-16 border-b sticky top-0 blur__effect z-10">
            {quickSort?.map((item) => {
              if (!isLoggedIn && item.isPrivate) {
                return null;
              }
              return (
                <button
                  onClick={() => {
                    if (tab === item.slug.toLowerCase()) return;
                    resetPosts();
                    setPage(0);
                    router.push(`/feed?tab=${item.slug.toLowerCase()}`);
                  }}
                  key={item.slug}
                  className={`flex items-center sm:text-sm text-xs px-4 gap-2 hover:bg-primary/10 hover:text-primary py-2 rounded-full ${
                    tab === item.slug ? "bg-primary/10 text-primary" : ""
                  }
                        ${
                          tab === undefined &&
                          item.slug === "new" &&
                          "bg-primary/10 text-primary"
                        }
                      `}
                >
                  <span className="font-semibold font-sans">{item.name}</span>
                </button>
              );
            })}
          </div>
          {isLoggedIn && (
            <div
              onClick={() => setNewPostModal(true)}
              className="lg:px-4 px-3 py-4 w-full flex flex-row justify-between lg:items-center gap-3 font-medium lg:text-sm text-xs border-b cursor-pointer"
            >
              <div className="flex items-center w-3/4">
                <img
                  src={user?.avatar!}
                  className="rounded-full h-12 w-12 object-cover object-center"
                  alt="avatar"
                />
                <div className="flex flex-col ml-3 w-[calc(100%-3rem)]">
                  <p className="text-left text-gray-800 font-semibold">
                    Hey {user?.name}
                  </p>
                  <p className="text-left text-gray-400">
                    Share your ideas, opportunities, learnings, cool projects,
                    etc....
                  </p>
                </div>
              </div>
              <button className="flex justify-center items-center lg:h-10 h-9 md:w-20 w-20 lg:mt-0 mt-3  rounded-full bg-primary text-white">
                <EditSVG className="w-4" />
                <span className="font-semibold pl-2 text-sm">Post</span>
              </button>
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
        <MeetNewPeople showNavbar />
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
