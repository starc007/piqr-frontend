/* eslint-disable @next/next/no-img-element */
import { __getUsersbyUsername } from "@api/api";
import { useEffect, useState } from "react";
import { Image, Input, Link, Loader } from "@components";
import { toast } from "react-hot-toast";
import { debounce } from "@utils";
import { SearchSVG, VerifiedSVG } from "@assets/index";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<ProfileResponse[]>([]);
  const [query, setQuery] = useState("");

  const getUsers = async (query: string) => {
    try {
      setLoading(true);

      if (query.trim().length == 0) {
        setItems([]);
        return;
      }
      setQuery(query);
      const res = await __getUsersbyUsername({ username: query });
      setItems(res.data?.users || []);
    } catch (err: any) {
      setLoading(false);
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (!e.target.closest("#userDropdown")) {
        setItems([]);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="w-full relative font-poppins">
      <div className="relative flex justify-center items-center">
        <Input
          onChange={debounce((e: any) => getUsers(e.target.value), 700)}
          placeholder="Search name or username ..."
          cls="h-14 !rounded-xl placeholder:text-base"
        />
        <div className="absolute right-2 rounded-xl p-3 bg-gray-100">
          <SearchSVG className="text-dark w-5" />
        </div>
      </div>
      {loading && (
        <div
          className="absolute z-20 top-16 w-full px-5 py-2 border bg-white rounded-2xl flex justify-center"
          id="userDropdown"
        >
          <Loader col="text-dark" />
        </div>
      )}
      {!loading && items?.length > 0 && (
        <div
          className="absolute z-20 top-16 w-full px-5 py-2 border bg-white rounded-2xl max-h-80 overflow-auto shadow-xl"
          id="userDropdown"
        >
          {items?.map((it, i) => (
            <Link
              key={i}
              href={`/${it?.username}`}
              className="p-3 rounded-lg text-sm  hover:bg-gray-100 flex items-center gap-4"
            >
              {it?.avatar && (
                <Image
                  src={it?.avatar}
                  className="rounded-full aspect-square object-cover"
                  height={40}
                  width={40}
                  alt={`avatar-${it?.username}`}
                />
              )}
              <div>
                <div className="font-medium flex items-center gap-1">
                  {it?.name}{" "}
                </div>

                <p className="text-gray-500 text-xs">@{it?.username}</p>
              </div>
            </Link>
          ))}

          {items?.length > 9 && (
            <Link
              href={`/search?q=${query}`}
              className="mt-4 p-3 rounded-lg text-sm bg-primary/10 text-primary flex justify-center items-center"
            >
              View All
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
