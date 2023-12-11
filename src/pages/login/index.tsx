import { useEffect, useState } from "react";
import { Link, CustomButton, Image } from "@components";
import LoginBackground from "@appComp/LoginBackground";

import { GoogleSVG, logo } from "@assets";
import { useAppBoundStore } from "@store";
import { useRouter } from "next/router";
import Head from "next/head";
import useAnalyticsEventTracker from "@hooks/useAnalyticsEventTracker";
import { toast } from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const prod = process.env.NODE_ENV === "production";

  const urlToOpen = prod
    ? "https://api.sanchar.xyz/api/v1/auth/google"
    : "http://localhost:6969/api/v1/auth/google";

  const { isLoggedIn, user, loginLoading, checkSession } = useAppBoundStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      user: state.user,
      loginLoading: state.loginLoading,
      checkSession: state.checkSession,
    })
  );

  const router = useRouter();
  useEffect(() => {
    if (isLoggedIn && user) {
      if (user?.firstTime) {
        router.push("/onboarding");
      } else {
        router.push("/feed?tab=new");
      }
    }
    if (!isLoggedIn && !loginLoading) {
      router.push("/login");
    }
    if (!isLoggedIn && loginLoading && !router.query.success) {
      checkSession();
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    // get the query params
    const { success } = router.query;
    if (success === "true") {
      setLoading(true);
      checkSession().then(() => {
        setLoading(false);
      });
    } else if (success === "false") {
      toast.error("Something went wrong");
    }
  }, [router]);

  const gaEvents = useAnalyticsEventTracker("Login Page");

  return (
    <>
      <Head>
        <title>Login | Sanchar</title>
      </Head>
      <div className="flex">
        <div className="lg:w-1/2 w-full flex flex-col h-screen p-5">
          <Link href="/">
            <Image src={logo} className="w-36" alt="logo" />
          </Link>
          <div className="w-full flex items-center justify-center div__height">
            <div className="flex flex-col items-center md:w-2/3 w-full">
              <p className="text-4xl text-center mt-2 text-gray-600 font-semibold ">
                Register/Login to Sanchar
              </p>
              <p className="mt-4 text-gray-500 text-center">
                & Collaborate with best talent.
              </p>
              <CustomButton
                onClick={() => {
                  setLoading(true);
                  gaEvents("sign_in_with_google", "click_sign_in_with_google");
                  window.open(urlToOpen, "_self");
                }}
                isLoading={loading}
                disabled={loading}
                variant="secondary"
                loaderColor="text-gray-800"
                cls="h-14 mt-8 md:text-lg font-medium gap-2 md:w-96 px-6 w-72"
              >
                <GoogleSVG /> Sign in with Google
              </CustomButton>
            </div>
          </div>
        </div>
        <LoginBackground />
      </div>
    </>
  );
};

export default Login;
