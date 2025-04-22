import React from "react";

/**
 * Card Grid - Grid layout for cards
 */
const CardGrid = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`ihub-card-grid ${className}`}>{children}</div>;
};

export default CardGrid;
