import { FC, ImgHTMLAttributes } from "react";

const CustomImage: FC<ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  alt,
  ...props
}) => {
  const onError = (e: any) => {
    const url = `https://api.dicebear.com/7.x/initials/svg?seed=${
      alt || "user"
    }`;
    e.target.onerror = null;
    e.target.src = url;
  };

  return (
    <img loading="lazy" src={src} alt={alt} {...props} onError={onError} />
  );
};

export default CustomImage;
