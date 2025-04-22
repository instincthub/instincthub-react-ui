import React from "react";
import CardComponent from "./Card";
import { FeatureCardPropsType } from "@/types/card";

/**
 * Feature Card - Highlights features with icons
 */
const FeatureCard = ({
  icon,
  title,
  description,
  children,
  ...cardProps
}: FeatureCardPropsType) => {
  return (
    <CardComponent {...cardProps} title={null}>
      <div className="ihub-feature-card">
        <div className="ihub-feature-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
      </div>
    </CardComponent>
  );
};

export default FeatureCard;
