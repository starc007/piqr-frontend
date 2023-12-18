/* eslint-disable react-hooks/exhaustive-deps */
import { useAppBoundStore } from "@store";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { LayoutProps } from "./typings";
import Head from "next/head";
import Layout from "./layout.main";

const PrivateLayout: FC<
  LayoutProps & {
    title?: string;
  }
> = ({ children, title }) => {
  const { isLoggedIn, loginLoading } = useAppBoundStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    loginLoading: state.loginLoading,
  }));
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !loginLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, loginLoading]);

  return (
    <>
      <Head>
        <title>{title} | Piqr</title>
      </Head>
      <Layout>{children}</Layout>
    </>
  );
};

export default PrivateLayout;
