import React from "react";
/**
 * Card List - Vertical list layout for cards
 */
const CardList = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`ihub-card-list ${className}`}>{children}</div>;
};

export default CardList;
