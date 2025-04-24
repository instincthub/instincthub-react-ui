import React, { useMemo } from "react";
import Image from "next/image";

// Type definition for the component props
interface RandomGradientImageProps {
  thumbnail?: string;
  title?: string;
  width?: number;
  height?: number;
}

/**
 * Returns a random gradient from predefined list
 * @returns A CSS linear gradient string
 */
const getRandomGradient = (): string => {
  const gradients: readonly string[] = [
    "linear-gradient(45deg, #ff7e5f, #feb47b)",
    "linear-gradient(45deg, #17ead9, #6078ea)",
    "linear-gradient(45deg, #ff6e7f, #bfe9ff)",
    "linear-gradient(45deg, #f46b45, #eea849)",
    "linear-gradient(45deg, #26a0da, #31548b)",
    "linear-gradient(45deg, #ff9a9e, #fad0c4)",
    "linear-gradient(45deg, #a18cd1, #fbc2eb)",
    "linear-gradient(45deg, #28c2ff, #7edbff)",
    "linear-gradient(45deg, #4568dc, #b06ab3)",
    "linear-gradient(45deg, #88d3ce, #6e45e1)",
  ];

  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};

/**
 * A component that displays either an image or a random gradient background
 * @param thumbnail - URL of the image
 * @param title - Title of the image
 * @param width - Width of the image
 * @param height - Height of the image or gradient
 */
const RandomGradientImage = ({
  thumbnail,
  title,
  width = 128,
  height = 128,
}: RandomGradientImageProps) => {
  // Memoize the gradient to prevent regenerating on every render
  const gradient = useMemo(() => getRandomGradient(), []);
  const hasImage = Boolean(thumbnail);

  if (!hasImage) {
    return (
      <div
        style={{
          background: gradient,
          width: "100%",
          height: `${height}px`,
          position: "relative",
          borderRadius: "4px", // Optional: adds rounded corners
        }}
      />
    );
  }

  return (
    <Image
      className="ihub-dynamic-thumbnail"
      src={thumbnail!}
      alt={title || "Thumbnail image"}
      width={width}
      height={height}
      decoding="async"
      loading="lazy"
    />
  );
};

export default RandomGradientImage;
