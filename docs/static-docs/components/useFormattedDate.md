# useFormattedDate

**Category:** Auth | **Type:** hook

React hook for consistent date formatting between server and client with timezone support and localization

**File Location:** `src/components/auth/useFormattedDate.ts`

## 🏷️ Tags

`auth`, `hook`, `date`, `formatting`, `timezone`, `localization`, `ssr`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { useFormattedDate } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating useFormattedDate usage
 * Shows different date formats, timezone handling, and localization options
 */
const UseFormattedDateExamples = () => {
  const [selectedTimezone, setSelectedTimezone] = useState<string>("UTC");
  const [selectedLocale, setSelectedLocale] = useState<string>("en-US");
  const [customDate, setCustomDate] = useState<Date>(new Date());
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().split('T')[0]);

  const sampleDates = [
    new Date('2024-01-15T10:30:00Z'),
    new Date('2024-03-22T15:45:00Z'),
    new Date('2024-06-10T08:20:00Z'),
    new Date('2024-12-25T00:00:00Z'),
    new Date(), // Current date
  ];

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
  ];

  const locales = [
    'en-US',
    'en-GB',
    'fr-FR',
    'de-DE',
    'es-ES',
    'ja-JP',
    'zh-CN',
    'pt-BR',
  ];

  // Basic date formatting
  const formattedDate = useFormattedDate(customDate, {
    format: 'full',
    timezone: selectedTimezone,
    locale: selectedLocale
  });

  // Short date format
  const shortDate = useFormattedDate(customDate, {
    format: 'short',
    timezone: selectedTimezone,
    locale: selectedLocale
  });

  // Medium date format
  const mediumDate = useFormattedDate(customDate, {
    format: 'medium',
    timezone: selectedTimezone,
    locale: selectedLocale
  });

  // Long date format
  const longDate = useFormattedDate(customDate, {
    format: 'long',
    timezone: selectedTimezone,
    locale: selectedLocale
  });

  // Custom format
  const customFormat = useFormattedDate(customDate, {
    format: 'custom',
    customFormat: 'YYYY-MM-DD HH:mm:ss',
    timezone: selectedTimezone
  });

  // Relative time formatting
  const relativeTime = useFormattedDate(customDate, {
    format: 'relative',
    locale: selectedLocale
  });

  // Multiple dates with different formats
  const multipleDates = sampleDates.map(date => ({
    original: date,
    short: useFormattedDate(date, { format: 'short', timezone: selectedTimezone, locale: selectedLocale }),
    medium: useFormattedDate(date, { format: 'medium', timezone: selectedTimezone, locale: selectedLocale }),
    relative: useFormattedDate(date, { format: 'relative', locale: selectedLocale }),
    custom: useFormattedDate(date, { format: 'custom', customFormat: 'MMM DD, YYYY', timezone: selectedTimezone })
  }));

  const handleTimezoneChange = (timezone: string) => {
    setSelectedTimezone(timezone);
    openToast(`Timezone changed to ${timezone}`);
  };

  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale);
    openToast(`Locale changed to ${locale}`);
  };

  const handleDateInputChange = (value: string) => {
    setDateInput(value);
    setCustomDate(new Date(value + 'T12:00:00Z'));
  };

  const handlePresetDate = (preset: string) => {
    let newDate: Date;
    const now = new Date();
    
    switch (preset) {
      case 'now':
        newDate = now;
        break;
      case 'yesterday':
        newDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'lastWeek':
        newDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'lastMonth':
        newDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'lastYear':
        newDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        newDate = now;
    }
    
    setCustomDate(newDate);
    setDateInput(newDate.toISOString().split('T')[0]);
    openToast(`Date set to ${preset}`);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>useFormattedDate Examples</h1>
      <p className="ihub-mb-4">
        React hook for consistent date formatting between server and client
        with timezone support, localization, and multiple format options.
      </p>

      {/* Date Controls */}
      <section className="ihub-mb-5">
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Date & Locale Controls</h3>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-date-controls">
              <div className="ihub-control-group">
                <label className="ihub-form-label">Select Date:</label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => handleDateInputChange(e.target.value)}
                  className="ihub-input"
                />
              </div>
              
              <div className="ihub-control-group">
                <label className="ihub-form-label">Date Presets:</label>
                <div className="ihub-button-group">
                  {['now', 'yesterday', 'lastWeek', 'lastMonth', 'lastYear'].map((preset) => (
                    <button
                      key={preset}
                      className="ihub-outlined-btn ihub-btn-sm"
                      onClick={() => handlePresetDate(preset)}
                    >
                      {preset.charAt(0).toUpperCase() + preset.slice(1).replace(/([A-Z])/g, ' $1')}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="ihub-control-group">
                <label className="ihub-form-label">Timezone:</label>
                <select
                  value={selectedTimezone}
                  onChange={(e) => handleTimezoneChange(e.target.value)}
                  className="ihub-select"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="ihub-control-group">
                <label className="ihub-form-label">Locale:</label>
                <select
                  value={selectedLocale}
                  onChange={(e) => handleLocaleChange(e.target.value)}
                  className="ihub-select"
                >
                  {locales.map((locale) => (
                    <option key={locale} value={locale}>
                      {locale}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Format Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Date Format Examples</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Current Date in Different Formats</h3>
            <p className="ihub-text-muted">Same date displayed with various formatting options</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-format-examples">
              <div className="ihub-format-item">
                <span className="ihub-format-label">Original Date:</span>
                <span className="ihub-format-value ihub-raw-date">
                  {customDate.toISOString()}
                </span>
              </div>
              
              <div className="ihub-format-item">
                <span className="ihub-format-label">Short Format:</span>
                <span className="ihub-format-value">{shortDate}</span>
              </div>
              
              <div className="ihub-format-item">
                <span className="ihub-format-label">Medium Format:</span>
                <span className="ihub-format-value">{mediumDate}</span>
              </div>
              
              <div className="ihub-format-item">
                <span className="ihub-format-label">Long Format:</span>
                <span className="ihub-format-value">{longDate}</span>
              </div>
              
              <div className="ihub-format-item">
                <span className="ihub-format-label">Full Format:</span>
                <span className="ihub-format-value">{formattedDate}</span>
              </div>
              
              <div className="ihub-format-item">
                <span className="ihub-format-label">Custom Format:</span>
                <span className="ihub-format-value">{customFormat}</span>
              </div>
              
              <div className="ihub-format-item">
                <span className="ihub-format-label">Relative Time:</span>
                <span className="ihub-format-value ihub-relative-time">{relativeTime}</span>
              </div>
            </div>
            
            <div className="ihub-format-info ihub-mt-3">
              <div className="ihub-info-item">
                <span className="ihub-info-label">Current Timezone:</span>
                <span className="ihub-info-value">{selectedTimezone}</span>
              </div>
              <div className="ihub-info-item">
                <span className="ihub-info-label">Current Locale:</span>
                <span className="ihub-info-value">{selectedLocale}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Dates */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Multiple Date Examples</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Date List with Various Formats</h3>
            <p className="ihub-text-muted">Different dates showing format consistency</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-table-responsive">
              <table className="ihub-table ihub-date-table">
                <thead>
                  <tr>
                    <th>Original Date</th>
                    <th>Short Format</th>
                    <th>Medium Format</th>
                    <th>Custom Format</th>
                    <th>Relative Time</th>
                  </tr>
                </thead>
                <tbody>
                  {multipleDates.map((dateItem, index) => (
                    <tr key={index}>
                      <td className="ihub-original-date">
                        {dateItem.original.toISOString().split('T')[0]}
                      </td>
                      <td>{dateItem.short}</td>
                      <td>{dateItem.medium}</td>
                      <td>{dateItem.custom}</td>
                      <td className="ihub-relative-time">{dateItem.relative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Timezone Comparison */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Timezone Comparison</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Same Date Across Timezones</h3>
            <p className="ihub-text-muted">How the same date appears in different timezones</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-timezone-grid">
              {timezones.slice(0, 6).map((timezone) => {
                const tzDate = useFormattedDate(customDate, {
                  format: 'full',
                  timezone: timezone,
                  locale: selectedLocale
                });
                
                const tzTime = useFormattedDate(customDate, {
                  format: 'custom',
                  customFormat: 'HH:mm:ss',
                  timezone: timezone
                });

                return (
                  <div key={timezone} className="ihub-timezone-card">
                    <h4 className="ihub-timezone-title">{timezone}</h4>
                    <div className="ihub-timezone-date">{tzDate}</div>
                    <div className="ihub-timezone-time">{tzTime}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Locale Comparison */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Locale Comparison</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Same Date in Different Locales</h3>
            <p className="ihub-text-muted">Localization examples for international applications</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-locale-examples">
              {locales.map((locale) => {
                const localeDate = useFormattedDate(customDate, {
                  format: 'long',
                  timezone: selectedTimezone,
                  locale: locale
                });
                
                const localeShort = useFormattedDate(customDate, {
                  format: 'short',
                  timezone: selectedTimezone,
                  locale: locale
                });

                return (
                  <div key={locale} className="ihub-locale-item">
                    <div className="ihub-locale-info">
                      <span className="ihub-locale-code">{locale}</span>
                      <span className="ihub-locale-name">
                        {new Intl.DisplayNames([locale], { type: 'language' }).of(locale.split('-')[0])}
                      </span>
                    </div>
                    <div className="ihub-locale-dates">
                      <div className="ihub-locale-long">{localeDate}</div>
                      <div className="ihub-locale-short">{localeShort}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Real-world Usage */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Real-world Usage Examples</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Blog Post Timestamps</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-blog-posts">
                  {[
                    { title: "Getting Started with React", publishDate: new Date('2024-01-15T10:30:00Z') },
                    { title: "TypeScript Best Practices", publishDate: new Date('2024-01-10T15:45:00Z') },
                    { title: "UI Design Principles", publishDate: new Date('2024-01-05T08:20:00Z') },
                  ].map((post, index) => {
                    const publishedDate = useFormattedDate(post.publishDate, {
                      format: 'medium',
                      timezone: selectedTimezone,
                      locale: selectedLocale
                    });
                    
                    const relativeDate = useFormattedDate(post.publishDate, {
                      format: 'relative',
                      locale: selectedLocale
                    });

                    return (
                      <div key={index} className="ihub-blog-post">
                        <h4 className="ihub-post-title">{post.title}</h4>
                        <div className="ihub-post-meta">
                          <span className="ihub-post-date">Published: {publishedDate}</span>
                          <span className="ihub-post-relative">({relativeDate})</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Event Schedule</h3>
              </div>
              <div className="ihub-card-body">
                <div className="ihub-events">
                  {[
                    { name: "Team Meeting", date: new Date('2024-01-20T09:00:00Z') },
                    { name: "Product Demo", date: new Date('2024-01-22T14:30:00Z') },
                    { name: "Client Call", date: new Date('2024-01-25T16:00:00Z') },
                  ].map((event, index) => {
                    const eventDate = useFormattedDate(event.date, {
                      format: 'custom',
                      customFormat: 'MMM DD, YYYY',
                      timezone: selectedTimezone
                    });
                    
                    const eventTime = useFormattedDate(event.date, {
                      format: 'custom',
                      customFormat: 'HH:mm',
                      timezone: selectedTimezone
                    });

                    return (
                      <div key={index} className="ihub-event">
                        <div className="ihub-event-name">{event.name}</div>
                        <div className="ihub-event-datetime">
                          <span className="ihub-event-date">{eventDate}</span>
                          <span className="ihub-event-time">{eventTime}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Hook Interface:</h3>
          <pre className="ihub-code-block">
{`function useFormattedDate(date: Date | string | number, options: {
  format: 'short' | 'medium' | 'long' | 'full' | 'relative' | 'custom';
  timezone?: string;                    // Timezone identifier (e.g., 'UTC', 'America/New_York')
  locale?: string;                      // Locale identifier (e.g., 'en-US', 'fr-FR')
  customFormat?: string;                // Custom format string (for format: 'custom')
  fallback?: string;                    // Fallback text for invalid dates
}): string;`}</pre>
          
          <h3 className="ihub-mt-3">Format Options:</h3>
          <ul>
            <li><strong>short:</strong> Numeric date format (e.g., "1/15/24")</li>
            <li><strong>medium:</strong> Abbreviated month (e.g., "Jan 15, 2024")</li>
            <li><strong>long:</strong> Full month name (e.g., "January 15, 2024")</li>
            <li><strong>full:</strong> Complete date with day name (e.g., "Monday, January 15, 2024")</li>
            <li><strong>relative:</strong> Relative time (e.g., "2 days ago", "in 3 hours")</li>
            <li><strong>custom:</strong> User-defined format using format tokens</li>
          </ul>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>SSR Safe:</strong> Consistent formatting between server and client</li>
            <li><strong>Timezone Support:</strong> Automatic conversion to any timezone</li>
            <li><strong>Internationalization:</strong> Locale-aware formatting</li>
            <li><strong>Custom Formats:</strong> Flexible format string support</li>
            <li><strong>Relative Time:</strong> Human-readable relative timestamps</li>
            <li><strong>Error Handling:</strong> Graceful fallbacks for invalid dates</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use consistent date formats throughout your application</li>
            <li>Consider user timezone and locale preferences</li>
            <li>Provide relative timestamps for recent dates</li>
            <li>Use appropriate format precision for your use case</li>
            <li>Always handle invalid date inputs gracefully</li>
            <li>Test date formatting across different locales and timezones</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default UseFormattedDateExamples;
```

## 🔗 Related Components

- [useClientSide](./useClientSide.md) - Client-side detection hook
- [useExternalData](./useExternalData.md) - External data fetching hook
- [ReactTimeAgo](./ReactTimeAgo.md) - Relative time display component
- [DateInput](./DateInput.md) - Date input component
- [DateTimeInput](./DateTimeInput.md) - Date and time input component

