# ReactTimeTracker

**Category:** Status | **Type:** component

Time tracking component for monitoring activity duration, session time, and elapsed time with real-time updates

**File Location:** `src/components/status/ReactTimeTracker.tsx`

## 🏷️ Tags

`status`, `timer`, `tracking`, `session`, `elapsed`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { ReactTimeTracker } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating ReactTimeTracker usage
 * Shows different tracking modes, session monitoring, and integration patterns
 */
const ReactTimeTrackerExamples = () => {
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<any>({});
  const [trackingMode, setTrackingMode] = useState<"session" | "activity" | "countdown">("session");
  const [trackerSettings, setTrackerSettings] = useState({
    showSeconds: true,
    showMilliseconds: false,
    autoStart: false,
    alertOnMilestones: true,
  });

  // Simulate session management
  const handleStartTracking = () => {
    setIsTracking(true);
    setSessionData({
      startTime: new Date(),
      userId: "user_123",
      sessionId: `session_${Date.now()}`,
    });
    openToast("Time tracking started!");
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    const endTime = new Date();
    const duration = endTime.getTime() - sessionData.startTime?.getTime();
    
    openToast(`Session ended. Duration: ${Math.floor(duration / 1000)} seconds`);
    
    setSessionData(prev => ({
      ...prev,
      endTime,
      duration,
    }));
  };

  const handleTimeUpdate = (timeData: any) => {
    // Handle real-time time updates
    if (timeData.minutes % 5 === 0 && timeData.seconds === 0 && trackerSettings.alertOnMilestones) {
      openToast(`${timeData.minutes} minutes elapsed`);
    }
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ReactTimeTracker Examples</h1>
      <p className="ihub-mb-4">
        Real-time time tracking component for monitoring session duration, activity time,
        and implementing time-based functionality with customizable displays.
      </p>

      {/* Basic Session Tracker */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Session Time Tracker</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Session Monitor</h3>
            <p className="ihub-text-muted">Track user session time with start/stop controls</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-session-tracker">
              <ReactTimeTracker
                isActive={isTracking}
                showHours={true}
                showMinutes={true}
                showSeconds={trackerSettings.showSeconds}
                onTimeUpdate={handleTimeUpdate}
                className="ihub-session-timer"
                format="HH:mm:ss"
              />
              
              <div className="ihub-tracker-controls ihub-mt-3">
                <button
                  className={`ihub-btn ${isTracking ? 'ihub-danger-btn' : 'ihub-success-btn'}`}
                  onClick={isTracking ? handleStopTracking : handleStartTracking}
                >
                  {isTracking ? 'Stop Session' : 'Start Session'}
                </button>
                
                {sessionData.startTime && (
                  <div className="ihub-session-info ihub-mt-3">
                    <small>
                      Session started: {sessionData.startTime.toLocaleTimeString()}
                    </small>
                    {sessionData.endTime && (
                      <small className="ihub-d-block">
                        Session ended: {sessionData.endTime.toLocaleTimeString()}
                      </small>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Tracker */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Activity Time Tracker</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Task Duration Monitor</h3>
            <p className="ihub-text-muted">Track time spent on specific activities or tasks</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-activity-tracker">
              <div className="ihub-row">
                <div className="ihub-col-md-6">
                  <div className="ihub-activity-card">
                    <h4>Development Task</h4>
                    <ReactTimeTracker
                      isActive={true}
                      autoStart={true}
                      showHours={true}
                      showMinutes={true}
                      showSeconds={true}
                      className="ihub-activity-timer"
                      format="HH:mm:ss"
                      onTimeUpdate={(time) => {
                        if (time.hours >= 1 && time.minutes === 0 && time.seconds === 0) {
                          openToast("You've been working for an hour! Consider taking a break.");
                        }
                      }}
                    />
                    <p className="ihub-small">Building React components</p>
                  </div>
                </div>
                
                <div className="ihub-col-md-6">
                  <div className="ihub-activity-card">
                    <h4>Meeting Time</h4>
                    <ReactTimeTracker
                      isActive={false}
                      showHours={true}
                      showMinutes={true}
                      showSeconds={false}
                      className="ihub-activity-timer"
                      format="HH:mm"
                    />
                    <p className="ihub-small">Team standup meeting</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Countdown Timer</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Pomodoro Timer</h3>
            <p className="ihub-text-muted">25-minute productivity timer with break intervals</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-countdown-tracker">
              <ReactTimeTracker
                isActive={true}
                mode="countdown"
                initialTime={25 * 60} // 25 minutes in seconds
                showHours={false}
                showMinutes={true}
                showSeconds={true}
                className="ihub-pomodoro-timer"
                format="mm:ss"
                onComplete={() => {
                  openToast("Pomodoro complete! Time for a 5-minute break.");
                }}
                onTimeUpdate={(time) => {
                  if (time.totalSeconds === 300) { // 5 minutes remaining
                    openToast("5 minutes remaining in this Pomodoro session");
                  }
                }}
              />
              
              <div className="ihub-pomodoro-controls ihub-mt-3">
                <button className="ihub-primary-btn ihub-me-2">
                  Start Focus Session
                </button>
                <button className="ihub-outlined-btn ihub-me-2">
                  Take Break
                </button>
                <button className="ihub-secondary-btn">
                  Reset Timer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Trackers Dashboard */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Multiple Trackers Dashboard</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Project Time Management</h3>
            <p className="ihub-text-muted">Track time across multiple projects simultaneously</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-multi-tracker">
              <div className="ihub-row">
                {[
                  { name: "Frontend Development", color: "#00838f", active: true },
                  { name: "Backend API", color: "#ff6b6b", active: false },
                  { name: "Database Design", color: "#4ecdc4", active: false },
                  { name: "Testing & QA", color: "#ffa726", active: true },
                ].map((project, index) => (
                  <div key={index} className="ihub-col-md-6 ihub-mb-3">
                    <div className="ihub-project-tracker" style={{ borderLeft: `4px solid ${project.color}` }}>
                      <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                        <h5>{project.name}</h5>
                        <span className={`ihub-status-indicator ${project.active ? 'active' : 'inactive'}`}>
                          {project.active ? '●' : '○'}
                        </span>
                      </div>
                      
                      <ReactTimeTracker
                        isActive={project.active}
                        showHours={true}
                        showMinutes={true}
                        showSeconds={false}
                        className="ihub-project-timer"
                        format="HH:mm"
                      />
                      
                      <div className="ihub-project-stats ihub-mt-2">
                        <small>Today: 2h 35m | This week: 18h 42m</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Analytics */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Time Analytics Dashboard</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Productivity Insights</h3>
            <p className="ihub-text-muted">Real-time time tracking analytics and insights</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-analytics-tracker">
              <div className="ihub-row">
                <div className="ihub-col-md-3">
                  <div className="ihub-stat-card">
                    <h4>Today's Total</h4>
                    <ReactTimeTracker
                      isActive={true}
                      autoStart={true}
                      showHours={true}
                      showMinutes={true}
                      showSeconds={false}
                      className="ihub-stat-timer"
                      format="HH:mm"
                    />
                  </div>
                </div>
                
                <div className="ihub-col-md-3">
                  <div className="ihub-stat-card">
                    <h4>Current Session</h4>
                    <ReactTimeTracker
                      isActive={isTracking}
                      showHours={false}
                      showMinutes={true}
                      showSeconds={true}
                      className="ihub-stat-timer"
                      format="mm:ss"
                    />
                  </div>
                </div>
                
                <div className="ihub-col-md-3">
                  <div className="ihub-stat-card">
                    <h4>Avg Session</h4>
                    <div className="ihub-stat-value">23:45</div>
                  </div>
                </div>
                
                <div className="ihub-col-md-3">
                  <div className="ihub-stat-card">
                    <h4>Weekly Goal</h4>
                    <div className="ihub-stat-value">75% (30/40h)</div>
                  </div>
                </div>
              </div>
              
              <div className="ihub-productivity-metrics ihub-mt-4">
                <h4>This Week's Activity</h4>
                <div className="ihub-activity-chart">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                    <div key={day} className="ihub-day-column">
                      <div className="ihub-day-label">{day}</div>
                      <div 
                        className="ihub-time-bar" 
                        style={{ 
                          height: `${Math.random() * 100 + 50}px`,
                          backgroundColor: index === 2 ? '#00838f' : '#e0e0e0'
                        }}
                      ></div>
                      <div className="ihub-time-value">{Math.floor(Math.random() * 8 + 2)}h</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Timer Configuration */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Custom Timer Configuration</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Timer Settings</h3>
            <p className="ihub-text-muted">Customize timer display and behavior</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-row">
              <div className="ihub-col-md-6">
                <div className="ihub-timer-settings">
                  <h4>Display Options</h4>
                  
                  <div className="ihub-setting-group">
                    <label className="ihub-checkbox-label">
                      <input
                        type="checkbox"
                        checked={trackerSettings.showSeconds}
                        onChange={(e) => setTrackerSettings(prev => ({
                          ...prev,
                          showSeconds: e.target.checked
                        }))}
                      />
                      Show Seconds
                    </label>
                  </div>
                  
                  <div className="ihub-setting-group">
                    <label className="ihub-checkbox-label">
                      <input
                        type="checkbox"
                        checked={trackerSettings.showMilliseconds}
                        onChange={(e) => setTrackerSettings(prev => ({
                          ...prev,
                          showMilliseconds: e.target.checked
                        }))}
                      />
                      Show Milliseconds
                    </label>
                  </div>
                  
                  <div className="ihub-setting-group">
                    <label className="ihub-checkbox-label">
                      <input
                        type="checkbox"
                        checked={trackerSettings.autoStart}
                        onChange={(e) => setTrackerSettings(prev => ({
                          ...prev,
                          autoStart: e.target.checked
                        }))}
                      />
                      Auto Start on Load
                    </label>
                  </div>
                  
                  <div className="ihub-setting-group">
                    <label className="ihub-checkbox-label">
                      <input
                        type="checkbox"
                        checked={trackerSettings.alertOnMilestones}
                        onChange={(e) => setTrackerSettings(prev => ({
                          ...prev,
                          alertOnMilestones: e.target.checked
                        }))}
                      />
                      Milestone Alerts
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="ihub-col-md-6">
                <div className="ihub-timer-preview">
                  <h4>Preview</h4>
                  <ReactTimeTracker
                    isActive={true}
                    showHours={true}
                    showMinutes={true}
                    showSeconds={trackerSettings.showSeconds}
                    showMilliseconds={trackerSettings.showMilliseconds}
                    autoStart={trackerSettings.autoStart}
                    className="ihub-preview-timer"
                    format={trackerSettings.showMilliseconds ? "HH:mm:ss:SSS" : "HH:mm:ss"}
                  />
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
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface ReactTimeTrackerProps {
  isActive?: boolean;                    // Whether timer is running
  mode?: 'timer' | 'countdown';          // Timer mode
  initialTime?: number;                  // Initial time in seconds (for countdown)
  showHours?: boolean;                   // Display hours
  showMinutes?: boolean;                 // Display minutes
  showSeconds?: boolean;                 // Display seconds
  showMilliseconds?: boolean;            // Display milliseconds
  autoStart?: boolean;                   // Auto-start on component mount
  format?: string;                       // Time format string
  className?: string;                    // CSS classes
  onTimeUpdate?: (time: TimeData) => void;  // Time update callback
  onComplete?: () => void;               // Completion callback (countdown)
  onStart?: () => void;                  // Start callback
  onStop?: () => void;                   // Stop callback
}`}
          </pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Real-time Updates:</strong> Live time tracking with customizable intervals</li>
            <li><strong>Multiple Modes:</strong> Timer and countdown functionality</li>
            <li><strong>Flexible Display:</strong> Configurable time format and precision</li>
            <li><strong>Event Callbacks:</strong> Hooks for time updates and state changes</li>
            <li><strong>Session Management:</strong> Integration with user session tracking</li>
            <li><strong>Performance Optimized:</strong> Efficient updates and memory management</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use appropriate precision based on use case (avoid milliseconds for long sessions)</li>
            <li>Implement proper cleanup to prevent memory leaks</li>
            <li>Consider user notifications for long-running timers</li>
            <li>Store session data for persistence across page reloads</li>
            <li>Implement proper error handling for timer failures</li>
            <li>Use time zones appropriately for global applications</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ReactTimeTrackerExamples;
```

## 🔗 Related Components

- [TimeTracker](./TimeTracker.md) - Time tracking component
- [SessionHandleProvider](./SessionHandleProvider.md) - Session handling provider component
- [Error500](./Error500.md) - 500 error display component
- [ErrorState](./ErrorState.md) - Error state display component
- [DeleteConfirmationModal](./DeleteConfirmationModal.md) - Delete confirmation modal component

