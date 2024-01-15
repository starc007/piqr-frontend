import { Layout } from "@components";
import { ORG_NAME } from "@utils";
import React from "react";

const CompanyPageTerms = () => {
  return (
    <Layout>
      <div className="p-8 mb-10">
        <h1 className="text-3xl font-semibold">Company Page Terms</h1>

        <p className="text-gray-600 mt-3">
          These Company Page Terms of Use ("Terms") govern the use of the
          Company Page feature on {ORG_NAME} ("Platform") by company founders,
          authorized representatives, or individuals with the authority to
          create and manage a company page ("User" or "You"). By creating and
          managing a Company Page on {ORG_NAME}, you agree to comply with these
          Terms.
        </p>

        <h2 className="font-medium text-lg mt-5">1. Eligibility</h2>
        <p className="text-gray-600 mt-3">
          You must be a founder, authorized representative, or an individual
          with the authority to create and manage a company page on {ORG_NAME}.
          By creating a Company Page, you represent and warrant that you have
          the authority to bind the company to these Terms.
        </p>
        <h2 className="font-medium text-lg mt-5">2. Content Guidelines</h2>
        <p className="text-gray-600 mt-3">
          2.1. Accurate Information: You agree to provide accurate, up-to-date,
          and truthful information about your company on the Company Page.
        </p>
        <p className="text-gray-600 mt-3">
          2.2. Compliance: Your Company Page content must comply with all
          applicable laws and regulations. {ORG_NAME} reserves the right to
          remove any content that violates these Terms or is deemed
          inappropriate.
        </p>
        <h2 className="font-medium text-lg mt-5">3. Ownership and Control</h2>
        <p className="text-gray-600 mt-3">
          You retain ownership of all content and information you submit to your
          Company Page. {ORG_NAME} does not claim ownership but requires the
          necessary rights to host and display your content on the Platform.
        </p>
        <h2 className="font-medium text-lg mt-5">4. User Responsibilities</h2>
        <p className="text-gray-600 mt-3">
          4.1. Security: You are responsible for maintaining the security of
          your account and the Company Page.
        </p>
        <p className="text-gray-600 mt-3">
          4.2. Unauthorized Access: You agree not to share your login
          credentials and to notify {ORG_NAME} immediately of any unauthorized
          access to your account.
        </p>
        <h2 className="font-medium text-lg mt-5">5. Termination</h2>
        <p className="text-gray-600 mt-3">
          Either party may terminate these Terms at any time. If you wish to
          terminate the agreement: (1) Remove all Administrators of the Company
          Page, including yourself (and others, if applicable). (2) Deactivate
          the Company Page. (3) If you are the sole Administrator, close your
          {ORG_NAME} account. (4) Notify {ORG_NAME} through the Contact Us
          feature. {ORG_NAME} has the discretion to terminate this agreement by
          deactivating the Company Page and/or providing notice to at least one
          Administrator or the Organization. It's important to note that{" "}
          {ORG_NAME} is not obligated to deactivate the Company Page even after
          termination.
        </p>

        <h2 className="font-medium text-lg mt-5">6. Modification of Terms</h2>
        <p className="text-gray-600 mt-3">
          We reserve the right to modify these Terms periodically. In the event
          of material changes to the Terms, we will make reasonable efforts to
          notify you through our Business Services or by other means, providing
          you with the opportunity to review the changes before they take
          effect. Please be aware that these modifications cannot be applied
          retroactively. Should you object to any of the changes, you have the
          option to terminate your agreement with these Terms in accordance with
          Section 5. However, if you choose not to terminate the agreement, your
          continued use of our Business Services following the publication or
          notification of the changes indicates your consent to the updated
          terms.
        </p>
        <h2 className="font-medium text-lg mt-5">7. Governing Law</h2>
        <p className="text-gray-600 mt-3">
          These Terms are governed by and construed in accordance with the laws
          of [Jurisdiction]. Any disputes arising out of or relating to these
          Terms shall be resolved through arbitration in accordance with the
          rules of the [Arbitration Association]. Both parties agree to submit
          to the exclusive jurisdiction of the courts of [Jurisdiction] for the
          resolution of any disputes not subject to arbitration. By creating a
          Company Page on {ORG_NAME}, you acknowledge that you have read,
          understood, and agree to be bound by the governing law and dispute
          resolution mechanisms outlined in this section.
        </p>
      </div>
    </Layout>
  );
};

export default CompanyPageTerms;
