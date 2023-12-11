import LoginBackground from "@appComp/LoginBackground";
import {
  Link,
  Input,
  TextArea,
  Select,
  Loader,
  CustomButton,
  Image,
} from "@components";
import React, { useEffect, useState } from "react";
import {
  AVAILABLE_FOR,
  CATEGORY,
  debounce,
  getUserLocation,
  validUsername,
} from "@utils";
import { useAppBoundStore } from "@store";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Head from "next/head";
import useAnalyticsEventTracker from "@hooks/useAnalyticsEventTracker";
import { logo } from "@assets/index";

const options = CATEGORY.map((item) => {
  return {
    value: item,
    label: item,
  };
});

const Onboarding = () => {
  const {
    checkUsername,
    usernameMsg,
    setUsernameMsg,
    updateUser,
    isSuccess,
    isLoggedIn,
    user,
    loginLoading,
    checkSession,
  } = useAppBoundStore((state) => ({
    checkUsername: state.checkUsername,
    usernameMsg: state.usernameMsg,
    setUsernameMsg: state.setUsernameMsg,
    updateUser: state.updateUser,
    isSuccess: state.isSuccess,
    isLoggedIn: state.isLoggedIn,
    user: state.user,
    loginLoading: state.loginLoading,
    checkSession: state.checkSession,
  }));

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [err, setErr] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: [],
    bio: "",
    username: "",
    title: "",
    availableFor: [],
    location: {
      city: "",
      country: "",
    },
  });

  const handleUsername = debounce((value: string) => {
    setChecking(true);
    setUsernameMsg(null);
    const isValid = validUsername(value);
    if (!isValid) {
      setUsernameMsg("Invalid username");
      setChecking(false);
      return;
    }
    if (value.length < 3) {
      setUsernameMsg("Min 3 characters long");
      setChecking(false);
      return;
    }
    if (value.length > 18) {
      setUsernameMsg("Max 18 characters long");
      setChecking(false);
      return;
    }
    setFormData({ ...formData, username: value });
    checkUsername(value).then((res) => {
      setChecking(false);
    });
  }, 500);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (usernameMsg !== null) {
      toast.error("Please enter a valid username");
      return;
    }
    if (
      !formData.username ||
      !formData.name ||
      !formData.bio ||
      formData.category.length === 0 ||
      !formData.title ||
      formData.availableFor.length === 0 ||
      !formData.location.city
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (formData.availableFor.length > 3) {
      toast.error("Please select max 3 options");
      return;
    }

    setLoading(true);
    let obj;
    if (err) {
      obj = {
        username: formData.username,
        name: formData.name,
        bio: formData.bio,
        category: formData.category,
        title: formData.title,
        availableFor: formData.availableFor,
      };
    } else {
      obj = {
        username: formData.username,
        name: formData.name,
        bio: formData.bio,
        category: formData.category,
        title: formData.title,
        availableFor: formData.availableFor,
        location: {
          city: formData.location.city,
          country: formData.location.country,
        },
      };
    }
    await updateUser(obj);
    gaEvents("onboarding_cta", "click_onboarding_continue");
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      if (!user?.firstTime) {
        router.push("/feed?tab=new");
      }
    }
    if (!isLoggedIn && !loginLoading) {
      router.push("/login");
    }
    if (!isLoggedIn && loginLoading) {
      checkSession();
    }
  }, [user, isLoggedIn, loginLoading]);

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.name,
      });
    }
  }, [user]);

  const gaEvents = useAnalyticsEventTracker("Onboarding Page");

  useEffect(() => {
    getUserLocation()
      .then((res) => {
        if (res) {
          setFormData({
            ...formData,
            location: {
              city: res.city,
              country: res.country,
            },
          });
        } else {
          setErr(true);
        }
      })
      .catch((err) => {
        setErr(true);
      });
    if (isSuccess) {
      router.push("?tab=new");
    }
  }, [isSuccess]);

  if (loginLoading)
    return (
      <div className="flex justify-center mt-20">
        <Loader col="text-gray-800" />
      </div>
    );

  return (
    <>
      <Head>
        <title>Onboarding | Sanchar</title>
      </Head>
      <div className="flex">
        <div className="lg:w-1/2 w-full flex flex-col h-screen p-5">
          <div className="flex items-center justify-between">
            <Link href="/onboarding">
              <Image src={logo} className="w-36" alt="logo" />
            </Link>
          </div>
          <div className="w-full flex  justify-center div__height  font-poppins text-sm">
            <div className="flex flex-col lg:w-3/4 w-full">
              <p className="text-2xl text-left md:mt-10 mt-6 text-gray-700 font-bold ">
                Tell us about yourself
              </p>
              <p className="text-sm text-left mt-1 text-gray-600 font-medium ">
                All fields are required
              </p>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="flex lg:flex-row flex-col items-center gap-3">
                  <div className="relative w-full">
                    <Input
                      label="Username"
                      name="username"
                      placeholder="username"
                      labelCls="mt-4"
                      onChange={(e) => handleUsername(e.target.value)}
                      error={usernameMsg}
                    />
                    {checking && (
                      <div className="absolute right-2 top-11">
                        {" "}
                        <Loader col="text-gray-800" />{" "}
                      </div>
                    )}
                  </div>

                  <Input
                    label="Name"
                    placeholder="eg. Saurabh"
                    name="name"
                    labelCls="mt-4"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    value={formData.name}
                  />
                </div>
                <Input
                  label="Headline"
                  placeholder="eg. Full Stack Developer/ Building products for the world"
                  name="name"
                  labelCls="mt-4"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

                <Select
                  options={options}
                  label="Category"
                  labelCls="mt-4"
                  isCreatable
                  isMulti
                  onChange={(e: any) => {
                    setFormData({
                      ...formData,
                      category: e.map((i: any) => i.value),
                    });
                  }}
                />

                {/* {err ? null : ( */}
                <div className="flex md:gap-5 md:flex-row flex-col">
                  <Input
                    label="Your City"
                    placeholder="eg. New Delhi, Bangalore, etc..."
                    labelCls="mt-4"
                    name="city"
                    value={formData.location.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          city: e.target.value,
                        },
                      })
                    }
                  />
                  <Input
                    label="Country"
                    placeholder="eg. New Delhi, Bangalore, etc..."
                    labelCls="mt-4"
                    name="city"
                    value={formData.location.country}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        location: {
                          ...formData.location,
                          country: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                {/* // )} */}
                <div className="flex flex-col">
                  <Select
                    isMulti
                    options={AVAILABLE_FOR.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    label="Available for"
                    labelCls="mt-6"
                    isCreatable
                    onChange={(e: any) => {
                      // setFormData({ ...formData, availableFor: e });
                      setFormData({
                        ...formData,
                        availableFor: e.map((i: any) => i.value),
                      });
                    }}
                  />
                  {formData.availableFor.length > 3 && (
                    <p className="text-xs text-red-600 mt-1 ">
                      You can select maximum 3 options
                    </p>
                  )}
                </div>

                <TextArea
                  label="Bio"
                  placeholder="Tell me something awesome about you..."
                  labelCls="mt-4"
                  name="bio"
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
                <CustomButton
                  isLoading={loading}
                  disabled={loading}
                  type="submit"
                  variant="primaryNoOutline"
                  cls="my-6 h-12"
                >
                  Continue
                </CustomButton>
              </form>
            </div>
          </div>
        </div>
        <LoginBackground />
      </div>
    </>
  );
};

export default Onboarding;
