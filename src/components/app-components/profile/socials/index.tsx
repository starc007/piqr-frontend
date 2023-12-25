import { PlusCircleSVG } from "@assets";
import { Button, CustomButton, Link } from "@components";
import { useAppBoundStore } from "@store";
import { SOCIAL_LINKS } from "@utils";

const Socials = () => {
  const { socialLinks, openAddLinkModal } = useAppBoundStore();

  return (
    <div className="space-y-2">
      <p className="font-semibold text-gray-400">Socials</p>
      <div className="flex items-center  gap-2 flex-wrap mt-4">
        {socialLinks &&
          Object.keys(socialLinks!)?.map(
            (item) =>
              item &&
              SOCIAL_LINKS.includes(item as keyof SocialsType) &&
              socialLinks![item as keyof SocialsType] && (
                <Link
                  key={item}
                  href={socialLinks![item as keyof SocialsType]!}
                  target="_blank"
                  rel="noreferrer"
                  className="py-1.5 px-3 text-sm font-medium border rounded-full hover:bg-gray-100"
                >
                  {item}
                </Link>
              )
          )}

        <Button
          variant="primary"
          cls="px-4 py-2 text-sm gap-1"
          onClick={openAddLinkModal}
        >
          <PlusCircleSVG /> Add
        </Button>
      </div>
    </div>
  );
};

export default Socials;
