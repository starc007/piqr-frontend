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
import { useEffect, useState } from "react";
import SendMessageModal from "@components/app-components/Explore/SendMessageModal";

import Head from "next/head";
import ProfileCard from "@components/app-components/profile/ProfileCard";
import NotFound from "@components/app-components/NotFound";
import MeetNewPeople from "@components/app-components/MeetNewPeople";
import About from "@components/app-components/profile/about";

const Feed = dynamic(() => import("@components/app-components/Feed"), {
  ssr: false,
});

const tabCmnClass =
  "flex items-center justify-center focus:outline-none text-sm text-gray-700 gap-2 pb-3 w-20 text-center ui-selected:border-b-2 ui-selected:border-primary ui-selected:fill-primary ui-selected:text-primary font-medium";

const tabs = ["about", "projects", "experience", "posts"];

const TabsObj = [
  {
    name: "About",
    slug: "about",
    icon: <WorkSVG />,
  },
  {
    name: "Projects",
    slug: "projects",
    icon: <WorkSVG />,
  },
  {
    name: "Resume",
    slug: "experience",
    icon: <SuitcaseSVG />,
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
        <title>{userDetailsByUsername?.profile?.name} Profile | Piqr</title>

        <meta name="description" content="A New Age Professional Network" />
        <meta
          name="keywords"
          content="Piqr, Developer, Developer Community, Developer Network, Developer Social Network, Developer Social Media, Developer Social Platform, Developer Social Media Platform, Developer Social Network Platform, Developer Social Media Network"
        />
        <meta name="author" content="Piqr" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* og imagae */}
        <meta
          property="og:title"
          content="Piqr | A New Age Professional Network"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={
            userDetailsByUsername?.profile?.avatar
              ? userDetailsByUsername?.profile?.avatar
              : "https://piqr.in/logo.png"
          }
        />
        <meta property="og:site_name" content="Piqr" />
        <meta property="og:description" content="Piqr" />
      </Head>
      {loading && (
        <div className="mt-10 flex justify-center">
          <Loader col="text-gray-800" />
        </div>
      )}
      {!loading && userDetailsByUsername === null && <NotFound />}
      {/* flex py-4 flex-col md:flex-row gap-4 md:px-4 */}
      {!loading && userDetailsByUsername !== null && (
        <div className="flex gap-5 min-h-screen">
          <div className="md:w-5/6 border-r">
            <ProfileCard setSendMessageModal={setSendMessageModal} />
            <div className="sm:mb-12 mb-20 mt-3">
              <Tab.Group
                selectedIndex={
                  isValidTab ? tabs.indexOf(currentTab as string) : 0
                }
              >
                <Tab.List className="flex items-center justify-around pt-2 w-full border-b">
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
                        {item.name}
                      </Tab>
                    );
                  })}
                </Tab.List>
                <Tab.Panels className={"mt-3 px-4"}>
                  <Tab.Panel>
                    <About
                      bio={userDetailsByUsername?.profile?.bio as string}
                      availableFor={
                        userDetailsByUsername?.profile?.availableFor as string[]
                      }
                      skills={
                        userDetailsByUsername?.profile?.skills as string[]
                      }
                      endorsements={
                        userDetailsByUsername?.profile?.endorsements
                      }
                    />
                  </Tab.Panel>
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
          {/* <div className="p-4 lg:w-[calc(100%-20rem)] w-full">
            <div className="flex justify-between">
              <h6 className="font-semibold text-xl text-gray-700">
                About {userDetailsByUsername?.profile?.name}
              </h6>
            </div>
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
          </div> */}
          <MeetNewPeople />
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
