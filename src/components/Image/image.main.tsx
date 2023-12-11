import Image, { ImageProps } from "next/image";
import { FC } from "react";

const CustomImage: FC<ImageProps> = ({ src, alt, ...props }) => {
  return <Image loading="lazy" src={src} alt={alt} {...props} />;
};

export default CustomImage;
