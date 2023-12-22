import { Layout, Link } from "@components";
import Navbar from "@components/app-components/Navbar";
import Footer from "@components/app-components/landing/Footer";
import React from "react";

const RefundPolicyPage = () => {
  const styles = {
    heading: `text-4xl font-extrabold  flex mb-8 text-black`,
    subheading: `text-xl font-bold text-black`,
  };
  return (
    <>
      <Navbar isHero />
      <div className="max-w-screen-xl mx-auto py-20">
        <div className="space-y-4 p-4 md:p-0 text-gray-600">
          <h1 className={styles?.heading}>Refund Policy</h1>
          <p>
            Cancellation and Refund Policy for
            <Link href={"/"} className="font-medium text-primary">
              {" "}
              piqr.in{" "}
            </Link>
          </p>
          <p>
            At Piqr, we value the satisfaction and trust of our users. We
            understand that circumstances may change, and sometimes cancellation
            or refund requests may arise. Below is our policy regarding
            cancellations and refunds for the services provided on piqr.in:
          </p>
          <h2 className={styles?.subheading}>
            Paid 1:1 Sessions with Experts:
          </h2>
          <p>
            <em className="font-semibold text-black">Cancellation: </em>Users
            can cancel their paid 1:1 sessions with experts by providing at
            least 24 {"hours'"} notice prior to the scheduled session time. Any
            cancellations made within 24 hours of the session may not be
            eligible for a refund.
          </p>
          <p>
            <em className="font-semibold text-black">Refund: </em>Refunds for
            cancelled sessions will be processed within 7-10 business days,
            excluding any transaction fees incurred during the refund process.
          </p>

          <p>
            Please note that the above policy is subject to change and may be
            updated from time to time. We encourage users to review the policy
            periodically for any changes.
          </p>

          <p>Thank you for choosing Piqr!</p>
          <p>
            Best regards,
            <br />
            Piqr Team
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

export default RefundPolicyPage;
