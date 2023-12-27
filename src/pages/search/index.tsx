/* eslint-disable @next/next/no-img-element */
import { __getUsersbyUsername } from "@api/api";
import { VerifiedSVG } from "@assets/index";
import { Button, Image, Layout, Link, Loader } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Search = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<{
    totalPages: number;
    users: ProfileResponse[];
  }>({
    totalPages: 0,
    users: [],
  });
  const { q } = router.query;

  const { isLoggedIn, loginLoading } = useAppBoundStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    loginLoading: state.loginLoading,
  }));

  const getUsers = async (query: string, pageNum: number) => {
    try {
      setLoading(true);
      if (query.trim().length == 0) return;
      const res = await __getUsersbyUsername({
        username: query,
        page: pageNum,
      });
      setItems({
        totalPages: res.data?.totalPages!,
        users: [...items?.users, ...res.data?.users!],
      });
    } catch (err: any) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (q && isLoggedIn) {
      getUsers(q as string, page);
    }

    if (!isLoggedIn && !loginLoading) {
      router.push("/login");
    }
  }, [q, isLoggedIn, loginLoading, page]);

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4 font-poppins lg:mb-0 mb-10">
        <p className="font-bold md:text-4xl text-2xl text-gray-500">
          Search result for &quot;<span className="text-dark">{q}</span>&quot;
        </p>

        {items?.users.length > 0 && (
          <div className="w-full mt-6">
            {items?.users?.map((it, i) => (
              <Link
                key={i}
                href={`/${it?.username}`}
                className="p-3 rounded-lg  hover:bg-gray-100 flex gap-4"
              >
                {it?.avatar && (
                  <Image
                    src={it?.avatar}
                    className="rounded-full aspect-square object-cover w-12 h-12"
                    alt={`avatar-${it?.username}`}
                  />
                )}
                <div>
                  <div className="font-medium flex items-center gap-1">
                    {it?.name}{" "}
                    {/* {it?.isVerified && (
                      <VerifiedSVG />
                    )} */}
                  </div>
                  <p className="text-gray-500 text-sm">{it?.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {loading && (
          <div className="flex justify-center mt-6">
            <Loader col="text-dark" />
          </div>
        )}
        {!loading && items?.users.length == 0 && (
          <p className="text-gray-500 text-center">No user found</p>
        )}

        {!loading && items?.totalPages > page + 1 && (
          <div className="flex justify-center mt-6">
            <Button
              isLoading={loading}
              disabled={loading}
              onClick={() => setPage(page + 1)}
              // variant="primary"
              cls="px-4 h-9 text-sm"
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
