/* eslint-disable @next/next/no-img-element */
import { CustomTooltip, Image, Loader, PrivateLayout } from "@components";
import {
  CameraSVG,
  EducationSVG,
  LinkTilted,
  SaveSVG,
  SuitcaseSVG,
  VerifiedSVG,
  locationIcon,
} from "@assets";
import { Button, Input, TextArea } from "@components";
import AddEducationModal from "@appComp/edit-profile/AddEducation";
import AddHighlightModal from "@appComp/edit-profile/AddHighlightModal";
import AddLinkModal from "@appComp/edit-profile/AddLinkModal";
import AddPositionModal from "@appComp/edit-profile/AddPositionModal";
import { useAppBoundStore } from "@store";
import Skills from "@appComp/profile/skills";
import Socials from "@appComp/profile/socials";
import AvailableFor from "@appComp/profile/AvailableFor";
import SkillnAvailableForModal from "@appComp/edit-profile/SkillnAvailableForModal";
import { useEffect, useState } from "react";
import { arrayCompare, debounce, validUsername } from "@utils";
import Educations from "@appComp/profile/education";
import Positions from "@appComp/profile/positions";
import Highlight from "@appComp/profile/work";
import { toast } from "react-hot-toast";
import useAnalyticsEventTracker from "@hooks/useAnalyticsEventTracker";
import { __updateProfileImage } from "@api/api";

const boxStyle =
  "flex items-center justify-center p-1 lg:h-14 lg:w-14 w-12 h-12 border border-primary/30 rounded-full";
const boxtitle = "font-semibold text-left lg:text-base text-sm";
const boxSubtitle = "text-gray-600 text-left lg:text-sm text-xs";

const AddProfile = () => {
  const {
    openAddEducationModal,
    openAddHighlightModal,
    openAddPositionModal,
    user,
    dataToUpdate,
    setDatatoUpdate,
    setUsernameMsg,
    checkUsername,
    usernameMsg,
    updateUser,
    activity,
    education,
    workExp,
    profileLoading,
  } = useAppBoundStore((state) => ({
    openAddEducationModal: state.openAddEducationModal,
    openAddHighlightModal: state.openAddHighlightModal,
    openAddPositionModal: state.openAddPositionModal,
    user: state.user,
    dataToUpdate: state.dataToUpdate,
    setDatatoUpdate: state.setDatatoUpdate,
    setUsernameMsg: state.setUsernameMsg,
    checkUsername: state.checkUsername,
    usernameMsg: state.usernameMsg,
    updateUser: state.updateUser,
    activity: state.activity,
    education: state.education,
    workExp: state.workExp,
    profileLoading: state.profileLoading,
  }));

  const [checking, setChecking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [imageToUpload, setImageToUpload] = useState<File>();

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

    if (user?.username === value) {
      setChecking(false);
      return;
    }
    setDatatoUpdate({
      ...dataToUpdate,
      username: value,
    });
    checkUsername(value).then((res) => {
      setChecking(false);
    });
  }, 500);

  const gaEvents = useAnalyticsEventTracker("Edit Profile");

  const handleSubmit = async () => {
    const {
      name,
      username,
      bio,
      location,
      availableFor,
      skills,
      title,
      avatar,
    } = dataToUpdate;
    const obj: Partial<UpdateUserProps> = {};
    if (name?.length === 0) return toast.error("Name cannot be empty");
    if (name && name !== user?.name) obj.name = name;
    // if()
    if (username && username !== user?.username) obj.username = username;
    if (bio && bio !== user?.bio) obj.bio = bio;

    if (!location || !location.city)
      return toast.error("Please enter location");

    if (location && location.city !== user?.location?.city)
      obj.location = location;

    if (!title) return toast.error("Your headline is important");
    if (title && title !== user?.title) obj.title = title;
    if (avatar && avatar !== user?.avatar) obj.avatar = avatar;

    const availableCheck = arrayCompare(availableFor!, user?.availableFor!);
    if (!availableCheck) obj.availableFor = availableFor;

    const skillsCheck = arrayCompare(skills!, user?.skills!);
    if (!skillsCheck) obj.skills = skills;

    if (obj.availableFor === undefined) delete obj.availableFor;
    if (obj.skills === undefined) delete obj.skills;

    if (Object.keys(obj).length === 0) {
      return;
    }

    gaEvents("update_profile", "Update Profile");

    setLoading(true);
    await updateUser(obj);
    setLoading(false);
    setIsChanged(false);
    window.onbeforeunload = null;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    const fileSize = (file.size / 1024 / 1024).toFixed(4);
    if (Number(fileSize) > 3) {
      toast.error("Max file size allowed is 3 MB.");
      return;
    }
    setImageToUpload(file);
  };

  const updateProfilePic = async () => {
    if (!imageToUpload) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("file", imageToUpload);
    __updateProfileImage(formData).then((res) => {
      if (res.success) {
        toast.success("Profile picture updated!!");
        setDatatoUpdate({
          ...dataToUpdate,
          avatar: URL.createObjectURL(imageToUpload),
        });
        setImageToUpload(undefined);
      }
    });
  };

  const isDataChanged = () => {
    const {
      name,
      username,
      bio,
      location,
      availableFor,
      skills,
      title,
      avatar,
    } = dataToUpdate;
    if (name && name !== user?.name) return true;
    if (username && username !== user?.username) return true;
    if (bio && bio !== user?.bio) return true;
    if (location && location.city !== user?.location?.city) return true;
    if (title && title !== user?.title) return true;
    if (avatar && avatar !== user?.avatar) return true;

    const availableCheck = arrayCompare(availableFor!, user?.availableFor!);
    if (!availableCheck) return true;

    const skillsCheck = arrayCompare(skills!, user?.skills!);
    if (!skillsCheck) return true;

    return false;
  };

  useEffect(() => {
    if (isDataChanged()) {
      setIsChanged(true);
      window.onbeforeunload = () => true;
    } else {
      setIsChanged(false);
      window.onbeforeunload = null;
    }
  }, [dataToUpdate]);

  return profileLoading ? (
    <Loader loaderType="bars" barsCount={4} />
  ) : (
    <PrivateLayout title="Edit Profile">
      <div className="lg:px-6 px-4 max-w-6xl mx-auto font-poppins min-h-screen border-r py-4">
        <CustomTooltip id="saveProfile" />
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h6 className="font-bold lg:text-2xl text-lg text-gray-500">
              {user?.name.substring(0, 10) +
                (user?.name?.length! > 10 ? "..." : "")}{" "}
              / <span className="text-gray-900">Edit Profile</span>
            </h6>
          </div>
          <Button
            onClick={handleSubmit}
            isLoading={loading}
            disabled={loading || !isChanged}
            variant="secondary"
            cls="w-32 h-10 text-sm flex"
          >
            Save changes
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 mt-5 ">
          <div className="flex flex-col gap-3 lg:border-r lg:pr-8 border-gray-300 lg:w-1/4 w-full ">
            <div className="w-full flex justify-center">
              <Image
                className="rounded-xl overflow-hidden h-40 w-40 aspect-square object-center object-cover"
                src={
                  imageToUpload
                    ? URL.createObjectURL(imageToUpload)
                    : user?.avatar
                }
                alt="pfp"
              />
            </div>
            <div className="flex justify-center gap-4 w-full">
              <div className="relative w-1/2 h-10 cursor-pointer">
                <Input
                  type="file"
                  cls="absolute z-10 opacity-0 h-full w-full cursor-pointer"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
                <Button cls="py-2 gap-2 w-full border rounded-full">
                  <CameraSVG />
                  Edit
                </Button>
              </div>
              <Button
                onClick={updateProfilePic}
                disabled={!imageToUpload}
                data-tooltip-content="Save Profile"
                data-tooltip-id="saveProfile"
                cls={`${
                  imageToUpload
                    ? "bg-primary text-white cursor-pointer"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-100"
                } py-2 gap-2 w-10 h-10 rounded-full border  duration-200 ease-out hover:border-gray-300`}
              >
                <SaveSVG className="w-5" />
              </Button>
            </div>
            <div className="relative">
              <Input
                isRequired
                label="Name"
                defaultValue={user?.name}
                cls="text-sm font-medium"
                onChange={(e) => {
                  setDatatoUpdate({ ...dataToUpdate, name: e.target.value });
                }}
              />
            </div>

            <div className="relative">
              <Input
                isRequired
                label="Username"
                name="username"
                placeholder="username"
                labelCls="mt-4"
                onChange={(e) => handleUsername(e.target.value)}
                error={usernameMsg}
                defaultValue={user?.username}
              />
              {checking && (
                <div className="absolute right-2 top-11">
                  {" "}
                  <Loader col="text-gray-800" />{" "}
                </div>
              )}
            </div>
            {/* Social Media Icons */}
          </div>
          <div className="flex-1 gap-4 space-y-4 lg:pl-4 lg:3/4 w-full">
            <div className="flex lg:flex-row flex-col gap-4">
              <Input
                label="Headline"
                defaultValue={user?.title}
                cls="text-sm font-medium"
                onChange={(e) => {
                  setDatatoUpdate({ ...dataToUpdate, title: e.target.value });
                }}
                isRequired
              />
              <div className="relative  max-w-sm w-full">
                <Input
                  isRequired
                  label="Location"
                  cls="pl-8 text-sm font-medium"
                  placeholder="Bangalore, India"
                  defaultValue={
                    user?.location?.city
                      ? user?.location?.city + ", " + user?.location?.country
                      : ""
                  }
                  onChange={(e) => {
                    const city = e.target.value?.split(",")[0];
                    const country = e.target.value?.split(",")[1];

                    setDatatoUpdate({
                      ...dataToUpdate,
                      location: { country: country, city: city },
                    });
                  }}
                />
                <Image
                  src={locationIcon.src}
                  alt="location-icon"
                  height={18}
                  width={18}
                  className="absolute text-primary inset-y-1/2 mt-[2px] left-2"
                />
              </div>
            </div>
            <div>
              <TextArea
                cls="mb-4 text-sm font-medium whitespace-pre-line"
                label="Decription about you"
                defaultValue={user?.bio}
                onChange={(e) => {
                  setDatatoUpdate({ ...dataToUpdate, bio: e.target.value });
                }}
              />
            </div>
            <AvailableFor />
            <Skills />
            <Socials />
          </div>
        </div>
        <hr className="mt-8" />
        <div>
          <div className="my-4">
            <h6 className="font-bold text-primary text-xl">
              {" "}
              Few things about yourself{" "}
            </h6>
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <p className="text-gray-500 font-semibold my-2">Education</p>
                <button
                  onClick={openAddEducationModal}
                  className="border w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 duration-200 ease-out hover:border-gray-300  group"
                >
                  <div className={boxStyle}>
                    <EducationSVG className="fill-primary" />
                  </div>
                  <div>
                    <p className={boxtitle}>School / Institute</p>
                    <p className={boxSubtitle}>Add your education</p>
                  </div>
                </button>
                <div>
                  <Educations isEditable={true} education={education} />
                </div>
              </div>
              <div>
                <p className="text-gray-500 font-semibold my-2">Job</p>
                <button
                  onClick={openAddPositionModal}
                  className="border w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 duration-200 ease-out border-primary/20  group"
                >
                  <div className={boxStyle}>
                    <SuitcaseSVG className="fill-primary" />
                  </div>
                  <div>
                    <p className={boxtitle}>Work Experience</p>
                    <p className={boxSubtitle}>Add your position</p>
                  </div>
                </button>
                <div>
                  <Positions isEditable={true} workExp={workExp} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-8" />
        <div className="mb-28 lg:mb-0">
          <div className="my-4">
            <h6 className="font-bold text-primary text-xl">
              {" "}
              Projects/Portfolios
            </h6>
            <div className="gap-4">
              <div>
                <button
                  onClick={openAddHighlightModal}
                  className="border w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 duration-200 ease-out hover:border-gray-300 mt-4 group"
                >
                  <div className={boxStyle}>
                    <LinkTilted className="fill-primary" />
                  </div>
                  <div>
                    <p className={boxtitle}>Proof of work</p>
                    <p className={boxSubtitle}>
                      Add your website, client sites.
                    </p>
                  </div>
                </button>
                <Highlight isEditable={true} activity={activity} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddEducationModal />
      <AddPositionModal />
      <AddLinkModal />
      <AddHighlightModal />
      <SkillnAvailableForModal />
    </PrivateLayout>
  );
};

export default AddProfile;
