import React from "react";
import { Image } from "@components";

interface TestimonailItemProps {
  name: string;
  message: string;
}

const data = [
  {
    id: 1,
    name: "Ayush",
    message:
      "Piqr gave me my first paid opportunity as a freelancer. I'm so grateful for the connections I've made through the platform.",
  },
  {
    id: 2,
    name: "Adarsh",
    message:
      "Thanks to Piqr, I have made valuable connections and found exciting new opportunities in my field.",
  },
  {
    id: 3,
    name: "Baldeep",
    message:
      "Piqr is the perfect networking platform for young professionals - it's easy to use, highly collaborative, and has a supportive community.",
  },
  {
    id: 4,
    name: "Mohit",
    message:
      "I've found some incredible career opportunities through Piqr - it's definitely worth signing up if you're looking to advance your career.",
  },
  {
    id: 5,
    name: "Ayman",
    message:
      "The messaging system on Piqr is very efficient - it's easy to connect with other professionals and stay in touch.",
  },
  {
    id: 6,
    name: "Gurkaran",
    message:
      "The messaging system on Piqr is very efficient - it's easy to connect with other professionals and stay in touch.",
  },
];

const TestimonialItem: React.FC<TestimonailItemProps> = ({ name, message }) => {
  return (
    <div className="p-5 border lg:w-96 md:w-80 w-full rounded-xl">
      <div className="gap-4">
        <div className="flex items-center gap-3 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image
            src={`https://api.dicebear.com/6.x/identicon/svg?seed=${name}`}
            alt=""
            className="w-8 h-8 rounded-full"
          />
          <p className="text-gray-800 font-bold">{name}</p>
        </div>
        <p className="text-gray-600 pt-2">{message}</p>
      </div>
    </div>
  );
};
// grid sm:grid-cols-2 md:grid-cols-3 gap-6
const Testimonials: React.FC = () => {
  return (
    <div className="flex flex-wrap mt-10 hide__scrollbar">
      {data.map((item) => (
        <div key={item.id} className="w-max py-4 px-4">
          <TestimonialItem name={item.name} message={item.message} />
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
