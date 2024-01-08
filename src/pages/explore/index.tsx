import { Button, Layout, Loader } from "@components";
import ExploreCard from "@appComp/Explore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppBoundStore } from "@store/mainStore";
import FilterOptions from "@appComp/Explore/FilterOptions";
import Head from "next/head";
import Search from "@components/app-components/Search";
import { useRouter } from "next/router";
import { BookmarkSVG, DiscoverSVG } from "@assets/index";

const navTabs = [
  {
    id: 1,
    name: "Discover",
    icon: <DiscoverSVG className="w-5" />,
    slug: "all",
  },
  {
    id: 2,
    name: "Saved Profiles",
    icon: <BookmarkSVG className="w-4" />,
    slug: "saved",
  },
];

const filterCategories = [
  {
    name: "All",
    value: "All",
    id: 1,
    slug: "all",
  },
  {
    id: 2,
    name: "Frontend Developer",
    value: "Frontend Developer",
    slug: "frontend-developer",
  },
  {
    id: 3,
    name: "Backend Developer",
    value: "Backend Developer",
    slug: "backend-developer",
  },
  {
    id: 4,
    name: "Designers",
    value: "UI/UX Designer",
    slug: "ui-ux-designer",
  },
  {
    id: 5,
    name: "Founders",
    value: "Founder",
    slug: "founder",
  },
];

const Explore = () => {
  const {
    getAllUsers,
    isLoggedIn,
    filteredUsers,
    setUsersLoading,
    usersLoading,
    totalPages,
    allUsers,
    resetAllUsers,
    getUsersByCategory,
    setFilteredUsers,
    getSavedUsers,
    savedProfiles,
    loginLoading,
    isProfilesFetched,
  } = useAppBoundStore((state) => ({
    getAllUsers: state.getAllUsers,
    isLoggedIn: state.isLoggedIn,
    filteredUsers: state.filteredUsers,
    setUsersLoading: state.setUsersLoading,
    usersLoading: state.usersLoading,
    totalPages: state.totalPages,
    allUsers: state.allUsers,
    resetAllUsers: state.resetAllUsers,
    getUsersByCategory: state.getUsersByCategory,
    setFilteredUsers: state.setFilteredUsers,
    getSavedUsers: state.getSavedUsers,
    savedProfiles: state.savedProfiles,
    loginLoading: state.loginLoading,
    isProfilesFetched: state.isProfilesFetched,
  }));
  const [page, setPage] = useState(0);
  const [saveProfileLoading, setSaveProfileLoading] = useState(false);
  const router = useRouter();
  const { type, city, category, offering } = router.query;

  const categoryObj: any = {
    offering: offering,
    category: category,
    city: city,
  };

  useEffect(() => {
    if (router.isReady) {
      if (type) {
        if (type === "saved") {
          if (!isLoggedIn && !loginLoading) {
            router.push({
              pathname: "/explore",
              query: { type: "all" },
            });
            return;
          }
          setSaveProfileLoading(true);
          getSavedUsers().then(() => {
            setSaveProfileLoading(false);
          });
        } else if (type === "all") {
          setUsersLoading(true);
          getAllUsers(page, "top");
        } else if (type === "new") {
          setUsersLoading(true);
          getAllUsers(page, "new");
        }
      }
      if (Object.values(categoryObj).some((item) => item)) {
        Object.keys(categoryObj).forEach(
          (key) => categoryObj[key] === "" && delete categoryObj[key]
        );
        submitCategory(categoryObj, page);
      }
    }
  }, [getAllUsers, loginLoading, isLoggedIn, router]);

  const submitCategory = (categoryObj: any, pg: number) => {
    if (type === "all") {
      setFilteredUsers(allUsers);
      return;
    }

    if (pg === 0) {
      resetAllUsers();
      setPage(0);
    }

    const obj = {
      ...categoryObj,
      page: pg,
    };
    setUsersLoading(true);
    getUsersByCategory(obj).then(() => console.log("done"));
  };

  const nextPage = (page: number) => {
    if (type === "all") {
      setUsersLoading(true);
      getAllUsers(page, "top");
    }
    if (type === "new") {
      setUsersLoading(true);
      getAllUsers(page, "new");
    }
  };

  const RenderExploreCard = useCallback(
    ({ item }: { item: ProfileResponse }) => {
      return <ExploreCard item={item} />;
    },
    []
  );

  const RenderExploreCardMemo = filteredUsers?.map((profile) => (
    <RenderExploreCard item={profile} key={profile._id} />
  ));

  const RenderSaveCardMemo = useMemo(() => {
    return savedProfiles?.map((profile) => (
      <RenderExploreCard item={profile} key={profile._id} />
    ));
  }, [savedProfiles, RenderExploreCard]);

  return (
    <Layout>
      <Head>
        <title>Discover and Collaborate with best Professionals | Piqr</title>
        <meta
          name="description"
          content="Discover & Collaborate with the best Professionals around the world"
        />
        <meta
          name="keywords"
          content="Talent, Networking, Founders, hackathon partners, students, monetize, network, social media, social network, jobs"
        />
        <meta name="author" content="Piqr" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Piqr" />
      </Head>

      <div className="w-full font-poppins border-r min-h-screen">
        <div className="flex items-center h-16 border-b w-full sticky top-0 z-10">
          <div className="flex items-center gap-2 w-full blur__effect h-full px-4">
            {navTabs.map((item) => {
              if (item.id === 2 && !isLoggedIn) return null;
              return (
                <Button
                  key={item.id}
                  cls={`font-medium text-sm gap-1 px-4 h-10 rounded-lg transition duration-300 ${
                    type === item.slug ? "bg-gray-100" : "bg-transparent"
                  }`}
                  onClick={() => {
                    router.push({
                      pathname: "/explore",
                      query: { type: item.slug },
                    });
                    // submitCategory(item.slug, 0);
                  }}
                >
                  {item.icon}
                  {item.name}
                </Button>
              );
            })}
          </div>
          {/* <div className="lg:flex hidden w-1/2">{!isMobile && <Navbar />}</div> */}
        </div>
        <div className="flex gap-5 max-w-7xl mx-auto md:px-6 lg:px-12 px-3 pt-5 pb-10 ">
          {type === "saved" && isLoggedIn ? (
            <div className="w-full">
              <div
                className={
                  "grid md:gap-6 lg:gap-10 gap-y-8 mt-4 lg:grid-cols-2 md:grid-cols-2"
                }
              >
                {RenderSaveCardMemo}
              </div>
              {!saveProfileLoading && savedProfiles?.length === 0 && (
                <div className="flex justify-center items-center w-full mt-20">
                  <p className="text-lg font-semibold text-gray-600">
                    No users found
                  </p>
                </div>
              )}
              {saveProfileLoading ? (
                <div className="flex justify-center mt-10 w-full">
                  <Loader col="text-black" />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="w-full">
              {isLoggedIn && <Search />}
              <div className="flex justify-between mt-5">
                <div className="flex flex-wrap gap-3">
                  {filterCategories.map((category) => (
                    <Button
                      cls={`border text-xs font-medium !rounded-lg  px-3 h-9 text-dark/90 hover:bg-gray-100 transition duration-300 ease-out ${
                        categoryObj.category === category.value
                          ? "bg-gray-100"
                          : "bg-transparent"
                      }`}
                      key={category.id}
                      onClick={() => {
                        setPage(0);
                        if (category.value == "All") {
                          router.push({
                            pathname: "/explore",
                            query: { type: category.slug },
                          });
                          return;
                        }

                        router.push({
                          pathname: "/explore",
                          query: { category: category.value },
                        });
                      }}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
                {isLoggedIn ? <FilterOptions /> : null}
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <div className="w-full">
                  <div className="flex flex-col w-full">
                    <div
                      className={
                        "grid md:gap-6 lg:gap-10 gap-y-8 mt-4 lg:grid-cols-2 md:grid-cols-2"
                      }
                    >
                      {RenderExploreCardMemo}
                    </div>
                    {!usersLoading && filteredUsers?.length === 0 && (
                      <div className="flex justify-center items-center w-full mt-20">
                        <p className="text-lg font-semibold text-gray-600">
                          No users found
                        </p>
                      </div>
                    )}

                    {usersLoading ? (
                      <div className="flex justify-center mt-10 w-full">
                        <Loader col="text-black" />
                      </div>
                    ) : null}
                    {usersLoading ? null : (
                      <div className="my-6 flex justify-center">
                        {totalPages > page + 1 ? (
                          <Button
                            disabled={usersLoading}
                            cls="w-28 text-sm h-10 font-medium mt-5 rounded-lg"
                            onClick={() => {
                              setPage(page + 1);
                              if (type) {
                                if (type === "all" || type === "new") {
                                  nextPage(page + 1);
                                }
                              }

                              if (
                                Object.values(categoryObj).some((item) => item)
                              ) {
                                Object.keys(categoryObj).forEach(
                                  (key) =>
                                    categoryObj[key] === "" &&
                                    delete categoryObj[key]
                                );
                                submitCategory(categoryObj, page + 1);
                              }
                            }}
                          >
                            Load More
                          </Button>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <InviteModal /> */}
    </Layout>
  );
};

export default Explore;
