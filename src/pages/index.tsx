import { __getTopUsersToShow } from "@api/api";
import { companies } from "@assets/companies";
import { Chirp3SVG, Chirp4SVG } from "@assets/index";
import { Button, Image } from "@components";
import ShowProfile from "@components/app-components/ShowProfile";

import Footer from "@components/app-components/landing/Footer";
import Hero from "@components/app-components/landing/Hero";
import HowItWorks, {
  HireOrGetHired,
} from "@components/app-components/landing/HowItWorks";
import Testimonials from "@components/app-components/landing/Testimonials";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const c = Object.values(companies);

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const initialLoad = useRef(true);
  const router = useRouter();

  const loadProfiles = async () => {
    try {
      const res = await __getTopUsersToShow();
      if (res.success) {
        setProfiles(res.data as any);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      loadProfiles();
    }
  }, []);

  return (
    <>
      <Head>
        <title>A New Age Professional Network | Piqr</title>
        <meta
          name="description"
          content="Piqr is a new age professional network for freelancers, founders, students, and professionals. Join Piqr today and experience the future of networking."
        />
        <meta
          name="keywords"
          content="Piqr, Talent, Networking, Founders, hackathon partners, students,comission free, social, network, discover freelancers,Jobs"
        />
        <meta name="author" content="Piqr" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Hero />
      <section className="w-full md:py-20 py-32">
        <div className="container mx-auto flex flex-col items-center">
          <p className="font-semibold flex justify-center items-center rounded-full w-80 h-8 text-sm bg-secondary">
            Trusted by Top Companies Professionals
          </p>
          <h2 className="md:text-4xl text-3xl font-bold text-center max-w-2xl mt-6">
            Professionals from Top <span className="line2svg">companies</span>{" "}
            have joined Piqr
          </h2>
        </div>
        <div className="mt-10 flex overflow-x-hidden">
          <div className="py-12 slide-track flex gap-10">
            {c.map((item, i) => (
              <Image
                key={i}
                src={item}
                alt="company"
                className="w-full h-10 slide"
              />
            ))}
            {c.map((item, i) => (
              <Image
                key={i}
                src={item}
                alt="company"
                className="w-full h-10 slide"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 md:py-40 py-20">
        <HowItWorks />
      </section>

      <section className="bg-dark lg:py-0 py-16 px-4 lg:px-0 overflow-hidden">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center lg:flex-row flex-col gap-6">
          <div className="flex flex-col lg:w-1/2 w-full">
            <p className="font-semibold flex justify-center items-center rounded-full w-36 h-8 text-sm bg-secondary">
              Best Professionals
            </p>
            <h2 className="text-white font-semibold text-5xl lg:text-7xl lg:leading-[5rem] mt-4">
              Connect with <span className="text-secondary">Best</span> Talented
              minds across <span className="text-secondary">60+</span> different
              fields.
            </h2>
          </div>
          <ShowProfile profiles={profiles} />
        </div>
      </section>

      <section className="px-4 py-40">
        <HireOrGetHired />
      </section>

      {/* Testimonials */}
      <section className="max-w-screen-xl mx-auto flex flex-col justify-center p-4 py-20 overflow-x-auto">
        <h2 className="font-semibold text-3xl md:text-4xl">
          What people who love <span className="text-secondary">Piqr</span> say!
        </h2>
        <Testimonials />
      </section>

      <section className=" bg-lightGray px-4 md:px-0 py-40 flex flex-col items-center justify-center relative">
        <div className="absolute -top-20 right-0 md:block hidden">
          <Chirp3SVG />
        </div>
        <div className="absolute top-40 left-0 lg:block hidden">
          <Chirp4SVG />
        </div>
        <h6 className="text-3xl md:text-5xl lg:text-6xl max-w-5xl text-center md:leading-[4rem] font-semibold">
          Join today and experience the future of networking.
        </h6>
        <Button
          onClick={() => router.push("/login")}
          cls="w-44 h-14 mt-8 font-semibold"
        >
          Join Piqr
        </Button>
      </section>
      <Footer />
    </>
  );
};

export default Home;
