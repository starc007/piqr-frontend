import { Layout, Link } from "@components";
import Navbar from "@components/app-components/Navbar";
import Footer from "@components/app-components/landing/Footer";
import React from "react";

const PrivacyPolicyPage = () => {
  const styles = {
    heading: `text-4xl font-extrabold  flex mb-8 text-black`,
    subheading: `text-xl font-bold text-black`,
  };
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto py-20">
        <div className="space-y-4 p-4 md:p-0 text-gray-600">
          <h1 className={styles?.heading}>Privacy Policy</h1>
          <p>
            At{" "}
            <Link href={"/"} className="font-medium text-primary">
              {" "}
              piqr.xyz{" "}
            </Link>
            , we are committed to protecting your privacy and ensuring that your
            personal information is handled in a safe and responsible way. This
            Privacy Policy outlines how we collect, use, disclose, and protect
            your personal information.
          </p>
          <h2 className={styles?.subheading}>
            What Information Do We Collect?
          </h2>
          <p>
            When you use our website or services, we may collect personal
            information such as your name, email address, phone number, IP
            address, and other information that you provide to us voluntarily.
            We may also collect information about your usage of our website or
            services, including the pages you view and the links you click on.
          </p>
          <h2 className={styles?.subheading}>
            How Do We Use Your Information?
          </h2>
          <p>
            We may use your personal information for the following purposes:
          </p>
          <ul className="list-disc list-inside">
            <li> To provide our services to you</li>
            <li> To communicate with you regarding our services</li>
            <li> To personalize your experience on our website</li>
            <li> To improve our website and services</li>
            <li>
              To send you promotional offers and marketing messages (if you have
              consented to receive them)
            </li>
          </ul>
          <p>
            We may also use your information for any other purpose that is
            disclosed to you and to which you consent.
          </p>
          <h2 className={styles?.subheading}>
            How Do We Share Your Information?
          </h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent. However, we may
            share your information with third-party service providers who help
            us operate our website or provide our services. These service
            providers are bound by confidentiality agreements and are not
            allowed to use your personal information for any other purpose than
            to help us provide our services. We may also disclose your personal
            information if required by law or to protect our rights or the
            rights of others.
          </p>
          <h2 className={styles?.subheading}>
            How Do We Protect Your Information?
          </h2>
          <p>
            We take the security of your personal information seriously and take
            appropriate measures to protect it. We use a variety of physical,
            technical, and administrative safeguards to keep your personal
            information safe from unauthorized access, disclosure, or misuse.
            However, no method of transmission over the internet or electronic
            storage is completely secure, so we cannot guarantee absolute
            security of your personal information.
          </p>
          <h2 className={styles?.subheading}>Your Rights</h2>
          <p>
            You have the right to access, update, and delete your personal
            information that we have collected, subject to certain exceptions
            provided by law. You may also opt out of receiving promotional
            offers and marketing messages at any time.
          </p>
          <h2 className={styles?.subheading}>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on our website, and your continued use of our website
            or services after the changes are posted will signify your
            acceptance of the new Privacy Policy.
          </p>
          <h2 className={styles?.subheading}>Contact Us</h2>
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

export default PrivacyPolicyPage;
