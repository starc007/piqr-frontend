/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import { Layout, Loader } from "@components";
import { Tab } from "@headlessui/react";
import { SuitcaseSVG, WorkSVG, MedalSVG, MyPostSVG } from "@assets";
import Positions from "@appComp/profile/positions";
import Works from "@appComp/profile/work";
import Endorsements from "@appComp/profile/endorsements";
import { useRouter } from "next/router";
import { useAppBoundStore } from "@store/mainStore";
import { useEffect, useMemo, useState } from "react";
import SendMessageModal from "@components/app-components/Explore/SendMessageModal";

import Head from "next/head";
import ProfileCard from "@components/app-components/profile/ProfileCard";
import NotFound from "@components/app-components/NotFound";
import { urlify } from "@utils";
// import Feed from "@components/app-components/Feed";
const Feed = dynamic(() => import("@components/app-components/Feed"), {
  ssr: false,
});

const skillCls =
  "py-1.5 px-4 text-sm font-medium text-gray-800 border border-gray-200 duration-200 ease-out rounded-full hover:border-secondary cursor-pointer";

const tabCmnClass =
  "flex items-center justify-center focus:outline-none text-sm text-gray-700 gap-2 pb-3 w-full text-center border-b ui-selected:border-primary ui-selected:fill-primary  ui-selected:text-primary font-semibold";

const tabs = ["projects", "experience", "endorsements", "posts"];

const TabsObj = [
  {
    name: "Projects",
    slug: "projects",
    icon: <WorkSVG />,
  },
  {
    name: "Experience",
    slug: "experience",
    icon: <SuitcaseSVG />,
  },
  {
    name: "Endorsements",
    slug: "endorsements",
    icon: <MedalSVG />,
  },
  {
    name: "Posts",
    slug: "posts",
    icon: <MyPostSVG className="w-5" />,
  },
];

const ProfilePage = () => {
  const [sendMessageModal, setSendMessageModal] = useState(false);

  const router = useRouter();
  const { username } = router.query;
  const {
    userDetailsByUsername,
    getUserdDetailsByUsername,
    getPostsByUser,
    userPosts,
    totalUserPostPages,
  } = useAppBoundStore((state) => ({
    userDetailsByUsername: state.userDetailsByUsername,
    getUserdDetailsByUsername: state.getUserdDetailsByUsername,
    getPostsByUser: state.getPostsByUser,
    userPosts: state.userPosts,
    totalUserPostPages: state.totalUserPostPages,
  }));
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [currentPostPage, setCurrentPostPage] = useState(0);

  useEffect(() => {
    if (username) {
      setLoading(true);
      getUserdDetailsByUsername(username as string).then(() =>
        setLoading(false)
      );
    }
  }, [getUserdDetailsByUsername, username]);

  const currentTab = router.query.tab;

  const isValidTab = currentTab && tabs.includes(currentTab as string);

  useEffect(() => {
    if (!router.isReady) return;

    if (isValidTab && currentTab && userDetailsByUsername) {
      switch (currentTab) {
        case "posts":
          setPostLoading(true);
          getPostsByUser(0, userDetailsByUsername.profile._id).then(() => {
            setPostLoading(false);
          });
          break;
        default:
          break;
      }
    }
  }, [router, isValidTab, currentTab, userDetailsByUsername, getPostsByUser]);

  const nextPost = async (page: number) => {
    switch (currentTab) {
      case "posts":
        setPostLoading(true);
        await getPostsByUser(
          page,
          userDetailsByUsername?.profile._id as string
        );
        setPostLoading(false);
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <Head>
        <title>{userDetailsByUsername?.profile?.name} Profile | Sanchar</title>

        <meta name="description" content="A New Age Professional Network" />
        <meta
          name="keywords"
          content="Sanchar, Developer, Developer Community, Developer Network, Developer Social Network, Developer Social Media, Developer Social Platform, Developer Social Media Platform, Developer Social Network Platform, Developer Social Media Network"
        />
        <meta name="author" content="Sanchar" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* og imagae */}
        <meta
          property="og:title"
          content="Sanchar | A New Age Professional Network"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={
            userDetailsByUsername?.profile?.avatar
              ? userDetailsByUsername?.profile?.avatar
              : "https://sanchar.xyz/logo.png"
          }
        />
        <meta property="og:site_name" content="Sanchar" />
        <meta property="og:description" content="Sanchar" />
      </Head>
      {loading && (
        <div className="mt-10 flex justify-center">
          <Loader col="text-gray-800" />
        </div>
      )}

      {!loading && userDetailsByUsername === null && <NotFound />}

      {!loading && userDetailsByUsername !== null && (
        <div className="flex py-4 flex-col md:flex-row gap-4 font-poppins md:px-4 min-h-screen border-r">
          <ProfileCard setSendMessageModal={setSendMessageModal} />
          <div className="p-4 lg:w-[calc(100%-20rem)] w-full">
            <div className="flex justify-between">
              <h6 className="font-semibold text-xl text-gray-700">
                About {userDetailsByUsername?.profile?.name}
              </h6>
            </div>
            {/* <p className="text-gray-600 mt-4 text-sm font-medium whitespace-pre-line">
              {userDetailsByUsername?.profile?.bio}
            </p> */}
            <p
              className="text-gray-600 mt-4 text-sm font-medium whitespace-pre-line"
              id="editor-text"
              dangerouslySetInnerHTML={{
                __html: urlify(userDetailsByUsername?.profile?.bio as string),
              }}
            ></p>
            <hr className="mt-6" />
            <h6 className="font-semibold text-xl text-gray-700 mt-6">
              Available for
            </h6>
            <div className="flex gap-2 flex-wrap mt-4">
              {userDetailsByUsername?.profile?.availableFor?.map((item) => (
                <p key={item} className={skillCls}>
                  {item}
                </p>
              ))}
            </div>
            {userDetailsByUsername?.profile?.skills.length > 0 ? (
              <>
                <h6 className="font-semibold text-xl text-gray-700 mt-6">
                  Skills
                </h6>
                <div className="flex gap-2 flex-wrap mt-4">
                  {userDetailsByUsername?.profile?.skills?.map((item) => (
                    <p key={item} className={skillCls}>
                      {item}
                    </p>
                  ))}
                </div>
              </>
            ) : null}

            {/* Tabs */}
            <div className="mb-12 mt-8">
              <Tab.Group
                selectedIndex={
                  isValidTab ? tabs.indexOf(currentTab as string) : 0
                }
              >
                <Tab.List className="flex items-center justify-between sticky top-0 pt-3 blur__effect w-full z-10">
                  {TabsObj.map((item) => {
                    return (
                      <Tab
                        key={item.slug}
                        className={tabCmnClass}
                        onClick={() => {
                          router.query.tab = item.slug;
                          router.push(router, undefined, {
                            shallow: true,
                            scroll: false,
                          });
                        }}
                      >
                        {item.icon}
                        <div className="hidden md:block">{item.name}</div>
                      </Tab>
                    );
                  })}
                </Tab.List>
                <Tab.Panels className={"mt-4"}>
                  <Tab.Panel>
                    <Works
                      isEditable={false}
                      activity={userDetailsByUsername?.activities}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Positions
                      isEditable={false}
                      workExp={userDetailsByUsername?.experience}
                      education={userDetailsByUsername?.education}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Endorsements
                      endorsements={
                        userDetailsByUsername?.profile?.endorsements
                      }
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Feed
                      loading={postLoading}
                      allPosts={userPosts}
                      totalPages={totalUserPostPages}
                      currentPage={currentPostPage}
                      nextPost={nextPost}
                      setPage={setCurrentPostPage}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      )}

      {sendMessageModal && (
        <SendMessageModal
          isOpen={sendMessageModal}
          userId={userDetailsByUsername?.profile?._id!}
          name={userDetailsByUsername?.profile?.name!}
          closeModal={() => setSendMessageModal(false)}
        />
      )}
    </Layout>
  );
};

export default ProfilePage;
