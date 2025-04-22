import React from "react";
import { MediaCardPropsType } from "@/types/card";
import Card from "./Card";

/**
 * Media Card - Card with an image or video
 */
const MediaCard = ({
  imageUrl,
  imageAlt,
  badge,
  ...cardProps
}: MediaCardPropsType) => {
  return (
    <Card {...cardProps}>
      <div className="ihub-card-media">
        <img src={imageUrl} alt={imageAlt} />
        {badge && (
          <div
            className="ihub-card-media-badge"
            style={{ backgroundColor: badge.color }}
          >
            {badge.text}
          </div>
        )}
      </div>
      <div className="ihub-card-content">
        {cardProps.title && (
          <div
            className={`ihub-card-header ${
              cardProps.accentHeader ? "with-accent" : ""
            }`}
          >
            {typeof cardProps.title === "string" ? (
              <h3>{cardProps.title}</h3>
            ) : (
              cardProps.title
            )}
          </div>
        )}
        <div className="ihub-card-body">{cardProps.children}</div>
        {cardProps.footer && (
          <div className="ihub-card-footer">{cardProps.footer}</div>
        )}
      </div>
    </Card>
  );
};

export default MediaCard;
