import React from "react";
import { MediaCardPropsType } from "@/types/card";
import MediaCard from "./MediaCard";

/**
 * Horizontal Media Card - Card with side-by-side layout
 */
const HorizontalCard = (props: MediaCardPropsType) => {
  const { className = "", ...otherProps } = props;

  return (
    <MediaCard
      {...otherProps}
      className={`ihub-card-horizontal ${className}`}
    />
  );
};

export default HorizontalCard;
