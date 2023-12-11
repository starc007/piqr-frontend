import { Image, Link } from "@components";
import React from "react";
import { useRouter } from "next/router";
import { logo } from "@assets/index";

const Hero = () => {
  return (
    <section className="py-5 md:min-h-[85vh] px-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-[#2efb79]"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-tertiary"></div>
      </div>

      {/* </div> */}
      <div className="container mx-auto">
        <div className="flex justify-between text-dark">
          {/* <Link href="/" className="text-3xl font-bold">
            Sanchar
          </Link> */}
          <Link href="/">
            <Image src={logo} className="w-36" alt="logo" />
          </Link>
          <Link
            href="/login"
            className="relative before:shadow-lg flex h-11 w-24 items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
          >
            <span className="relative text-base font-semibold text-white">
              Login
            </span>
          </Link>
        </div>
        <div className="relative md:pt-36 pt-20">
          <div className=" text-center mx-auto max-w-6xl">
            <p className="text-gray-500 font-semibold border rounded-full w-44 py-1 text-sm mx-auto cursor-pointer hover:text-dark/90 hover:border-dark/80 transition-colors duration-300">
              Connect. Learn. Earn.
            </p>
            <h1
              className="text-dark font-bold text-4xl md:text-7xl mt-5"
              style={{
                lineHeight: 1.3,
                letterSpacing: -0.03,
              }}
            >
              A New Age <span className="linesvg">Professional</span> <br />{" "}
              Network
            </h1>

            <h5 className="mt-4 max-w-2xl mx-auto font-medium">
              Professional network for freelancers, entrepreneurs, developers,
              designers.....
            </h5>

            <div className="mt-7 flex justify-center">
              <Link
                href="/login"
                className="relative before:shadow-lg flex h-12 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-base font-semibold text-white">
                  Join Sanchar
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
