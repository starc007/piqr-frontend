import { ArrowSVG, DeleteSVG } from "@assets/index";
import { Button, Image, Input, Link, PrivateLayout, Select } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { ORGANIZATION_TYPES, ORG_SECTORS } from "@utils";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

const CreateCompany = () => {
  const router = useRouter();

  const [image, setImage] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(false);

  const { createACompany } = useAppBoundStore((state) => ({
    createACompany: state.createACompany,
  }));

  const [formData, setFormData] = React.useState({
    name: "",
    website: "",
    industry: "",
    organizationType: "",
    companySize: "",
    location: "",
    tagline: "",
  });

  const isButtonDisabled =
    !formData.name ||
    !formData.website ||
    !isSelected ||
    !formData.industry ||
    !formData.organizationType ||
    !formData.companySize ||
    !formData.location ||
    !formData.tagline;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isButtonDisabled) {
      return toast.error("Please fill all the required fields");
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("website", formData.website);
    data.append("industry", formData.industry);
    data.append("organizationType", formData.organizationType);
    data.append("companySize", formData.companySize);
    data.append("location", formData.location);
    data.append("tagline", formData.tagline);
    if (image) {
      data.append("logo", image);
    }

    setLoading(true);
    await createACompany(data, router);
    setLoading(false);
    setFormData({
      name: "",
      website: "",
      industry: "",
      organizationType: "",
      companySize: "",
      location: "",
      tagline: "",
    });
  };

  return (
    <PrivateLayout title="Create Company Page | Piqr">
      <div className="lg:px-10 px-4 py-4 min-h-screen border-r w-full">
        <Button
          onClick={() => {
            router.back();
          }}
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

        <form
          className="flex md:flex-row flex-col gap-5 w-full mt-6 mb-20 md:mb-10"
          onSubmit={handleSubmit}
        >
          <div className="relative md:w-1/3 w-full">
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
                  <p className="text-xs text-gray-500">PNG,JPG,JPEG upto 3MB</p>
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

          <div className="md:w-2/3 w-full space-y-4">
            <Input
              label="Company Name"
              placeholder="Enter company name"
              isRequired
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              label="Company Website"
              placeholder="Enter company website"
              isRequired
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
            />

            <Select
              label="Industry"
              placeholder="E.g. Internet, Software, Education, etc."
              isRequired
              options={ORG_SECTORS.map((i) => ({
                label: i,
                value: i,
              }))}
              onChange={(e: any) =>
                setFormData({ ...formData, industry: e.value })
              }
            />

            <Select
              label="Number of employees"
              placeholder="-"
              isRequired
              options={[
                { label: "1-10", value: "1-10" },
                { label: "11-50", value: "11-50" },
                { label: "51-200", value: "51-200" },
                { label: "201-500", value: "201-500" },
                { label: "501-1000", value: "501-1000" },
                { label: "1001-5000", value: "1001-5000" },
                { label: "5001-10000", value: "5001-10000" },
                { label: "10000+", value: "10000+" },
              ]}
              onChange={(e: any) =>
                setFormData({ ...formData, companySize: e.value })
              }
            />
            <Select
              label="Organization type"
              placeholder="Select organization type"
              isRequired
              options={ORGANIZATION_TYPES.map((i) => ({
                label: i,
                value: i,
              }))}
              onChange={(e: any) =>
                setFormData({ ...formData, organizationType: e.value })
              }
            />
            <Input
              label="Location"
              placeholder="Enter location"
              isRequired
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
            <div>
              <Input
                label="One line pitch"
                placeholder="Enter tagline"
                isRequired
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, tagline: e.target.value })
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                Describe what your company does in just a few words. This can be
                changed later.
              </p>
            </div>

            <div className="">
              <Input
                type="checkbox"
                cls="w-4 h-4 focus:ring-0"
                onChange={(e) => setIsSelected(e.target.checked)}
              />
              <p className="text-left text-sm text-gray-600 mt-1">
                I verify that I am an authorized representative of this
                organization and have the right to act on its behalf in the
                creation and management of this page. The organization and I
                agree to the additional terms for Pages.
              </p>
              <Link
                href="/legal/company-page-terms"
                className="mt-2 text-sm text-primary hover:underline"
              >
                Read the company page terms and conditions
              </Link>
            </div>
            <Button
              isLoading={loading}
              type="submit"
              disabled={isButtonDisabled}
              variant="primary"
              cls="w-full h-12 font-medium mt-5"
            >
              Create Page
            </Button>
          </div>
        </form>
      </div>
    </PrivateLayout>
  );
};

export default CreateCompany;
// legal / company - page - terms;
