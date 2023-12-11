import { FC } from "react";

import { LayoutProps } from "./typings";
import Navbar from "@appComp/Navbar";
import { useAppBoundStore } from "@store";
import Sidebar from "@components/app-components/Sidebar";
import { useRouter } from "next/router";
import { useMediaQuery } from "src/utils/useMediaQuery";

const nameToShow = (name: string) => {
  if (name.includes("user/inbox")) return "Inbox";
  if (name.includes("feed")) return "Feed";
  if (name.includes("explore")) return "Explore";
  if (name.includes("jobs") || name.includes("jobs?*")) return "Jobs";
  if (name.includes("notifications")) return "Notifications";
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 1006px)");

  const isShowHeader =
    router.pathname.includes("feed") || router.pathname.includes("explore");

  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="w-full flex lg:h-screen overflow-hidden">
        <div className="lg:w-72 w-full lg:static fixed bottom-0 left-0 z-20 lg:border-r lg:px-4">
          <Sidebar />
        </div>
        <div className="w-full overflow-y-auto hide__scrollbar">
          {isMobile && isShowHeader ? (
            <Navbar subTitle={nameToShow(router.pathname)} />
          ) : null}

          {!isShowHeader ? (
            <Navbar subTitle={nameToShow(router.pathname)} />
          ) : null}
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
