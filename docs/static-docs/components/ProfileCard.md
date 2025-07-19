# ProfileCard

**Category:** UI | **Type:** component

Versatile profile card component for displaying user information, team members, contacts, and social profiles.

## 🏷️ Tags

`ui`, `card`, `profile`, `user`, `social`, `contact`

```tsx
"use client";
import React from "react";
import { ProfileCard } from "@instincthub/react-ui";

/**
 * Comprehensive ProfileCard examples demonstrating various use cases
 */
const ProfileCardExamples = () => {
  // Sample social links
  const socialLinks = [
    {
      icon: <i className="fab fa-linkedin"></i>,
      url: "https://linkedin.com/in/johndoe",
      label: "LinkedIn Profile",
    },
    {
      icon: <i className="fab fa-twitter"></i>,
      url: "https://twitter.com/johndoe",
      label: "Twitter Profile",
    },
    {
      icon: <i className="fab fa-github"></i>,
      url: "https://github.com/johndoe",
      label: "GitHub Profile",
    },
  ];

  const designerSocialLinks = [
    {
      icon: <i className="fab fa-dribbble"></i>,
      url: "https://dribbble.com/janesmith",
      label: "Dribbble Profile",
    },
    {
      icon: <i className="fab fa-behance"></i>,
      url: "https://behance.net/janesmith",
      label: "Behance Portfolio",
    },
    {
      icon: <i className="fab fa-instagram"></i>,
      url: "https://instagram.com/janesmith",
      label: "Instagram",
    },
  ];

  const contactSocialLinks = [
    {
      icon: <i className="fas fa-envelope"></i>,
      url: "mailto:contact@company.com",
      label: "Email",
    },
    {
      icon: <i className="fas fa-phone"></i>,
      url: "tel:+1234567890",
      label: "Phone",
    },
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ProfileCard Examples</h1>
      <p>Comprehensive examples showing different ProfileCard configurations for various use cases.</p>

      {/* Basic User Profile */}
      <section className="ihub-mb-5">
        <h2>Basic User Profile</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
            name="John Doe"
            role="Software Engineer"
            bio="Passionate full-stack developer with 5+ years of experience building scalable web applications."
            socialLinks={socialLinks}
            className="ihub-w-300"
          />
          
          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
            name="Jane Smith"
            role="UX/UI Designer"
            bio="Creative designer focused on user-centered design and beautiful interfaces."
            socialLinks={designerSocialLinks}
            accent="rose"
            className="ihub-w-300"
          />
        </div>
      </section>

      {/* Team Member Cards */}
      <section className="ihub-mb-5">
        <h2>Team Member Cards</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
            name="Alex Johnson"
            role="Team Lead"
            bio="Leading our development team with 8+ years of experience in enterprise software."
            socialLinks={[
              {
                icon: <i className="fab fa-linkedin"></i>,
                url: "https://linkedin.com/in/alexjohnson",
                label: "LinkedIn",
              },
            ]}
            accent="cyan"
            size="sm"
            className="ihub-w-280"
          >
            <div className="ihub-mt-3">
              <span className="ihub-badge ihub-badge-success">Available</span>
            </div>
          </ProfileCard>

          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face"
            name="Sarah Wilson"
            role="Product Manager"
            bio="Driving product strategy and user experience across multiple platforms."
            socialLinks={[
              {
                icon: <i className="fab fa-twitter"></i>,
                url: "https://twitter.com/sarahwilson",
                label: "Twitter",
              },
            ]}
            accent="purple"
            size="sm"
            className="ihub-w-280"
          >
            <div className="ihub-mt-3">
              <span className="ihub-badge ihub-badge-warning">In Meeting</span>
            </div>
          </ProfileCard>

          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face"
            name="Mike Chen"
            role="DevOps Engineer"
            bio="Infrastructure and deployment specialist ensuring smooth operations."
            accent="green"
            size="sm"
            className="ihub-w-280"
          >
            <div className="ihub-mt-3">
              <span className="ihub-badge ihub-badge-danger">Busy</span>
            </div>
          </ProfileCard>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="ihub-mb-5">
        <h2>Contact Cards</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
            name="Dr. Emily Roberts"
            role="Medical Director"
            bio="Board-certified physician with specialization in internal medicine."
            socialLinks={contactSocialLinks}
            border={true}
            shadow={true}
            className="ihub-w-300"
          >
            <div className="ihub-mt-3">
              <div className="ihub-d-flex ihub-justify-content-between">
                <small className="ihub-text-muted">Office Hours:</small>
                <small>Mon-Fri 9-5</small>
              </div>
            </div>
          </ProfileCard>

          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face"
            name="David Park"
            role="Sales Representative"
            bio="Helping businesses grow through strategic partnerships and solutions."
            socialLinks={[
              {
                icon: <i className="fas fa-envelope"></i>,
                url: "mailto:david.park@company.com",
                label: "Email",
              },
              {
                icon: <i className="fab fa-linkedin"></i>,
                url: "https://linkedin.com/in/davidpark",
                label: "LinkedIn",
              },
            ]}
            accent="cyan"
            border={true}
            shadow={true}
            className="ihub-w-300"
          >
            <div className="ihub-mt-3">
              <div className="ihub-d-flex ihub-justify-content-between">
                <small className="ihub-text-muted">Territory:</small>
                <small>West Coast</small>
              </div>
            </div>
          </ProfileCard>
        </div>
      </section>

      {/* Social Media Profiles */}
      <section className="ihub-mb-5">
        <h2>Social Media Profiles</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face"
            name="Lisa Rodriguez"
            role="Content Creator"
            bio="Creating engaging content about tech, lifestyle, and personal growth. 50K+ followers."
            socialLinks={[
              {
                icon: <i className="fab fa-instagram"></i>,
                url: "https://instagram.com/lisarodriguez",
                label: "Instagram",
              },
              {
                icon: <i className="fab fa-youtube"></i>,
                url: "https://youtube.com/lisarodriguez",
                label: "YouTube",
              },
              {
                icon: <i className="fab fa-tiktok"></i>,
                url: "https://tiktok.com/@lisarodriguez",
                label: "TikTok",
              },
            ]}
            accent="rose"
            className="ihub-w-300"
          >
            <div className="ihub-mt-3">
              <div className="ihub-d-flex ihub-justify-content-around ihub-text-center">
                <div>
                  <strong>50K</strong>
                  <div className="ihub-text-muted ihub-fs-sm">Followers</div>
                </div>
                <div>
                  <strong>1.2K</strong>
                  <div className="ihub-text-muted ihub-fs-sm">Posts</div>
                </div>
                <div>
                  <strong>89%</strong>
                  <div className="ihub-text-muted ihub-fs-sm">Engagement</div>
                </div>
              </div>
            </div>
          </ProfileCard>
        </div>
      </section>

      {/* Minimal Profile Cards */}
      <section className="ihub-mb-5">
        <h2>Minimal Profile Cards</h2>
        <div className="ihub-d-flex" style={{ gap: "15px", flexWrap: "wrap" }}>
          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
            name="Anna Taylor"
            role="Consultant"
            size="sm"
            className="ihub-w-250"
          />

          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
            name="James Brown"
            role="Analyst"
            size="sm"
            accent="green"
            className="ihub-w-250"
          />

          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face"
            name="Maria Garcia"
            role="Specialist"
            size="sm"
            accent="purple"
            className="ihub-w-250"
          />
        </div>
      </section>

      {/* Interactive Profile Cards */}
      <section className="ihub-mb-5">
        <h2>Interactive Profile Cards</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
            name="Robert Kim"
            role="Senior Developer"
            bio="Full-stack developer specializing in React and Node.js applications."
            socialLinks={socialLinks}
            onClick={() => alert('Profile clicked!')}
            className="ihub-w-300 ihub-cursor-pointer"
            style={{ transition: 'transform 0.2s' }}
          >
            <div className="ihub-mt-3">
              <button className="ihub-btn ihub-primary-btn ihub-w-100">
                View Profile
              </button>
            </div>
          </ProfileCard>

          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
            name="Rachel Green"
            role="Marketing Manager"
            bio="Digital marketing expert with a passion for brand storytelling."
            socialLinks={designerSocialLinks}
            accent="rose"
            className="ihub-w-300"
          >
            <div className="ihub-mt-3">
              <div className="ihub-d-flex" style={{ gap: "10px" }}>
                <button className="ihub-btn ihub-outlined-btn ihub-flex-1">
                  Message
                </button>
                <button className="ihub-btn ihub-primary-btn ihub-flex-1">
                  Connect
                </button>
              </div>
            </div>
          </ProfileCard>
        </div>
      </section>

      {/* Dark Theme Examples */}
      <section className="ihub-mb-5">
        <h2>Dark Theme Profile Cards</h2>
        <div className="ihub-d-flex" style={{ gap: "20px", flexWrap: "wrap" }}>
          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
            name="Daniel Anderson"
            role="System Architect"
            bio="Designing scalable systems for enterprise applications."
            socialLinks={socialLinks}
            darkTheme={true}
            accent="cyan"
            className="ihub-w-300"
          />

          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face"
            name="Sophia Martinez"
            role="Data Scientist"
            bio="Transforming data into actionable insights for business growth."
            socialLinks={[
              {
                icon: <i className="fab fa-github"></i>,
                url: "https://github.com/sophiamartinez",
                label: "GitHub",
              },
              {
                icon: <i className="fab fa-kaggle"></i>,
                url: "https://kaggle.com/sophiamartinez",
                label: "Kaggle",
              },
            ]}
            darkTheme={true}
            accent="purple"
            className="ihub-w-300"
          />
        </div>
      </section>

      {/* Team Directory Layout */}
      <section className="ihub-mb-5">
        <h2>Team Directory Layout</h2>
        <p>Example of how ProfileCards can be used in a team directory or employee listing.</p>
        <div className="ihub-row">
          <div className="ihub-col-lg-4 ihub-col-md-6 ihub-mb-3">
            <ProfileCard
              imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
              name="Tom Wilson"
              role="Engineering Manager"
              bio="Leading the backend development team."
              socialLinks={[
                {
                  icon: <i className="fab fa-linkedin"></i>,
                  url: "#",
                  label: "LinkedIn",
                },
              ]}
              size="sm"
              border={true}
            />
          </div>
          <div className="ihub-col-lg-4 ihub-col-md-6 ihub-mb-3">
            <ProfileCard
              imageUrl="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
              name="Emma Davis"
              role="Frontend Developer"
              bio="React specialist with an eye for design."
              socialLinks={[
                {
                  icon: <i className="fab fa-github"></i>,
                  url: "#",
                  label: "GitHub",
                },
              ]}
              size="sm"
              border={true}
              accent="rose"
            />
          </div>
          <div className="ihub-col-lg-4 ihub-col-md-6 ihub-mb-3">
            <ProfileCard
              imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              name="Chris Lee"
              role="QA Engineer"
              bio="Ensuring quality across all products."
              socialLinks={[
                {
                  icon: <i className="fas fa-envelope"></i>,
                  url: "mailto:chris.lee@company.com",
                  label: "Email",
                },
              ]}
              size="sm"
              border={true}
              accent="green"
            />
          </div>
        </div>
      </section>

      {/* Contact List Layout */}
      <section className="ihub-mb-5">
        <h2>Contact List Layout</h2>
        <p>Compact profile cards suitable for contact lists and directories.</p>
        <div className="ihub-d-flex ihub-flex-column" style={{ gap: "15px", maxWidth: "500px" }}>
          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face"
            name="Dr. Sarah Johnson"
            role="Cardiologist"
            socialLinks={[
              {
                icon: <i className="fas fa-phone"></i>,
                url: "tel:+1234567890",
                label: "Phone",
              },
              {
                icon: <i className="fas fa-envelope"></i>,
                url: "mailto:dr.johnson@hospital.com",
                label: "Email",
              },
            ]}
            size="sm"
            className="ihub-w-100"
          />
          
          <ProfileCard
            imageUrl="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face"
            name="Mark Thompson"
            role="Attorney"
            socialLinks={[
              {
                icon: <i className="fas fa-phone"></i>,
                url: "tel:+1234567891",
                label: "Phone",
              },
              {
                icon: <i className="fas fa-envelope"></i>,
                url: "mailto:mark@lawfirm.com",
                label: "Email",
              },
            ]}
            size="sm"
            accent="cyan"
            className="ihub-w-100"
          />
        </div>
      </section>
    </div>
  );
};

export default ProfileCardExamples;
```

## 📋 Props Reference

### ProfileCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageUrl` | `string` | **required** | Profile image URL |
| `name` | `string` | **required** | Name of the person |
| `role` | `string` | `undefined` | Role or position |
| `bio` | `string` | `undefined` | Bio or description |
| `socialLinks` | `Array<SocialLink>` | `undefined` | Social media links |
| `children` | `ReactNode` | `undefined` | Additional content |
| `className` | `string` | `undefined` | Additional CSS classes |
| `accent` | `"cyan" \| "rose" \| "green" \| "purple"` | `undefined` | Accent color variant |
| `darkTheme` | `boolean` | `false` | Whether to use dark theme styling |
| `style` | `CSSProperties` | `undefined` | Additional inline styles |
| `size` | `"default" \| "sm"` | `"default"` | Card size variant |
| `border` | `boolean` | `false` | Whether to add a border |
| `shadow` | `boolean` | `false` | Whether to add a shadow |
| `onClick` | `() => void` | `undefined` | Click handler for the card |

### SocialLink Object

| Property | Type | Description |
|----------|------|-------------|
| `icon` | `ReactNode` | Icon element (usually an `<i>` tag or SVG) |
| `url` | `string` | URL to link to |
| `label` | `string` | Accessible label for the link |

## 🎨 Styling Classes

The ProfileCard component uses several CSS classes that can be customized:

- `.ihub-profile-card` - Main container
- `.ihub-profile-image` - Profile image styling
- `.ihub-profile-social` - Social links container

## 💡 Use Cases

1. **Team Pages** - Display team members with their roles and contact information
2. **User Directories** - Create searchable employee or member directories
3. **Contact Lists** - Professional contact management with social links
4. **Social Profiles** - Showcase content creators and influencers
5. **Speaker Listings** - Conference or event speaker profiles
6. **Client Testimonials** - Customer profiles with testimonials
7. **About Us Pages** - Company leadership and key personnel
8. **Professional Networks** - Business networking platforms
9. **Portfolio Sites** - Showcase team members and collaborators
10. **Customer Support** - Support team member profiles

## 🔗 Related Components

- [Card](./Card.md) - Base card component
- [MediaCard](./MediaCard.md) - Card with media content
- [FeatureCard](./FeatureCard.md) - Feature showcase card
- [PricingCard](./PricingCard.md) - Pricing plan card
- [Badge](./Badge.md) - Status badges for profiles

