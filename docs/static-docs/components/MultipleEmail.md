# MultipleEmail

**Category:** Forms | **Type:** component

Multiple email input component

## 🏷️ Tags

`forms`, `email`, `input`, `validation`, `tags`

```tsx
"use client";
import React, { useState } from "react";
import { MultipleEmail } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the MultipleEmail
 */
const MultipleEmailExamples = () => {
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [newsletterEmails, setNewsletterEmails] = useState<string[]>([]);
  const [notificationEmails, setNotificationEmails] = useState<string[]>([]);
  const [teamEmails, setTeamEmails] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    projectEmails: [] as string[],
    ccEmails: [] as string[],
    bccEmails: [] as string[],
  });

  // Handle email changes for different components
  const handleInviteEmailsChange = (emails: string[]) => {
    setInviteEmails(emails);
    console.log("Invite emails updated:", emails);
    if (emails.length > 0) {
      openToast(`${emails.length} invite email(s) added`);
    }
  };

  const handleNewsletterEmailsChange = (emails: string[]) => {
    setNewsletterEmails(emails);
    console.log("Newsletter emails updated:", emails);
  };

  const handleNotificationEmailsChange = (emails: string[]) => {
    setNotificationEmails(emails);
    console.log("Notification emails updated:", emails);
    
    // Show notification when reaching certain thresholds
    if (emails.length === 5) {
      openToast("Consider creating a mailing list for better management");
    }
  };

  const handleTeamEmailsChange = (emails: string[]) => {
    setTeamEmails(emails);
    console.log("Team emails updated:", emails);
    
    // Validate team size
    if (emails.length > 10) {
      openToast("Large teams may require additional permissions");
    }
  };

  const handleFormEmailsChange = (field: string) => (emails: string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: emails
    }));
    console.log(`${field} updated:`, emails);
  };

  // Form validation
  const validateForm = () => {
    const errors = [];
    
    if (inviteEmails.length === 0) {
      errors.push("At least one invite email is required");
    }
    
    if (teamEmails.length === 0) {
      errors.push("At least one team member email is required");
    }
    
    // Check for common domains in team emails
    const teamDomains = teamEmails.map(email => email.split('@')[1]);
    const uniqueDomains = [...new Set(teamDomains)];
    if (uniqueDomains.length > 3) {
      errors.push("Team members from more than 3 different organizations detected");
    }
    
    if (errors.length > 0) {
      openToast(`Validation errors: ${errors.join("; ")}`);
      return false;
    }
    
    openToast("All email fields are valid!");
    return true;
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submissionData = {
        inviteEmails,
        newsletterEmails,
        notificationEmails,
        teamEmails,
        ...formData
      };
      
      console.log("Form submitted with emails:", submissionData);
      
      // Count total unique emails
      const allEmails = [
        ...inviteEmails,
        ...newsletterEmails,
        ...notificationEmails,
        ...teamEmails,
        ...formData.projectEmails,
        ...formData.ccEmails,
        ...formData.bccEmails
      ];
      const uniqueEmails = [...new Set(allEmails)];
      
      openToast(`Form submitted with ${uniqueEmails.length} unique email addresses!`);
    }
  };

  // Bulk operations
  const addSampleEmails = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    const sampleEmails = [
      "john.doe@example.com",
      "jane.smith@company.org",
      "team@startup.io"
    ];
    setter(prev => [...prev, ...sampleEmails.filter(email => !prev.includes(email))]);
    openToast("Sample emails added");
  };

  const clearAllEmails = () => {
    setInviteEmails([]);
    setNewsletterEmails([]);
    setNotificationEmails([]);
    setTeamEmails([]);
    setFormData({ projectEmails: [], ccEmails: [], bccEmails: [] });
    openToast("All email fields cleared");
  };

  // Export functionality
  const exportEmails = () => {
    const allEmails = [
      ...inviteEmails,
      ...newsletterEmails,
      ...notificationEmails,
      ...teamEmails,
      ...formData.projectEmails,
      ...formData.ccEmails,
      ...formData.bccEmails
    ];
    const uniqueEmails = [...new Set(allEmails)];
    
    const emailList = uniqueEmails.join('\n');
    navigator.clipboard.writeText(emailList);
    openToast(`${uniqueEmails.length} unique emails copied to clipboard`);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>MultipleEmail Examples</h1>

      <form onSubmit={handleSubmit}>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            {/* Basic invitation emails */}
            <div className="ihub-mb-4">
              <h3>Event Invitation Emails</h3>
              <p className="ihub-mb-3">
                Add email addresses of people you want to invite to the event.
                Separate emails with commas, Enter, or Tab.
              </p>
              <MultipleEmail onEmailsChange={handleInviteEmailsChange} />
              <p className="ihub-text-muted ihub-mt-2">
                Current invites: {inviteEmails.length}
              </p>
              <button
                type="button"
                className="ihub-outlined-btn ihub-btn-sm ihub-mt-2"
                onClick={() => addSampleEmails(setInviteEmails)}
              >
                Add Sample Emails
              </button>
            </div>

            {/* Newsletter subscription emails */}
            <div className="ihub-mb-4">
              <h3>Newsletter Subscribers</h3>
              <p className="ihub-mb-3">
                Manage your newsletter subscriber list. Paste multiple emails 
                from your clipboard or enter them manually.
              </p>
              <MultipleEmail onEmailsChange={handleNewsletterEmailsChange} />
              <p className="ihub-text-muted ihub-mt-2">
                Subscribers: {newsletterEmails.length}
              </p>
            </div>

            {/* Project notification emails */}
            <div className="ihub-mb-4">
              <h3>Project Notifications</h3>
              <p className="ihub-mb-3">
                Add emails of team members who should receive project updates 
                and notifications.
              </p>
              <MultipleEmail onEmailsChange={handleNotificationEmailsChange} />
              <p className="ihub-text-muted ihub-mt-2">
                Notification recipients: {notificationEmails.length}
              </p>
              {notificationEmails.length > 3 && (
                <div className="ihub-alert ihub-alert-info ihub-mt-2">
                  💡 Tip: Consider creating email groups for better management
                </div>
              )}
            </div>
          </div>

          <div className="ihub-col-md-6">
            {/* Team member emails */}
            <div className="ihub-mb-4">
              <h3>Team Members</h3>
              <p className="ihub-mb-3">
                Add email addresses of team members who will have access to 
                this project workspace.
              </p>
              <MultipleEmail onEmailsChange={handleTeamEmailsChange} />
              <p className="ihub-text-muted ihub-mt-2">
                Team size: {teamEmails.length}
              </p>
              {teamEmails.length > 0 && (
                <div className="ihub-mt-2">
                  <small className="ihub-text-muted">
                    Domains: {[...new Set(teamEmails.map(email => email.split('@')[1]))].join(', ')}
                  </small>
                </div>
              )}
            </div>

            {/* Email form fields */}
            <div className="ihub-mb-4">
              <h3>Email Composition</h3>
              
              <div className="ihub-mb-3">
                <label className="ihub-form-label">
                  <strong>Project Collaborators</strong>
                </label>
                <MultipleEmail onEmailsChange={handleFormEmailsChange("projectEmails")} />
                <small className="ihub-text-muted">
                  People who can edit project files
                </small>
              </div>

              <div className="ihub-mb-3">
                <label className="ihub-form-label">
                  <strong>CC Recipients</strong>
                </label>
                <MultipleEmail onEmailsChange={handleFormEmailsChange("ccEmails")} />
                <small className="ihub-text-muted">
                  People who will receive copies of communications
                </small>
              </div>

              <div className="ihub-mb-3">
                <label className="ihub-form-label">
                  <strong>BCC Recipients</strong>
                </label>
                <MultipleEmail onEmailsChange={handleFormEmailsChange("bccEmails")} />
                <small className="ihub-text-muted">
                  Hidden recipients (for privacy)
                </small>
              </div>
            </div>
          </div>
        </div>

        <div className="ihub-mt-4 ihub-d-flex ihub-gap-3 ihub-flex-wrap">
          <button
            type="button"
            className="ihub-outlined-btn"
            onClick={validateForm}
          >
            Validate All
          </button>
          <button type="submit" className="ihub-important-btn">
            Send Invitations
          </button>
          <button
            type="button"
            className="ihub-secondary-btn"
            onClick={exportEmails}
          >
            Export All Emails
          </button>
          <button
            type="button"
            className="ihub-danger-btn"
            onClick={clearAllEmails}
          >
            Clear All
          </button>
        </div>
      </form>

      {/* Email summary */}
      <div className="ihub-mt-5 ihub-p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3>Email Summary</h3>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <ul>
              <li><strong>Invite Emails:</strong> {inviteEmails.length}</li>
              <li><strong>Newsletter Subscribers:</strong> {newsletterEmails.length}</li>
              <li><strong>Notification Recipients:</strong> {notificationEmails.length}</li>
            </ul>
          </div>
          <div className="ihub-col-md-6">
            <ul>
              <li><strong>Team Members:</strong> {teamEmails.length}</li>
              <li><strong>Project Collaborators:</strong> {formData.projectEmails.length}</li>
              <li><strong>CC Recipients:</strong> {formData.ccEmails.length}</li>
              <li><strong>BCC Recipients:</strong> {formData.bccEmails.length}</li>
            </ul>
          </div>
        </div>
        <div className="ihub-mt-3">
          <strong>Total Unique Emails:</strong> {
            [...new Set([
              ...inviteEmails,
              ...newsletterEmails,
              ...notificationEmails,
              ...teamEmails,
              ...formData.projectEmails,
              ...formData.ccEmails,
              ...formData.bccEmails
            ])].length
          }
        </div>
      </div>

      {/* Real-world integration examples */}
      <div className="ihub-mt-5">
        <h2>Real-world Integration Examples</h2>

        {/* Marketing campaign */}
        <div className="ihub-mb-4">
          <h3>Marketing Campaign Recipients</h3>
          <p className="ihub-mb-3">
            Build your marketing email list. You can paste email lists from 
            CSV files or CRM exports.
          </p>
          <MultipleEmail 
            onEmailsChange={(emails) => {
              console.log("Marketing emails:", emails);
              if (emails.length >= 100) {
                openToast("Large email list detected. Consider segmentation for better delivery rates.");
              }
            }} 
          />
        </div>

        {/* Customer support escalation */}
        <div className="ihub-mb-4">
          <h3>Support Escalation List</h3>
          <p className="ihub-mb-3">
            Add emails of managers and senior support staff who should be 
            notified for high-priority issues.
          </p>
          <MultipleEmail 
            onEmailsChange={(emails) => {
              console.log("Escalation emails:", emails);
              if (emails.length > 0) {
                openToast(`${emails.length} escalation contact(s) configured`);
              }
            }} 
          />
        </div>

        {/* Emergency contact list */}
        <div className="ihub-mb-4">
          <h3>Emergency Contact List</h3>
          <p className="ihub-mb-3">
            Critical system alerts and emergency notifications will be sent 
            to these email addresses.
          </p>
          <MultipleEmail 
            onEmailsChange={(emails) => {
              console.log("Emergency contacts:", emails);
              if (emails.length === 0) {
                openToast("⚠️ Warning: No emergency contacts configured");
              } else if (emails.length < 2) {
                openToast("💡 Recommendation: Add multiple emergency contacts for redundancy");
              }
            }} 
          />
        </div>

        {/* Integration example with external services */}
        <div className="ihub-mb-4">
          <h3>External Service Integration</h3>
          <p className="ihub-mb-3">
            Example showing how to integrate with email marketing services:
          </p>
          <MultipleEmail 
            onEmailsChange={(emails) => {
              // Simulate API call to external service
              console.log("Syncing with external service:", emails);
              
              // Validate email formats for external service
              const invalidEmails = emails.filter(email => 
                !email.includes('@') || !email.includes('.')
              );
              
              if (invalidEmails.length > 0) {
                openToast(`⚠️ Invalid emails detected: ${invalidEmails.join(', ')}`);
              } else if (emails.length > 0) {
                openToast(`✅ ${emails.length} emails ready for sync`);
              }
            }} 
          />
          <div className="ihub-mt-2">
            <small className="ihub-text-muted">
              💡 In real applications, this would sync with services like 
              Mailchimp, SendGrid, or your CRM system.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultipleEmailExamples;
```

## 🔗 Related Components

- [InputText](./InputText.md) - Text input component
- [InputTextarea](./InputTextarea.md) - Textarea input component
- [ChipsInput](./ChipsInput.md) - Chips input component
- [SearchObjectsFromDB](./SearchObjectsFromDB.md) - Database search component