import { __getCompaniesByName } from "@api";
import { ArrowSVG } from "@assets/index";
import { Button, Input, PrivateLayout, Select, TextArea } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { JOB_TYPE, SKILLS, debounce } from "@utils";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

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

  const { createJob } = useAppBoundStore((state) => ({
    createJob: state.createJob,
  }));

  const router = useRouter();

  const [formData, setFormData] = useState<OpportunityProps>({
    title: "",
    description: "",
    skills: [],
    salaryRange: "",
    interval: "",
    companyId: "",
    workLocation: "remote",
    recieveApplicationsVia: "piqr",
    externalLink: "",
    jobType: "",
    experience: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.title === "" ||
      formData.description === "" ||
      formData.skills.length === 0 ||
      formData.jobType === "" ||
      !formData.workLocation ||
      formData.recieveApplicationsVia === undefined ||
      (formData.recieveApplicationsVia === "website" &&
        formData.externalLink === "")
    ) {
      toast.error("Please fill all the required fields");
      return;
    }
    setLoading(true);
    createJob(formData, router).then(() => {
      setLoading(false);
    });
  };

  const getData = (inputValue: string, callback: any) => {
    __getCompaniesByName({
      name: inputValue,
    }).then((res) => {
      const dataFilter = res?.data?.map((item: any) => ({
        value: item._id,
        label: item.name,
        image: item.logo,
      }));
      callback(dataFilter);
    });
  };

  const debouncedLoadOptions = debounce(getData, 500);

  const isCompanyRequired = formData.jobType === "1";
  const isPartialyCompanyRequired = formData.jobType === "2";
  const isShowCompany = isCompanyRequired || isPartialyCompanyRequired;

  return (
    <PrivateLayout title="Post Opportunity | Piqr">
      <div className="px-4 lg:px-12 mb-20 w-full mx-auto flex flex-col min-h-screen border-r">
        <Button
          onClick={() => {
            router.back();
          }}
          cls="font-medium flex items-center px-4 py-1.5 w-28 mt-3"
        >
          <ArrowSVG className="-rotate-90 w-4 mr-1" /> go back
        </Button>
        <p className="text-dark text-3xl font-semibold mt-4">Post a Job</p>
        <p className="text-sm text-gray-500 mt-3">
          Start hiring the best talent for your project/product/company
        </p>
        <form className="w-2/3 mt-6 space-y-4" onSubmit={handleSubmit}>
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
            options={JOB_TYPE}
            onChange={(e: any) =>
              setFormData({ ...formData, jobType: e.value })
            }
          />

          {isShowCompany && (
            <Select
              label="Select Company"
              isAsync
              isRequired={isCompanyRequired}
              // @ts-ignore
              loadOptions={debouncedLoadOptions}
              placeholder="Type company name"
              onChange={(e: any) => {
                setFormData({ ...formData, companyId: e.value });
              }}
            />
          )}

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
          <Input
            label="Experience"
            isRequired
            placeholder="Enter Experience, e.g. 2-3 years"
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
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
                  setFormData({ ...formData, salaryRange: e.target.value })
                }
              />
              <Select
                label="Pay Interval"
                placeholder="Select Pay Type"
                options={Paytype}
                onChange={(e: any) =>
                  setFormData({ ...formData, interval: e.value })
                }
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="primary"
            cls="w-full h-12 font-medium"
            isLoading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </form>
      </div>
    </PrivateLayout>
  );
};

export default CreateOpportunity;
