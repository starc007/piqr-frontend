import { ArrowSVG } from "@assets/index";
import {
  CustomButton,
  Input,
  PrivateLayout,
  Select,
  TextArea,
} from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { SKILLS } from "@utils";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const projectType = [
  { label: "Full Time", value: "3" },
  { label: "Freelance", value: "0" },
  { label: "Internship", value: "4" },
  { label: "Part Time", value: "1" },
  { label: "Contract Based", value: "2" },
];

const Paytype = [
  { label: "Annually", value: "Annually" },
  { label: "Monthly", value: "Monthly" },
  { label: "Weekly", value: "Weekly" },
  { label: "Fixed", value: "Fixed" },
  { label: "Negotiable", value: "Negotiable" },
  { label: "Hourly", value: "Hourly" },
];

const CreateOpportunity = () => {
  const [loading, setLoading] = useState(false);

  const { createOpportunity } = useAppBoundStore((state) => ({
    createOpportunity: state.createOpportunity,
  }));

  const router = useRouter();

  const [formData, setFormData] = useState<OpportunityProps>({
    title: "",
    description: "",
    skills: [],
    payType: "",
    budget: "",
    contractType: "",
    workLocation: "remote",
    recieveApplicationsVia: "piqr",
    externalLink: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.description === "" ||
      formData.skills.length === 0 ||
      formData.contractType === "" ||
      !formData.workLocation ||
      formData.recieveApplicationsVia === undefined ||
      (formData.recieveApplicationsVia === "website" &&
        formData.externalLink === "")
    ) {
      toast.error("Please fill all the required fields");
      return;
    }
    setLoading(true);
    console.log(formData);
    createOpportunity(formData, router).then(() => {
      setLoading(false);
    });
  };

  return (
    <PrivateLayout title="Post Opportunity | Piqr">
      <div className="px-4 lg:px-12 mb-20 font-poppins w-full mx-auto flex flex-col min-h-screen border-r">
        <button
          onClick={() => {
            router.back();
          }}
          className="font-medium text-dark flex items-center gap-1 text-sm mt-4"
        >
          <ArrowSVG className="-rotate-90 w-4" /> go back
        </button>
        <p className="text-dark text-3xl font-semibold mt-4">Post Job</p>
        <p className="text-sm text-gray-500 mt-3">
          Start hiring the best talent for your project/product/company
        </p>
        <form className="w-full mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Job Title"
            placeholder="Enter job title"
            isRequired
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            label="Job Type"
            placeholder="Select Opportunity Type"
            isRequired
            options={projectType}
            onChange={(e: any) =>
              setFormData({ ...formData, contractType: e.value })
            }
          />

          {/* <div className="flex md:flex-row flex-col gap-4">
            

            <Input
              label="Company Website"
              placeholder="Enter company website"
              // isRequired
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div> */}
          {/* <Input
            label="Company Name"
            placeholder="Enter company name"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          /> */}
          <Select
            label="Work Location"
            placeholder="Select Location"
            isRequired
            options={[
              { label: "Remote", value: "remote" },
              { label: "Office", value: "office" },
              { label: "Hybrid", value: "hybrid" },
            ]}
            onChange={(e: any) =>
              setFormData({ ...formData, workLocation: e.value })
            }
          />
          <TextArea
            label="Job Description"
            placeholder="Enter Detailed job description (add relevant details, links...)"
            rows={7}
            isRequired
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Select
            label="Skills"
            placeholder="Select Required skills"
            isRequired
            options={SKILLS.map((skill) => ({
              label: skill,
              value: skill,
            }))}
            isCreatable
            isMulti
            onChange={(e: any) =>
              setFormData({ ...formData, skills: e.map((i: any) => i.value) })
            }
          />
          <div className="flex flex-col space-y-4">
            <p className="font-medium text-gray-600">
              How would you like to receive applications?
            </p>
            <div className="flex md:flex-row flex-col gap-4">
              <Select
                label="Receive Applications Via"
                placeholder="Select.."
                isRequired
                options={[
                  { label: "Piqr ", value: "piqr" },
                  { label: "External Website", value: "website" },
                ]}
                defaultValue={{ label: "Piqr", value: "piqr" } as any}
                onChange={(e: any) =>
                  setFormData({ ...formData, recieveApplicationsVia: e.value })
                }
              />
              {formData.recieveApplicationsVia === "website" && (
                <Input
                  label="Website"
                  placeholder="Enter Website"
                  onChange={(e) =>
                    setFormData({ ...formData, externalLink: e.target.value })
                  }
                />
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <p className="font-medium text-gray-600">
              Pay and Time period details?
            </p>
            <div className="flex md:flex-row flex-col gap-4">
              <Input
                label="Pay Range (in Rupay)"
                placeholder="100k - 200k"
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
              />
              <Select
                label="Pay Type "
                placeholder="Select Pay Type"
                options={Paytype}
                onChange={(e: any) =>
                  setFormData({ ...formData, payType: e.value })
                }
              />
            </div>
          </div>
          <CustomButton
            type="submit"
            variant="primaryNoOutline"
            cls="w-full h-12 font-medium"
            isLoading={loading}
            disabled={loading}
          >
            Submit
          </CustomButton>
        </form>
      </div>
    </PrivateLayout>
  );
};

export default CreateOpportunity;
