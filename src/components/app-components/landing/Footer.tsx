import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121212] w-full text-white py-8 md:py-20  ">
      <div className="max-w-screen-xl mx-auto flex flex-col p-4">
        <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="md:col-span-2 space-y-4">
            <p className="font-bold text-2xl">Piqr</p>
            <p className="text-neutral-400 max-w-sm">
              Empowering Professionals, Connecting Possiblities
            </p>
          </div>
          <div className="col-span-1 space-y-4">
            <p className="font-bold text-lg">PRODUCT</p>
            <Link
              href={"/explore"}
              className="block text-neutral-400 hover:text-gray-100"
            >
              Explore
            </Link>
            <Link
              href="https://forms.gle/vMdfdQAcnuwxXT9G8"
              target="_blank"
              className="block text-neutral-400 hover:text-gray-100"
            >
              Feedback
            </Link>
            <Link
              href="https://forms.gle/vMdfdQAcnuwxXT9G8"
              target="_blank"
              className="block text-neutral-400 hover:text-gray-100"
            >
              Request New feature
            </Link>
            <Link
              href="https://forms.gle/vMdfdQAcnuwxXT9G8"
              target="_blank"
              className="block text-neutral-400 hover:text-gray-100"
            >
              Report a bug
            </Link>
          </div>
          <div className="col-span-1 space-y-4">
            <p className="font-bold ">SOCIALS</p>
            <Link
              href="https://twitter.com/piqr_hq"
              target="_blank"
              className="block text-neutral-400 hover:text-gray-100"
            >
              Twitter
            </Link>
            <Link
              href="https://instagram.com/piqr_hq"
              target="_blank"
              className="block text-neutral-400 hover:text-gray-100"
            >
              Instagram
            </Link>
          </div>
          <div className="col -span-1 space-y-4">
            <p className="font-bold ">LEGAL</p>
            <Link
              href={"/privacy-policy"}
              className="block text-neutral-400 hover:text-gray-100"
            >
              Privacy Policy
            </Link>
            <Link
              href={"/refund-policy"}
              className="block text-neutral-400 hover:text-gray-100"
            >
              Refund Policy
            </Link>
            <Link
              href={"/terms"}
              className="block text-neutral-400 hover:text-gray-100"
            >
              Terms & Conditions
            </Link>
            <Link
              href={"/contact"}
              className="block text-neutral-400 hover:text-gray-100"
            >
              Contact us
            </Link>
          </div>
        </div>
        <hr className="border-[#262626] my-8" />
        <p className="text-center">
          All rights reserved. Piqr © {currentYear}. Made with ❤️ in Bharat.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
