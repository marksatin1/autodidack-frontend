import { ImageResponse } from "next/og";

export const alt = "Autodidack | Photo Gallery";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 690,
};

export default function Image({ params }: { params: { name: string } }) {
  return (
    new ImageResponse(
      (
        <img
          src={`/pages/${params.name.toLowerCase().replace(" ", "-")}.png`}
          width={size.width}
          height={size.height}
          alt={alt}
        />
      )
    ),
    { ...size }
  );
}
