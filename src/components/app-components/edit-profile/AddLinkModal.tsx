import { Button, Input, Modal } from "@components";
import { useAppBoundStore } from "@store/mainStore";
import { useState } from "react";

const cmnClass = "flex sm:flex-row flex-col items-center gap-4";

const AddLinkModal = () => {
  const { addLinkModal, closeAddLinkModal, socialLinks, addSocials } =
    useAppBoundStore();

  const [links, setLinks] = useState<SocialsType>({});
  const [loading, setLoading] = useState(false);

  const linkToUpdate = Object.keys(links).filter((item) => {
    return (
      links[item as keyof SocialsType] !==
      socialLinks?.[item as keyof SocialsType]
    );
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (linkToUpdate.length === 0) {
      closeAddLinkModal();
      return;
    }

    const linkToUpdateObj = linkToUpdate.reduce((acc: any, item) => {
      acc[item] = links[item as keyof SocialsType];
      return acc;
    }, {});

    setLoading(true);
    await addSocials(linkToUpdateObj);
    setLoading(false);
  };

  return (
    <Modal
      title="Add Your Social Links"
      isOpen={addLinkModal}
      closeModal={closeAddLinkModal}
      cls="max-w-2xl"
    >
      <form
        className="md:t-4 p-4 gap-4 flex flex-col text-sm"
        onSubmit={handleSubmit}
      >
        <div className={cmnClass}>
          <Input
            placeholder="Twitter profile url.."
            label="Twitter"
            defaultValue={socialLinks?.twitter}
            onChange={(e) => setLinks({ ...links, twitter: e.target.value })}
            name="twitter"
          />
          <Input
            placeholder="Linkedin profile url.."
            label="Linkedin"
            defaultValue={socialLinks?.linkedin}
            onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
            name="linkedin"
          />
        </div>
        <div className={cmnClass}>
          <Input
            placeholder="Github profile url.."
            label="Github"
            defaultValue={socialLinks?.github}
            onChange={(e) => setLinks({ ...links, github: e.target.value })}
            name="github"
          />
          <Input
            placeholder="Behance profile url.."
            label="Behance"
            defaultValue={socialLinks?.behance}
            onChange={(e) => setLinks({ ...links, behance: e.target.value })}
            name="behance"
          />
        </div>
        <div className={cmnClass}>
          <Input
            placeholder="Dribble profile url.."
            label="Dribble"
            defaultValue={socialLinks?.dribble}
            onChange={(e) => setLinks({ ...links, dribble: e.target.value })}
            name="dribble"
          />
          <Input
            placeholder="Your portfolio website url.."
            label="Website"
            defaultValue={socialLinks?.website}
            onChange={(e) => setLinks({ ...links, website: e.target.value })}
            name="website"
          />
        </div>
        <div className={cmnClass}>
          <Input
            placeholder="Medium profile url.."
            label="Medium"
            defaultValue={socialLinks?.medium}
            onChange={(e) => setLinks({ ...links, medium: e.target.value })}
            name="medium"
          />
          <Input
            placeholder="Fueler profile url"
            label="Fueler"
            defaultValue={socialLinks?.fueler}
            onChange={(e) => setLinks({ ...links, fueler: e.target.value })}
            name="Fueler"
          />
        </div>
        <div className={cmnClass}>
          <Input
            placeholder="Instagram profile url.."
            label="Instagram"
            defaultValue={socialLinks?.instagram}
            onChange={(e) => setLinks({ ...links, instagram: e.target.value })}
            name="instagram"
          />
          <Input
            placeholder="Youtube profile url"
            label="Youtube"
            defaultValue={socialLinks?.youtube}
            onChange={(e) => setLinks({ ...links, youtube: e.target.value })}
            name="youtube"
          />
        </div>

        <div className="flex justify-center gap-4 p-4">
          <Button
            onClick={closeAddLinkModal}
            type="button"
            variant="default"
            cls="w-36 text-sm font-medium h-11"
          >
            Back
          </Button>
          <Button
            isLoading={loading}
            disabled={linkToUpdate.length === 0 || loading}
            type="submit"
            variant="primaryNoOutline"
            cls="w-40 text-sm font-medium h-11"
          >
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddLinkModal;
