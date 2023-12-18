import { Layout, Link } from "@components";
import Navbar from "@components/app-components/Navbar";
import Footer from "@components/app-components/landing/Footer";
import React from "react";

const TermsPage = () => {
  const styles = {
    heading: `text-4xl font-extrabold  flex mb-8 text-black`,
    subheading: `text-xl font-bold text-black`,
  };
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto py-20">
        <div className="space-y-4 p-4 md:p-0 text-gray-600">
          <h1 className={styles?.heading}>Terms & Conditions</h1>
          <p>
            Welcome to Piqr! Please read these terms and conditions carefully
            before using the{" "}
            <Link href={"/"} className="font-medium text-primary">
              piqr.in{" "}
            </Link>
            website and its services. By accessing or using Piqr, you agree to
            be bound by these terms and conditions.
          </p>
          <h6 className={styles?.subheading}>Monetization of Skills: </h6>

          <ul className="list-disc list-inside">
            <li>
              Piqr provides tools and features that enable experts to monetize
              their skills by offering 1:1 paid sessions.{" "}
            </li>

            <li>
              Users engaging in paid sessions are responsible for setting their
              own rates, managing bookings, and providing high-quality services.
            </li>
            <li>
              {" "}
              Piqr is not responsible for any disputes or issues that may arise
              between users during paid sessions.
            </li>
          </ul>

          <h6 className={styles?.subheading}>
            Building Professional Identity:{" "}
          </h6>

          <ul className="list-disc list-inside">
            <li>
              Piqr is designed to assist young professionals in building their
              professional identity.
            </li>

            <li>
              Users can showcase their skills, accomplishments, and experiences
              as proof of work. Piqr also allows users to receive endorsements
              from other professionals to enhance their credibility and
              reputation.
            </li>
            <li>
              Users are responsible for ensuring the accuracy and authenticity
              of the information they provide on their profiles.
            </li>
          </ul>

          <h6 className={styles?.subheading}>
            Connecting with Like-Minded Professionals:
          </h6>

          <ul className="list-disc list-inside">
            <li>
              Piqr aims to help young professionals connect with like-minded
              individuals, including potential co-founders, collaborators,
              mentors, and industry peers.
            </li>

            <li>
              Users can search and discover other professionals based on their
              skills, interests, and location.
            </li>
            <li>
              Piqr does not guarantee the availability or suitability of any
              specific individual for collaboration or partnership.
            </li>
          </ul>

          <h6 className={styles?.subheading}>Finding Opportunities:</h6>

          <ul className="list-disc list-inside">
            <li>
              Piqr provides a platform for young professionals to explore
              various opportunities such as full-time jobs, freelance work,
              internships, and other career-related openings.
            </li>

            <li>
              Users can browse and apply for these opportunities; however, Piqr
              does not guarantee the availability, suitability, or outcome of
              any specific opportunity.
            </li>
            <li>
              Users are responsible for their interactions and agreements with
              potential employers, clients, or partners.
            </li>
          </ul>

          <h6 className={styles?.subheading}>General Terms:</h6>

          <ul className="list-disc list-inside">
            <li>
              Users must be at least 18 years old to use Piqr and create an
              account.
            </li>

            <li>
              Users are responsible for maintaining the confidentiality of their
              account information and for all activities that occur under their
              account.
            </li>
            <li>
              Piqr reserves the right to modify, suspend, or terminate any part
              of the services at any time without prior notice.
            </li>
            <li>
              Piqr reserves the right to modify, suspend, or terminate any part
              of the services at any time without prior notice.
            </li>
            <li>
              Users are responsible for complying with all applicable laws and
              regulations while using Piqr.
            </li>
          </ul>

          <p>
            By using Piqr, you acknowledge and agree to comply with these terms
            and conditions. If you do not agree with any part of these terms,
            please refrain from using Piqr.
          </p>
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please contact us at{" "}
            <a
              href="mailto:sunil@piqr@xyz"
              className="text-primary hover:underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              saurabh@piqr.in{" "}
            </a>{" "}
            .
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsPage;
