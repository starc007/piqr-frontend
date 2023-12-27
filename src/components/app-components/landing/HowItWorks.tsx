import { f1, f2, f3, f4 } from "@assets/index";
import { Image, Link } from "@components";

const data = [
  {
    id: 1,
    title: "Build your Professional Brand",
    description:
      "Build your professional brand and get discovered by the best minds in the world",
    img: f1,
    url: "/login",
  },
  {
    id: 2,
    title: "Apply for jobs curated for you",
    description:
      "Apply for jobs and get hired by the best companies in the world",
    img: f2,
    url: "/jobs?type=all",
  },
  {
    id: 3,
    title: "Discover and Connect ",
    description:
      "Discover, connect and collaborate with the best minds in your city",
    img: f3,
    url: "/explore?type=all",
  },
  {
    id: 4,
    title: "Share your ideas",
    description:
      "Share your ideas, start a discussion, get feedback and grow together",
    img: f4,
    url: "/feed",
  },
];

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center container mx-auto">
      <h2 className="md:text-5xl text-4xl font-bold max-w-2xl text-center">
        Empower your <span className="line2svg">Professional</span> life with
        Piqr
      </h2>
      <div className="flex lg:flex-row flex-wrap flex-col justify-center gap-8 mt-16 w-full">
        {data?.map((item) => (
          <div
            key={item.id}
            className="bg-lightGray rounded-[2.5rem] lg:w-1/3 w-full py-10 px-12"
          >
            <Image src={item.img.src} alt="img" className="w-64" />
            <div className="md:text-left text-center mt-2">
              <p className="md:text-4xl text-4xl font-bold">{item.title}</p>
              <p className="mt-3 font-medium">{item.description}</p>
              <Link
                href={item.url}
                className="relative mt-5 flex h-12 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-dark before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white">
                  {item?.id === 2 ? "Browse Now" : "Get Started"}
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;

const hireData = [
  {
    id: 1,
    title: "Find your next opportunity",
    tageLine: "Looking for work?",
    description:
      "Browse new opportunities or boost your portfolio to get discovered.",
  },
  {
    id: 2,
    title: "Hire the best Talent",
    tageLine: "Looking to hire?",
    description:
      "Find the best talent from a global pool of professionals and get your work done.",
  },
];

export const HireOrGetHired = () => {
  return (
    <div className="flex lg:flex-row flex-wrap flex-col justify-center gap-8 w-full container mx-auto">
      {hireData?.map((item) => (
        <div
          key={item.id}
          className="bg-lightGray rounded-[2.5rem] lg:w-2/5 w-full py-10 px-12"
        >
          <p className="font-semibold flex justify-center items-center rounded-full w-44 h-9 bg-secondary">
            {item.tageLine}
          </p>
          <p className="md:text-5xl text-3xl font-bold mt-5 max-w-sm">
            {item.title}
          </p>
          <p className="mt-6 font-medium max-w-sm text-lg">
            {item.description}
          </p>
          <Link
            href={item?.id === 1 ? "/jobs?type=all" : "/explore?type=all"}
            className="relative mt-6 flex h-12 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-dark before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
          >
            <span className="relative text-base font-semibold text-white">
              {item?.id === 1 ? "Find Work" : "Find Professionals"}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};
