# EmailList

**Category:** Forms | **Type:** component

Email list management component for collecting, validating, and managing multiple email addresses with support for tagging, validation, and various input methods.

## 🏷️ Tags

`forms`, `email`, `validation`, `tags`, `multiple-input`

```tsx
"use client";
import React, { useState } from "react";
import {
  EmailList,
  SubmitButton,
  InputText,
  MultiPurposeModal,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive EmailList Examples
 * Demonstrates various use cases for email list management
 */
const EmailListExamples = () => {
  // Basic email list state
  const [basicEmails, setBasicEmails] = useState<string[]>([]);
  
  // Newsletter subscription state
  const [newsletterEmails, setNewsletterEmails] = useState<string[]>([]);
  const [subscriberName, setSubscriberName] = useState<string>("");
  
  // Team invitation state
  const [teamEmails, setTeamEmails] = useState<string[]>([]);
  const [invitationMessage, setInvitationMessage] = useState<string>("");
  
  // Contact form state
  const [contactEmails, setContactEmails] = useState<string[]>([]);
  const [contactSubject, setContactSubject] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  
  // Event invitation state
  const [eventEmails, setEventEmails] = useState<string[]>([]);
  const [eventTitle, setEventTitle] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  
  // Marketing campaign state
  const [campaignEmails, setCampaignEmails] = useState<string[]>([]);
  const [campaignType, setCampaignType] = useState<string>("newsletter");
  
  // Survey distribution state
  const [surveyEmails, setSurveyEmails] = useState<string[]>([]);
  const [surveyTitle, setSurveyTitle] = useState<string>("");
  
  // Modal states
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState<boolean>(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState<boolean>(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState<boolean>(false);
  
  // Submit handlers
  const handleNewsletterSubmit = () => {
    if (newsletterEmails.length === 0) {
      openToast("Please add at least one email address", "error");
      return;
    }
    console.log("Newsletter subscription:", {
      name: subscriberName,
      emails: newsletterEmails
    });
    openToast(`Successfully subscribed ${newsletterEmails.length} email(s) to newsletter!`);
    setNewsletterEmails([]);
    setSubscriberName("");
    setIsNewsletterModalOpen(false);
  };

  const handleTeamInvitation = () => {
    if (teamEmails.length === 0) {
      openToast("Please add at least one team member email", "error");
      return;
    }
    console.log("Team invitations:", {
      emails: teamEmails,
      message: invitationMessage
    });
    openToast(`Successfully sent invitations to ${teamEmails.length} team member(s)!`);
    setTeamEmails([]);
    setInvitationMessage("");
    setIsTeamModalOpen(false);
  };

  const handleContactSubmit = () => {
    if (contactEmails.length === 0) {
      openToast("Please add at least one contact email", "error");
      return;
    }
    console.log("Contact form:", {
      emails: contactEmails,
      subject: contactSubject,
      message: contactMessage
    });
    openToast(`Message sent to ${contactEmails.length} contact(s)!`);
    setContactEmails([]);
    setContactSubject("");
    setContactMessage("");
    setIsContactModalOpen(false);
  };

  const handleEventInvitation = () => {
    if (eventEmails.length === 0) {
      openToast("Please add at least one guest email", "error");
      return;
    }
    console.log("Event invitation:", {
      emails: eventEmails,
      title: eventTitle,
      date: eventDate
    });
    openToast(`Event invitations sent to ${eventEmails.length} guest(s)!`);
    setEventEmails([]);
    setEventTitle("");
    setEventDate("");
    setIsEventModalOpen(false);
  };

  const handleCampaignSubmit = () => {
    if (campaignEmails.length === 0) {
      openToast("Please add at least one recipient email", "error");
      return;
    }
    console.log("Marketing campaign:", {
      emails: campaignEmails,
      type: campaignType
    });
    openToast(`Campaign sent to ${campaignEmails.length} recipient(s)!`);
    setCampaignEmails([]);
    setCampaignType("newsletter");
    setIsCampaignModalOpen(false);
  };

  const handleSurveySubmit = () => {
    if (surveyEmails.length === 0) {
      openToast("Please add at least one participant email", "error");
      return;
    }
    console.log("Survey distribution:", {
      emails: surveyEmails,
      title: surveyTitle
    });
    openToast(`Survey sent to ${surveyEmails.length} participant(s)!`);
    setSurveyEmails([]);
    setSurveyTitle("");
    setIsSurveyModalOpen(false);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>EmailList Component Examples</h1>
      <p className="ihub-mb-4">
        Comprehensive examples showcasing email list management, validation, 
        and practical use cases for various scenarios.
      </p>

      {/* Basic Usage Section */}
      <section className="ihub-mb-5">
        <h2>Basic Email List</h2>
        <p>Simple email collection with validation and duplicate prevention.</p>
        <div className="ihub-card ihub-p-4">
          <label className="ihub-label">Add Email Addresses:</label>
          <EmailList 
            setEmailListValue={setBasicEmails}
            names="basicEmails"
          />
          <div className="ihub-mt-3">
            <strong>Current emails ({basicEmails.length}):</strong>
            {basicEmails.length > 0 ? (
              <ul className="ihub-mt-2">
                {basicEmails.map((email, index) => (
                  <li key={index} className="ihub-text-sm">{email}</li>
                ))}
              </ul>
            ) : (
              <p className="ihub-text-muted ihub-text-sm">No emails added yet</p>
            )}
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="ihub-mb-5">
        <h2>Practical Use Cases</h2>
        <div className="ihub-d-flex ihub-flex-wrap" style={{ gap: "15px" }}>
          <button
            className="ihub-primary-btn"
            onClick={() => setIsNewsletterModalOpen(true)}
          >
            Newsletter Subscription
          </button>
          
          <button
            className="ihub-success-btn"
            onClick={() => setIsTeamModalOpen(true)}
          >
            Team Invitations
          </button>
          
          <button
            className="ihub-info-btn"
            onClick={() => setIsContactModalOpen(true)}
          >
            Contact Form
          </button>
          
          <button
            className="ihub-warning-btn"
            onClick={() => setIsEventModalOpen(true)}
          >
            Event Invitations
          </button>
          
          <button
            className="ihub-outlined-btn"
            onClick={() => setIsCampaignModalOpen(true)}
          >
            Marketing Campaign
          </button>
          
          <button
            className="ihub-important-btn"
            onClick={() => setIsSurveyModalOpen(true)}
          >
            Survey Distribution
          </button>
        </div>
      </section>

      {/* Newsletter Subscription Modal */}
      <MultiPurposeModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
        title="Newsletter Subscription"
        size="medium"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsNewsletterModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="ihub-primary-btn"
              onClick={handleNewsletterSubmit}
              disabled={newsletterEmails.length === 0}
            >
              Subscribe ({newsletterEmails.length})
            </button>
          </div>
        }
      >
        <div className="ihub-mb-3">
          <InputText
            label="Subscriber Name (Optional)"
            id="subscriberName"
            name="subscriberName"
            type="text"
            value={subscriberName}
            onChange={(e) => setSubscriberName(e.target.value)}
            placeholder="Enter subscriber name"
            className="ihub-input"
          />
        </div>
        
        <div className="ihub-mb-3">
          <label className="ihub-label">Email Addresses:</label>
          <EmailList 
            setEmailListValue={setNewsletterEmails}
            names="newsletterEmails"
          />
          <p className="ihub-text-sm ihub-text-muted ihub-mt-2">
            Add multiple email addresses separated by commas or press Enter after each email.
          </p>
        </div>
        
        {newsletterEmails.length > 0 && (
          <div className="ihub-alert ihub-alert-info">
            <strong>Preview:</strong> {newsletterEmails.length} email(s) will be subscribed to the newsletter.
          </div>
        )}
      </MultiPurposeModal>

      {/* Team Invitation Modal */}
      <MultiPurposeModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        title="Invite Team Members"
        size="medium"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsTeamModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="ihub-success-btn"
              onClick={handleTeamInvitation}
              disabled={teamEmails.length === 0}
            >
              Send Invitations ({teamEmails.length})
            </button>
          </div>
        }
      >
        <div className="ihub-mb-3">
          <label className="ihub-label">Team Member Emails:</label>
          <EmailList 
            setEmailListValue={setTeamEmails}
            names="teamEmails"
          />
        </div>
        
        <div className="ihub-mb-3">
          <label className="ihub-label">Invitation Message (Optional):</label>
          <textarea
            className="ihub-input"
            rows={4}
            value={invitationMessage}
            onChange={(e) => setInvitationMessage(e.target.value)}
            placeholder="Add a personal message to your team invitation..."
          />
        </div>
        
        {teamEmails.length > 0 && (
          <div className="ihub-alert ihub-alert-success">
            Ready to invite {teamEmails.length} team member(s) to join your workspace.
          </div>
        )}
      </MultiPurposeModal>

      {/* Contact Form Modal */}
      <MultiPurposeModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Send Message to Contacts"
        size="large"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsContactModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="ihub-info-btn"
              onClick={handleContactSubmit}
              disabled={contactEmails.length === 0 || !contactSubject}
            >
              Send Message ({contactEmails.length})
            </button>
          </div>
        }
      >
        <div className="ihub-mb-3">
          <label className="ihub-label">Contact Emails:</label>
          <EmailList 
            setEmailListValue={setContactEmails}
            names="contactEmails"
          />
        </div>
        
        <div className="ihub-mb-3">
          <InputText
            label="Subject"
            id="contactSubject"
            name="contactSubject"
            type="text"
            value={contactSubject}
            onChange={(e) => setContactSubject(e.target.value)}
            placeholder="Enter message subject"
            className="ihub-input"
            required
          />
        </div>
        
        <div className="ihub-mb-3">
          <label className="ihub-label">Message:</label>
          <textarea
            className="ihub-input"
            rows={6}
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            placeholder="Enter your message..."
          />
        </div>
        
        {contactEmails.length > 0 && contactSubject && (
          <div className="ihub-alert ihub-alert-info">
            Message "{contactSubject}" will be sent to {contactEmails.length} contact(s).
          </div>
        )}
      </MultiPurposeModal>

      {/* Event Invitation Modal */}
      <MultiPurposeModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        title="Send Event Invitations"
        size="medium"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsEventModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="ihub-warning-btn"
              onClick={handleEventInvitation}
              disabled={eventEmails.length === 0 || !eventTitle}
            >
              Send Invitations ({eventEmails.length})
            </button>
          </div>
        }
      >
        <div className="ihub-mb-3">
          <InputText
            label="Event Title"
            id="eventTitle"
            name="eventTitle"
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Enter event title"
            className="ihub-input"
            required
          />
        </div>
        
        <div className="ihub-mb-3">
          <InputText
            label="Event Date"
            id="eventDate"
            name="eventDate"
            type="datetime-local"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="ihub-input"
          />
        </div>
        
        <div className="ihub-mb-3">
          <label className="ihub-label">Guest Emails:</label>
          <EmailList 
            setEmailListValue={setEventEmails}
            names="eventEmails"
          />
        </div>
        
        {eventEmails.length > 0 && eventTitle && (
          <div className="ihub-alert ihub-alert-warning">
            Invitation for "{eventTitle}" will be sent to {eventEmails.length} guest(s).
          </div>
        )}
      </MultiPurposeModal>

      {/* Marketing Campaign Modal */}
      <MultiPurposeModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        title="Marketing Campaign Distribution"
        size="medium"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsCampaignModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="ihub-primary-btn"
              onClick={handleCampaignSubmit}
              disabled={campaignEmails.length === 0}
            >
              Launch Campaign ({campaignEmails.length})
            </button>
          </div>
        }
      >
        <div className="ihub-mb-3">
          <label className="ihub-label">Campaign Type:</label>
          <select
            className="ihub-input"
            value={campaignType}
            onChange={(e) => setCampaignType(e.target.value)}
          >
            <option value="newsletter">Newsletter</option>
            <option value="promotion">Promotional</option>
            <option value="announcement">Announcement</option>
            <option value="update">Product Update</option>
          </select>
        </div>
        
        <div className="ihub-mb-3">
          <label className="ihub-label">Recipient Emails:</label>
          <EmailList 
            setEmailListValue={setCampaignEmails}
            names="campaignEmails"
          />
          <p className="ihub-text-sm ihub-text-muted ihub-mt-2">
            Add email addresses of campaign recipients. Ensure compliance with email marketing regulations.
          </p>
        </div>
        
        {campaignEmails.length > 0 && (
          <div className="ihub-alert ihub-alert-primary">
            {campaignType} campaign will be sent to {campaignEmails.length} recipient(s).
          </div>
        )}
      </MultiPurposeModal>

      {/* Survey Distribution Modal */}
      <MultiPurposeModal
        isOpen={isSurveyModalOpen}
        onClose={() => setIsSurveyModalOpen(false)}
        title="Distribute Survey"
        size="medium"
        showFooter={true}
        footerContent={
          <div className="ihub-buttons">
            <button
              className="ihub-outlined-btn"
              onClick={() => setIsSurveyModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="ihub-important-btn"
              onClick={handleSurveySubmit}
              disabled={surveyEmails.length === 0 || !surveyTitle}
            >
              Send Survey ({surveyEmails.length})
            </button>
          </div>
        }
      >
        <div className="ihub-mb-3">
          <InputText
            label="Survey Title"
            id="surveyTitle"
            name="surveyTitle"
            type="text"
            value={surveyTitle}
            onChange={(e) => setSurveyTitle(e.target.value)}
            placeholder="Enter survey title"
            className="ihub-input"
            required
          />
        </div>
        
        <div className="ihub-mb-3">
          <label className="ihub-label">Participant Emails:</label>
          <EmailList 
            setEmailListValue={setSurveyEmails}
            names="surveyEmails"
          />
          <p className="ihub-text-sm ihub-text-muted ihub-mt-2">
            Add email addresses of survey participants. Each participant will receive a unique survey link.
          </p>
        </div>
        
        {surveyEmails.length > 0 && surveyTitle && (
          <div className="ihub-alert ihub-alert-info">
            Survey "{surveyTitle}" will be sent to {surveyEmails.length} participant(s).
          </div>
        )}
      </MultiPurposeModal>

      {/* Features Section */}
      <section className="ihub-mt-5">
        <h2>Component Features</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4 ihub-h-100">
              <h3>Input Methods</h3>
              <ul>
                <li>Type and press Enter</li>
                <li>Comma-separated input</li>
                <li>Tab key support</li>
                <li>Auto-add on blur</li>
                <li>Paste multiple emails</li>
              </ul>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card ihub-p-4 ihub-h-100">
              <h3>Validation & Management</h3>
              <ul>
                <li>Email format validation</li>
                <li>Duplicate prevention</li>
                <li>Individual email removal</li>
                <li>Visual error messages</li>
                <li>Real-time feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmailListExamples;
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `setEmailListValue` | `(value: (prevEmails: string[]) => string[]) => void` | `undefined` | Callback function to handle email list updates |
| `names` | `string` | `undefined` | Name attribute for the hidden input field containing comma-separated emails |

### Features

- **Email Validation**: Built-in email format validation using regex
- **Duplicate Prevention**: Automatically prevents adding duplicate emails
- **Multiple Input Methods**: Supports Enter key, Tab key, comma separation, and blur events
- **Visual Feedback**: Shows error messages for invalid inputs
- **Tag-like Display**: Emails displayed as removable tags
- **Form Integration**: Hidden input field for form submission
- **Accessible**: Proper ARIA labels and keyboard navigation

### CSS Classes

- `.ihub-email-list` - Main container
- `.ihub-email-item` - Individual email tag
- `.ihub-email-text` - Email text content
- `.ihub-email-icon` - Remove button icon
- `.ihub-input` - Input field styling
- `.ihub-input-notes` - Error message styling

## Use Cases

1. **Newsletter Subscriptions** - Collect subscriber emails
2. **Team Invitations** - Invite multiple team members
3. **Contact Forms** - Send messages to multiple recipients
4. **Event Invitations** - Invite guests to events
5. **Marketing Campaigns** - Build recipient lists
6. **Survey Distribution** - Send surveys to participants
7. **Email Marketing** - Manage mailing lists
8. **User Management** - Add multiple users to systems

## 🔗 Related Components

- [InputText](./InputText.md) - Text input component
- [MultipleEmail](./MultipleEmail.md) - Alternative email input component
- [SubmitButton](./SubmitButton.md) - Form submission button
- [MultiPurposeModal](./MultiPurposeModal.md) - Modal component for forms
- [FormError](./FormError.md) - Form error handling component

