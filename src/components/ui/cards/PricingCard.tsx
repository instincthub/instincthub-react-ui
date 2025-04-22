import React from "react";
import { PricingCardPropsType } from "@/types/card";
import CardComponent from "./Card";

/**
 * Pricing Card - For subscription plans
 */
const PricingCard = ({
  title,
  price,
  period,
  features,
  buttonText = "Get Started",
  onButtonClick,
  recommended = false,
  ...cardProps
}: PricingCardPropsType) => {
  const { className = "", ...otherProps } = cardProps;

  return (
    <CardComponent
      {...otherProps}
      className={`${className} ${recommended ? "ihub-card-accent-cyan" : ""}`}
      title={null}
    >
      <div className="ihub-pricing-card">
        <h3>{title}</h3>
        <div className="ihub-price">{price}</div>
        {period && <div className="ihub-pricing-period">{period}</div>}

        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        {buttonText && (
          <button
            className={`${
              recommended ? "ihub-important-btn" : "ihub-outlined-btn"
            }`}
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>
    </CardComponent>
  );
};

export default PricingCard;
