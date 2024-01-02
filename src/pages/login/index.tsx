import { useEffect, useState } from "react";
import { Link, Button } from "@components";
import LoginBackground from "@appComp/LoginBackground";

import { GoogleSVG, logo } from "@assets";
import { useAppBoundStore } from "@store";
import { useRouter } from "next/router";
import Head from "next/head";
import useAnalyticsEventTracker from "@hooks/useAnalyticsEventTracker";
import { toast } from "react-hot-toast";
import { API_ENDPOINT_DEV, API_ENDPOINT_PROD } from "@utils";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const prod = process.env.NODE_ENV === "production";

  const urlToOpen = prod
    ? `${API_ENDPOINT_PROD}/api/v1/auth/google`
    : `${API_ENDPOINT_DEV}/api/v1/auth/google`;

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
        router.push("/feed");
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
        <title>Login | Piqr</title>
      </Head>
      <div className="flex">
        <div className="lg:w-1/2 w-full flex flex-col h-screen p-5">
          <Link href="/" className="text-4xl font-bold">
            Piqr
          </Link>
          <div className="w-full flex items-center justify-center div__height">
            <div className="flex flex-col items-center md:w-2/3 w-full">
              <p className="text-4xl text-center mt-2 text-gray-600 font-semibold ">
                Register/Login to Piqr
              </p>
              <p className="mt-4 text-gray-500 text-center">
                & Collaborate with best talent.
              </p>
              <Button
                onClick={() => {
                  setLoading(true);
                  gaEvents("sign_in_with_google", "click_sign_in_with_google");
                  window.open(urlToOpen, "_self");
                }}
                isLoading={loading}
                disabled={loading}
                variant="tertiaryOutline"
                loaderColor="text-gray-800"
                cls="h-14 mt-8 font-medium gap-2 md:w-96 px-6 w-72 rounded-lg"
              >
                <GoogleSVG /> Sign in with Google
              </Button>
            </div>
          </div>
        </div>
        <LoginBackground />
      </div>
    </>
  );
};

export default Login;
