import { ArrowSVG, DeleteSVG } from "@assets/index";
import { Button, Image, Input, Layout, PrivateLayout } from "@components";
import { useRouter } from "next/router";
import React from "react";

const CreateCompany = () => {
  const router = useRouter();

  const [image, setImage] = React.useState<File | null>(null);

  return (
    <PrivateLayout title="Create Company Page | Piqr">
      <div className="lg:px-10 px-4 py-4 min-h-screen border-r w-full">
        <Button
          onClick={() => {
            router.back();
          }}
          //   variant="tertiary"
          cls="font-medium flex items-center px-4 py-1.5"
        >
          <ArrowSVG className="-rotate-90 w-4 mr-1" /> go back
        </Button>
        <p className="text-dark text-3xl font-semibold mt-4">
          Setup your company page
        </p>
        <p className="text-sm text-gray-500 mt-3">
          Start hiring the best talent for your company
        </p>

        <form className="md:w-2/3 w-full mt-6 space-y-4">
          <Input
            label="Company Name"
            placeholder="Enter company name"
            isRequired
          />
          <Input
            label="Company Website"
            placeholder="Enter company website"
            isRequired
          />
          <div className="relative">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Logo
            </label>
            <label className="flex flex-col w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary/30">
              {image ? (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="logo"
                  className="w-20 h-20 object-cover object-center"
                />
              ) : (
                <div className="space-y-1 text-center">
                  <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                      />
                    </svg>
                  </div>
                  <p>Click to upload</p>
                  <p className="text-xs text-gray-500">PNG,JPG,JPEG upto 5MB</p>
                </div>
              )}
              <Input
                accept="image/*"
                type="file"
                cls="sr-only"
                multiple={false}
                onChange={(e) => {
                  if (e.target.files) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </label>

            {image && (
              <Button
                variant="tertiary"
                onClick={() => {
                  setImage(null);
                }}
                cls="absolute top-7 right-1 w-10 h-10"
              >
                <DeleteSVG className="w-5" />
              </Button>
            )}
          </div>
        </form>
      </div>
    </PrivateLayout>
  );
};

export default CreateCompany;
