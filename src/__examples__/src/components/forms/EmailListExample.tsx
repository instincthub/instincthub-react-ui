"use client";

import React, { useState } from "react";
import { EmailList, SubmitButton, InputText } from "../../../../index";

const EmailListExample: React.FC = () => {
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

  // Submit status states
  const [submitStatus, setSubmitStatus] = useState<{ [key: string]: number }>({
    newsletter: 1,
    team: 1,
    contact: 1,
    event: 1,
    campaign: 1,
    survey: 1
  });

  // Validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Submit handlers
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmails.length === 0) {
      console.error("Please add at least one email address");
      return;
    }
    
    setSubmitStatus(prev => ({ ...prev, newsletter: 2 }));
    
    setTimeout(() => {
      console.log("Newsletter subscription:", {
        name: subscriberName,
        emails: newsletterEmails
      });
      setNewsletterEmails([]);
      setSubscriberName("");
      setSubmitStatus(prev => ({ ...prev, newsletter: 1 }));
    }, 2000);
  };

  const handleTeamInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamEmails.length === 0) {
      console.error("Please add at least one email address");
      return;
    }

    setSubmitStatus(prev => ({ ...prev, team: 2 }));
    
    setTimeout(() => {
      console.log("Team invitation:", {
        emails: teamEmails,
        message: invitationMessage
      });
      setTeamEmails([]);
      setInvitationMessage("");
      setSubmitStatus(prev => ({ ...prev, team: 1 }));
    }, 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactEmails.length === 0) {
      console.error("Please add at least one email address");
      return;
    }

    setSubmitStatus(prev => ({ ...prev, contact: 2 }));
    
    setTimeout(() => {
      console.log("Contact form:", {
        emails: contactEmails,
        subject: contactSubject,
        message: contactMessage
      });
      setContactEmails([]);
      setContactSubject("");
      setContactMessage("");
      setSubmitStatus(prev => ({ ...prev, contact: 1 }));
    }, 2000);
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventEmails.length === 0) {
      console.error("Please add at least one email address");
      return;
    }

    setSubmitStatus(prev => ({ ...prev, event: 2 }));
    
    setTimeout(() => {
      console.log("Event invitation:", {
        emails: eventEmails,
        title: eventTitle,
        date: eventDate
      });
      setEventEmails([]);
      setEventTitle("");
      setEventDate("");
      setSubmitStatus(prev => ({ ...prev, event: 1 }));
    }, 2000);
  };

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (campaignEmails.length === 0) {
      console.error("Please add at least one email address");
      return;
    }

    setSubmitStatus(prev => ({ ...prev, campaign: 2 }));
    
    setTimeout(() => {
      console.log("Marketing campaign:", {
        emails: campaignEmails,
        type: campaignType
      });
      setCampaignEmails([]);
      setCampaignType("newsletter");
      setSubmitStatus(prev => ({ ...prev, campaign: 1 }));
    }, 2000);
  };

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (surveyEmails.length === 0) {
      console.error("Please add at least one email address");
      return;
    }

    setSubmitStatus(prev => ({ ...prev, survey: 2 }));
    
    setTimeout(() => {
      console.log("Survey distribution:", {
        emails: surveyEmails,
        title: surveyTitle
      });
      setSurveyEmails([]);
      setSurveyTitle("");
      setSubmitStatus(prev => ({ ...prev, survey: 1 }));
    }, 2000);
  };

  // Clear all function
  const clearAllEmails = () => {
    setBasicEmails([]);
    setNewsletterEmails([]);
    setTeamEmails([]);
    setContactEmails([]);
    setEventEmails([]);
    setCampaignEmails([]);
    setSurveyEmails([]);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>EmailList Examples</h1>
        <p>Email list management component for collecting, validating, and managing multiple email addresses</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Email List */}
        <div className="ihub-example-card">
          <h3>Basic Email List</h3>
          <p>Simple email collection with validation</p>
          <EmailList
            label="Email Addresses"
            emails={basicEmails}
            setEmails={setBasicEmails}
            placeholder="Enter email addresses"
          />
          <div className="ihub-example-output">
            <strong>Emails ({basicEmails.length}):</strong>
            {basicEmails.length > 0 ? (
              <ul className="ihub-email-preview">
                {basicEmails.map((email, index) => (
                  <li key={index} className={isValidEmail(email) ? "valid" : "invalid"}>
                    {email} {!isValidEmail(email) && <span className="error">❌</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <span> None</span>
            )}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="ihub-example-card">
          <h3>Newsletter Subscription</h3>
          <p>Newsletter signup with name and multiple emails</p>
          <form onSubmit={handleNewsletterSubmit}>
            <div className="ihub-mb-3">
              <InputText
                label="Subscriber Name"
                name="subscriberName"
                value={subscriberName}
                onChange={(e) => setSubscriberName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="ihub-mb-3">
              <EmailList
                label="Email Addresses"
                emails={newsletterEmails}
                setEmails={setNewsletterEmails}
                placeholder="Add email addresses for newsletter"
              />
            </div>
            <SubmitButton
              title="Subscribe to Newsletter"
              status={submitStatus.newsletter}
              className="ihub-important-btn"
            />
          </form>
        </div>

        {/* Team Invitation */}
        <div className="ihub-example-card">
          <h3>Team Invitation</h3>
          <p>Invite team members with custom message</p>
          <form onSubmit={handleTeamInvitation}>
            <div className="ihub-mb-3">
              <EmailList
                label="Team Member Emails"
                emails={teamEmails}
                setEmails={setTeamEmails}
                placeholder="Add team member emails"
              />
            </div>
            <div className="ihub-mb-3">
              <InputText
                label="Invitation Message"
                name="invitationMessage"
                value={invitationMessage}
                onChange={(e) => setInvitationMessage(e.target.value)}
                placeholder="Enter invitation message"
              />
            </div>
            <SubmitButton
              title="Send Invitations"
              status={submitStatus.team}
              className="ihub-important-btn"
            />
          </form>
        </div>

        {/* Contact Form */}
        <div className="ihub-example-card">
          <h3>Contact Form</h3>
          <p>Contact multiple recipients with subject and message</p>
          <form onSubmit={handleContactSubmit}>
            <div className="ihub-mb-3">
              <EmailList
                label="Recipients"
                emails={contactEmails}
                setEmails={setContactEmails}
                placeholder="Add recipient emails"
              />
            </div>
            <div className="ihub-mb-3">
              <InputText
                label="Subject"
                name="contactSubject"
                value={contactSubject}
                onChange={(e) => setContactSubject(e.target.value)}
                placeholder="Enter subject"
                required
              />
            </div>
            <div className="ihub-mb-3">
              <InputText
                label="Message"
                name="contactMessage"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Enter your message"
                required
              />
            </div>
            <SubmitButton
              title="Send Message"
              status={submitStatus.contact}
              className="ihub-important-btn"
            />
          </form>
        </div>

        {/* Event Invitation */}
        <div className="ihub-example-card">
          <h3>Event Invitation</h3>
          <p>Invite attendees to an event</p>
          <form onSubmit={handleEventSubmit}>
            <div className="ihub-mb-3">
              <InputText
                label="Event Title"
                name="eventTitle"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>
            <div className="ihub-mb-3">
              <InputText
                label="Event Date"
                name="eventDate"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                required
              />
            </div>
            <div className="ihub-mb-3">
              <EmailList
                label="Invitee Emails"
                emails={eventEmails}
                setEmails={setEventEmails}
                placeholder="Add invitee emails"
              />
            </div>
            <SubmitButton
              title="Send Invitations"
              status={submitStatus.event}
              className="ihub-important-btn"
            />
          </form>
        </div>

        {/* Marketing Campaign */}
        <div className="ihub-example-card">
          <h3>Marketing Campaign</h3>
          <p>Send marketing emails to target audience</p>
          <form onSubmit={handleCampaignSubmit}>
            <div className="ihub-mb-3">
              <select
                value={campaignType}
                onChange={(e) => setCampaignType(e.target.value)}
                className="ihub-select-input"
              >
                <option value="newsletter">Newsletter</option>
                <option value="promotion">Promotion</option>
                <option value="announcement">Announcement</option>
                <option value="survey">Survey</option>
              </select>
            </div>
            <div className="ihub-mb-3">
              <EmailList
                label="Target Audience"
                emails={campaignEmails}
                setEmails={setCampaignEmails}
                placeholder="Add target audience emails"
              />
            </div>
            <SubmitButton
              title="Launch Campaign"
              status={submitStatus.campaign}
              className="ihub-important-btn"
            />
          </form>
        </div>

        {/* Survey Distribution */}
        <div className="ihub-example-card">
          <h3>Survey Distribution</h3>
          <p>Distribute surveys to participants</p>
          <form onSubmit={handleSurveySubmit}>
            <div className="ihub-mb-3">
              <InputText
                label="Survey Title"
                name="surveyTitle"
                value={surveyTitle}
                onChange={(e) => setSurveyTitle(e.target.value)}
                placeholder="Enter survey title"
                required
              />
            </div>
            <div className="ihub-mb-3">
              <EmailList
                label="Participant Emails"
                emails={surveyEmails}
                setEmails={setSurveyEmails}
                placeholder="Add participant emails"
              />
            </div>
            <SubmitButton
              title="Distribute Survey"
              status={submitStatus.survey}
              className="ihub-important-btn"
            />
          </form>
        </div>

        {/* Bulk Operations */}
        <div className="ihub-example-card">
          <h3>Bulk Email Management</h3>
          <p>Manage large email lists with validation</p>
          <EmailList
            label="Bulk Email List"
            emails={basicEmails}
            setEmails={setBasicEmails}
            placeholder="Paste multiple emails (comma or newline separated)"
            allowBulkInput={true}
          />
          <div className="ihub-bulk-actions ihub-mt-3">
            <button 
              onClick={clearAllEmails}
              className="ihub-secondary-btn"
            >
              Clear All Lists
            </button>
            <button 
              onClick={() => {
                const validEmails = basicEmails.filter(isValidEmail);
                const invalidEmails = basicEmails.filter(email => !isValidEmail(email));
                console.log(`Valid: ${validEmails.length}, Invalid: ${invalidEmails.length}`);
              }}
              className="ihub-info-btn"
            >
              Validate All
            </button>
          </div>
          <div className="ihub-stats ihub-mt-2">
            <small>
              Valid: {basicEmails.filter(isValidEmail).length} | 
              Invalid: {basicEmails.filter(email => !isValidEmail(email)).length} | 
              Total: {basicEmails.length}
            </small>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { EmailList } from '@instincthub/react-ui';

const [emails, setEmails] = useState<string[]>([]);

<EmailList
  label="Email Addresses"
  emails={emails}
  setEmails={setEmails}
  placeholder="Enter email addresses"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Form Integration</h3>
          <pre><code>{`import { EmailList, SubmitButton } from '@instincthub/react-ui';

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (emails.length === 0) {
    console.error("Please add at least one email");
    return;
  }
  console.log("Emails:", emails);
};

<form onSubmit={handleSubmit}>
  <EmailList
    label="Recipients"
    emails={emails}
    setEmails={setEmails}
    placeholder="Add recipient emails"
  />
  <SubmitButton title="Send" status={submitStatus} />
</form>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Bulk Email Input</h3>
          <pre><code>{`<EmailList
  label="Bulk Email List"
  emails={emails}
  setEmails={setEmails}
  placeholder="Paste multiple emails (comma or newline separated)"
  allowBulkInput={true}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Email Validation</h3>
          <pre><code>{`const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

const validEmails = emails.filter(isValidEmail);
const invalidEmails = emails.filter(email => !isValidEmail(email));

console.log(\`Valid: \${validEmails.length}, Invalid: \${invalidEmails.length}\`);`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default EmailListExample;