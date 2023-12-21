import { Layout } from "@components";
import Navbar from "@components/app-components/Navbar";
import Footer from "@components/app-components/landing/Footer";

const ContactPage = () => {
  const styles = {
    heading: `text-2xl md:text-5xl font-extrabold`,
    subheading: `text-lg md:text-2xl font-bold mb-4`,
    text: `font-medium text-xl text-gray-700 `,
    card: `border-2 border-primary shadow-xl rounded-xl p-8`,
  };

  const contactDetails = {
    phoneNo: "9458001779",
    email: "saurabh@piqr.in",
  };
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto py-20">
        <div className="pt-9 p-4">
          <h1 className={styles.heading}>{"Let's"} Connect!</h1>
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className={styles.card}>
              <h6 className={styles.subheading}>React Out</h6>
              <p className={styles.text}>+91 {contactDetails.phoneNo}</p>
              <a
                className={`${styles.text} text-primary`}
                href={`mailto:${contactDetails.email}`}
              >
                {contactDetails.email}
              </a>
            </div>
            {/* <div className={styles.card}>
              <h6 className={styles.subheading}>Address</h6>
              <address className={styles.text}>
                PLOT NO. 18 KHASRA 735/2/1 ,<br />
                JHALAMAND, JODHPUR , <br />
                RJ 342005 IN
              </address>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
