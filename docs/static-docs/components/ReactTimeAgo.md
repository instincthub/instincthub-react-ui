# ReactTimeAgo

**Category:** Forms | **Type:** component

Live updating relative time display component that shows human-readable time differences

## 🏷️ Tags

`forms`, `time`, `relative`, `live-updates`, `timestamp`

```tsx
"use client";
import React, { useState } from "react";
import { ReactTimeAgo } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use ReactTimeAgo
 */
const ReactTimeAgoExamples = () => {
  // Sample dates for demonstration
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const futureDate = new Date(now.getTime() + 60 * 60 * 1000);

  // Custom formatter example
  const customFormatter = (value: number, unit: string): string => {
    const unitMap: Record<string, string> = {
      year: "yr",
      month: "mo",
      week: "w",
      day: "d",
      hour: "h",
      minute: "m",
      second: "s",
    };
    
    const shortUnit = unitMap[unit] || unit;
    return `${value}${shortUnit}`;
  };

  // International formatter
  const internationalFormatter = (value: number, unit: string): string => {
    const translations: Record<string, Record<string, string>> = {
      en: { year: "year", month: "month", week: "week", day: "day", hour: "hour", minute: "minute", second: "second" },
      es: { year: "año", month: "mes", week: "semana", day: "día", hour: "hora", minute: "minuto", second: "segundo" },
      fr: { year: "an", month: "mois", week: "semaine", day: "jour", hour: "heure", minute: "minute", second: "seconde" }
    };

    const lang = "es"; // Example: Spanish
    const unitStr = value === 1 ? translations[lang][unit] : `${translations[lang][unit]}s`;
    return `hace ${value} ${unitStr}`;
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ReactTimeAgo Examples</h1>

      {/* Basic Usage Examples */}
      <section className="ihub-mb-5">
        <h2>📌 Basic Time Display</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h4>Various Time Periods</h4>
              <ul className="list-unstyled">
                <li className="ihub-mb-2">
                  <strong>Just now:</strong> <ReactTimeAgo date={now} />
                </li>
                <li className="ihub-mb-2">
                  <strong>5 minutes ago:</strong> <ReactTimeAgo date={fiveMinutesAgo} />
                </li>
                <li className="ihub-mb-2">
                  <strong>1 hour ago:</strong> <ReactTimeAgo date={oneHourAgo} />
                </li>
                <li className="ihub-mb-2">
                  <strong>1 day ago:</strong> <ReactTimeAgo date={oneDayAgo} />
                </li>
                <li className="ihub-mb-2">
                  <strong>1 week ago:</strong> <ReactTimeAgo date={oneWeekAgo} />
                </li>
                <li className="ihub-mb-2">
                  <strong>1 month ago:</strong> <ReactTimeAgo date={oneMonthAgo} />
                </li>
                <li className="ihub-mb-2">
                  <strong>Future date:</strong> <ReactTimeAgo date={futureDate} />
                </li>
              </ul>
            </div>
            
            <div className="ihub-col-md-6">
              <h4>Different Date Formats</h4>
              <ul className="list-unstyled">
                <li className="ihub-mb-2">
                  <strong>ISO String:</strong> <ReactTimeAgo date="2024-01-15T10:30:00Z" />
                </li>
                <li className="ihub-mb-2">
                  <strong>Timestamp:</strong> <ReactTimeAgo date={1705318200000} />
                </li>
                <li className="ihub-mb-2">
                  <strong>Date Object:</strong> <ReactTimeAgo date={oneHourAgo} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Live Updates Example */}
      <section className="ihub-mb-5">
        <h2>🔄 Live Updates vs Static</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h4>Live Updates (Updates every 10 seconds)</h4>
              <p className="text-muted">This timestamp updates automatically:</p>
              <div className="ihub-badge ihub-primary">
                <ReactTimeAgo 
                  date={fiveMinutesAgo} 
                  live={true} 
                  updateInterval={10000}
                />
              </div>
            </div>
            
            <div className="ihub-col-md-6">
              <h4>Static Display</h4>
              <p className="text-muted">This timestamp never updates:</p>
              <div className="ihub-badge ihub-secondary">
                <ReactTimeAgo 
                  date={fiveMinutesAgo} 
                  live={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Formatters */}
      <section className="ihub-mb-5">
        <h2>🎨 Custom Formatters</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <h4>Default Format</h4>
              <ReactTimeAgo date={oneHourAgo} />
            </div>
            
            <div className="ihub-col-md-4">
              <h4>Short Format</h4>
              <ReactTimeAgo 
                date={oneHourAgo}
                formatter={customFormatter}
              />
            </div>
            
            <div className="ihub-col-md-4">
              <h4>Spanish Format</h4>
              <ReactTimeAgo 
                date={oneHourAgo}
                formatter={internationalFormatter}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Practical Use Cases */}
      <section className="ihub-mb-5">
        <h2>💼 Practical Use Cases</h2>

        {/* Comment Section */}
        <div className="ihub-card ihub-mb-4">
          <div className="ihub-card-header">
            <h4>Comment Section</h4>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-mb-3 ihub-pb-3" style={{ borderBottom: "1px solid #eee" }}>
              <div className="ihub-d-flex ihub-align-items-center ihub-mb-2">
                <div className="ihub-avatar ihub-me-3" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#007bff", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  JD
                </div>
                <div>
                  <strong>John Doe</strong>
                  <small className="text-muted ihub-ms-2">
                    <ReactTimeAgo date={fiveMinutesAgo} />
                  </small>
                </div>
              </div>
              <p>Great article! This really helped me understand the concept better.</p>
            </div>
            
            <div className="ihub-mb-3 ihub-pb-3" style={{ borderBottom: "1px solid #eee" }}>
              <div className="ihub-d-flex ihub-align-items-center ihub-mb-2">
                <div className="ihub-avatar ihub-me-3" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#28a745", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  JS
                </div>
                <div>
                  <strong>Jane Smith</strong>
                  <small className="text-muted ihub-ms-2">
                    <ReactTimeAgo date={oneHourAgo} />
                  </small>
                </div>
              </div>
              <p>I had the same question. Thanks for sharing!</p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="ihub-card ihub-mb-4">
          <div className="ihub-card-header">
            <h4>Activity Feed</h4>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-timeline">
              <div className="ihub-timeline-item ihub-mb-3">
                <div className="ihub-d-flex">
                  <div className="ihub-timeline-marker ihub-me-3" style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#007bff", marginTop: "4px" }}></div>
                  <div>
                    <p className="ihub-mb-1">
                      <strong>User signed up</strong>
                      <small className="text-muted ihub-ms-2">
                        <ReactTimeAgo date={fiveMinutesAgo} />
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="ihub-timeline-item ihub-mb-3">
                <div className="ihub-d-flex">
                  <div className="ihub-timeline-marker ihub-me-3" style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#28a745", marginTop: "4px" }}></div>
                  <div>
                    <p className="ihub-mb-1">
                      <strong>Profile completed</strong>
                      <small className="text-muted ihub-ms-2">
                        <ReactTimeAgo date={oneHourAgo} />
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="ihub-timeline-item ihub-mb-3">
                <div className="ihub-d-flex">
                  <div className="ihub-timeline-marker ihub-me-3" style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffc107", marginTop: "4px" }}></div>
                  <div>
                    <p className="ihub-mb-1">
                      <strong>First purchase made</strong>
                      <small className="text-muted ihub-ms-2">
                        <ReactTimeAgo date={oneDayAgo} />
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="ihub-card ihub-mb-4">
          <div className="ihub-card-header">
            <h4>Blog Posts</h4>
          </div>
          <div className="ihub-card-body">
            <article className="ihub-mb-4 ihub-pb-3" style={{ borderBottom: "1px solid #eee" }}>
              <h5>Understanding React Hooks</h5>
              <p className="text-muted ihub-mb-2">
                Published <ReactTimeAgo date={oneDayAgo} /> by <strong>Tech Writer</strong>
              </p>
              <p>A comprehensive guide to understanding and using React Hooks in your applications...</p>
            </article>
            
            <article className="ihub-mb-4 ihub-pb-3" style={{ borderBottom: "1px solid #eee" }}>
              <h5>Building Scalable Applications</h5>
              <p className="text-muted ihub-mb-2">
                Published <ReactTimeAgo date={oneWeekAgo} /> by <strong>Senior Developer</strong>
              </p>
              <p>Best practices for building applications that can scale with your business...</p>
            </article>
          </div>
        </div>

        {/* Notification List */}
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h4>Notifications</h4>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-notification-item ihub-d-flex ihub-align-items-center ihub-mb-3 ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <div className="ihub-notification-icon ihub-me-3" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#007bff", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                📧
              </div>
              <div className="ihub-flex-grow-1">
                <p className="ihub-mb-1"><strong>New message received</strong></p>
                <small className="text-muted">
                  <ReactTimeAgo date={fiveMinutesAgo} updateInterval={30000} />
                </small>
              </div>
            </div>
            
            <div className="ihub-notification-item ihub-d-flex ihub-align-items-center ihub-mb-3 ihub-p-3" style={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
              <div className="ihub-notification-icon ihub-me-3" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#28a745", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                ✅
              </div>
              <div className="ihub-flex-grow-1">
                <p className="ihub-mb-1"><strong>Task completed</strong></p>
                <small className="text-muted">
                  <ReactTimeAgo date={oneHourAgo} />
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Examples */}
      <section className="ihub-mb-5">
        <h2>⚡ Performance Considerations</h2>
        <div className="ihub-card ihub-p-4">
          <div className="ihub-row">
            <div className="ihub-col-md-6">
              <h4>High Frequency Updates (1 second)</h4>
              <p className="text-muted">Use with caution - high CPU usage</p>
              <ReactTimeAgo 
                date={now} 
                updateInterval={1000}
                live={true}
              />
            </div>
            
            <div className="ihub-col-md-6">
              <h4>Optimal Updates (1 minute)</h4>
              <p className="text-muted">Recommended for most use cases</p>
              <ReactTimeAgo 
                date={fiveMinutesAgo} 
                updateInterval={60000}
                live={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* API Props Summary */}
      <section className="ihub-mb-5">
        <h2>📋 Component Props</h2>
        <div className="ihub-card ihub-p-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>date</code></td>
                <td><code>string | number | Date</code></td>
                <td>Required</td>
                <td>The date to calculate time ago from</td>
              </tr>
              <tr>
                <td><code>live</code></td>
                <td><code>boolean</code></td>
                <td><code>true</code></td>
                <td>Whether to update the time automatically</td>
              </tr>
              <tr>
                <td><code>updateInterval</code></td>
                <td><code>number</code></td>
                <td><code>60000</code></td>
                <td>Update interval in milliseconds (when live=true)</td>
              </tr>
              <tr>
                <td><code>formatter</code></td>
                <td><code>(value: number, unit: string) => string</code></td>
                <td>Default formatter</td>
                <td>Custom function to format the time display</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ReactTimeAgoExamples;
```

## 🔗 Related Components

- [ActionDropdown](./ActionDropdown.md) - Dropdown component for actions
- [AnimatedBox](./AnimatedBox.md) - Animated container component
- [PasswordField](./PasswordField.md) - Secure password input field
- [DateInput](./DateInput.md) - Date selection input field
- [DateTimeInput](./DateTimeInput.md) - Date and time selection input field

