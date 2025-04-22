import React from "react";
import { ProfileCardPropsType } from "@/types/card";
import { Card } from "./Card";

/**
 * Profile Card - For displaying user information
 */
const ProfileCard = ({
  imageUrl,
  name,
  role,
  bio,
  socialLinks,
  children,
  ...cardProps
}: ProfileCardPropsType) => {
  return (
    <Card {...cardProps} title={null}>
      <div className="ihub-profile-card">
        <img src={imageUrl} alt={name} className="ihub-profile-image" />
        <h4>{name}</h4>
        {role && <p className="tw-500">{role}</p>}
        {bio && <p>{bio}</p>}
        {children}

        {socialLinks && socialLinks.length > 0 && (
          <div className="ihub-profile-social">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;
