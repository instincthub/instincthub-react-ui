# ChannelListAvatar

**Category:** Navbar | **Type:** component

Channel list avatar component with customizable avatars, status indicators, and channel management features

**File Location:** `src/components/navbar/ChannelListAvatar.tsx`

## 🏷️ Tags

`navbar`, `avatar`, `channel`, `user-list`, `status`, `dropdown`

```tsx
"use client";
import React, { useState } from "react";
import { ChannelListAvatar } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating ChannelListAvatar usage
 * Shows channel avatars, status indicators, and user management features
 */
const ChannelListAvatarExamples = () => {
  const [selectedChannel, setSelectedChannel] = useState<number | null>(1);
  const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);
  const [avatarSize, setAvatarSize] = useState<string>("medium");

  const channels = [
    {
      id: 1,
      name: "General Discussion",
      members: [
        { id: 1, name: "Alice Johnson", avatar: "https://i.pravatar.cc/150?img=1", status: "online", role: "admin" },
        { id: 2, name: "Bob Smith", avatar: "https://i.pravatar.cc/150?img=2", status: "away", role: "member" },
        { id: 3, name: "Carol Davis", avatar: "https://i.pravatar.cc/150?img=3", status: "online", role: "moderator" },
        { id: 4, name: "David Wilson", avatar: "https://i.pravatar.cc/150?img=4", status: "offline", role: "member" },
        { id: 5, name: "Emma Brown", avatar: "https://i.pravatar.cc/150?img=5", status: "busy", role: "member" },
      ],
      type: "public",
      description: "Main channel for general discussions"
    },
    {
      id: 2,
      name: "Development Team",
      members: [
        { id: 6, name: "Frank Miller", avatar: "https://i.pravatar.cc/150?img=6", status: "online", role: "admin" },
        { id: 7, name: "Grace Chen", avatar: "https://i.pravatar.cc/150?img=7", status: "online", role: "member" },
        { id: 8, name: "Henry Lee", avatar: "https://i.pravatar.cc/150?img=8", status: "away", role: "member" },
      ],
      type: "private",
      description: "Private channel for development team"
    },
    {
      id: 3,
      name: "Design Reviews",
      members: [
        { id: 9, name: "Ivy Taylor", avatar: "https://i.pravatar.cc/150?img=9", status: "online", role: "admin" },
        { id: 10, name: "Jack White", avatar: "https://i.pravatar.cc/150?img=10", status: "busy", role: "member" },
        { id: 11, name: "Kelly Green", avatar: "https://i.pravatar.cc/150?img=11", status: "offline", role: "member" },
        { id: 12, name: "Liam Brown", avatar: "https://i.pravatar.cc/150?img=12", status: "online", role: "member" },
      ],
      type: "public",
      description: "Channel for design reviews and feedback"
    },
  ];

  const currentChannel = channels.find(ch => ch.id === selectedChannel);
  const filteredMembers = currentChannel ? 
    currentChannel.members.filter(member => 
      showOnlineOnly ? member.status === 'online' : true
    ) : [];

  const handleChannelChange = (channelId: number) => {
    setSelectedChannel(channelId);
    const channel = channels.find(ch => ch.id === channelId);
    openToast(`Switched to channel: ${channel?.name}`);
  };

  const handleMemberClick = (member: any) => {
    openToast(`Clicked on ${member.name} (${member.role})`);
  };

  const handleInviteUser = () => {
    openToast("User invitation feature triggered");
  };

  const handleManageChannel = () => {
    openToast("Channel management opened");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#22c55e';
      case 'away': return '#f59e0b';
      case 'busy': return '#ef4444';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getOnlineCount = (members: any[]) => {
    return members.filter(member => member.status === 'online').length;
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>ChannelListAvatar Examples</h1>
      <p className="ihub-mb-4">
        Channel list avatar component with customizable avatars, status indicators,
        and comprehensive channel management features.
      </p>

      {/* Channel Controls */}
      <section className="ihub-mb-5">
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Channel Controls</h3>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-channel-controls">
              <div className="ihub-control-group">
                <label className="ihub-form-label">Select Channel:</label>
                <div className="ihub-button-group">
                  {channels.map((channel) => (
                    <button
                      key={channel.id}
                      className={`ihub-outlined-btn ihub-btn-sm ${selectedChannel === channel.id ? 'active' : ''}`}
                      onClick={() => handleChannelChange(channel.id)}
                    >
                      {channel.name} ({channel.members.length})
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="ihub-control-group">
                <label className="ihub-toggle-label">
                  <input
                    type="checkbox"
                    checked={showOnlineOnly}
                    onChange={(e) => setShowOnlineOnly(e.target.checked)}
                  />
                  Show online members only
                </label>
              </div>
              
              <div className="ihub-control-group">
                <label className="ihub-form-label">Avatar Size:</label>
                <select
                  value={avatarSize}
                  onChange={(e) => setAvatarSize(e.target.value)}
                  className="ihub-select"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Channel Avatar List */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Channel Avatar List</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>{currentChannel?.name || 'Select a Channel'}</h3>
            {currentChannel && (
              <div className="ihub-channel-info">
                <span className="ihub-channel-type">{currentChannel.type}</span>
                <span className="ihub-online-count">
                  {getOnlineCount(currentChannel.members)} online
                </span>
              </div>
            )}
          </div>
          
          <div className="ihub-card-body">
            {currentChannel ? (
              <ChannelListAvatar
                members={filteredMembers}
                size={avatarSize}
                showStatus={true}
                showRoles={true}
                onMemberClick={handleMemberClick}
                maxVisible={8}
                className="ihub-channel-avatars"
                layout="horizontal"
              />
            ) : (
              <p className="ihub-text-muted">Please select a channel to view members</p>
            )}
          </div>
        </div>
      </section>

      {/* Vertical Layout */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Vertical Member List</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Compact Vertical List</h3>
                <p className="ihub-text-muted">Vertical layout with member details</p>
              </div>
              
              <div className="ihub-card-body">
                {currentChannel && (
                  <ChannelListAvatar
                    members={filteredMembers.slice(0, 5)}
                    size="small"
                    layout="vertical"
                    showStatus={true}
                    showRoles={true}
                    showNames={true}
                    onMemberClick={handleMemberClick}
                    className="ihub-vertical-avatars"
                  />
                )}
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Detailed Member Cards</h3>
                <p className="ihub-text-muted">Extended member information</p>
              </div>
              
              <div className="ihub-card-body">
                {currentChannel && (
                  <div className="ihub-member-cards">
                    {filteredMembers.slice(0, 3).map((member) => (
                      <div key={member.id} className="ihub-member-card">
                        <ChannelListAvatar
                          members={[member]}
                          size="large"
                          showStatus={true}
                          showRoles={true}
                          showNames={true}
                          onMemberClick={handleMemberClick}
                          className="ihub-single-avatar"
                        />
                        <div className="ihub-member-details">
                          <h5>{member.name}</h5>
                          <div className="ihub-member-meta">
                            <span className={`ihub-status-badge ${member.status}`}>
                              {member.status}
                            </span>
                            <span className={`ihub-role-badge ${member.role}`}>
                              {member.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Layout */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Grid Layout</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Avatar Grid</h3>
            <p className="ihub-text-muted">Grid layout for larger member lists</p>
          </div>
          
          <div className="ihub-card-body">
            {currentChannel && (
              <ChannelListAvatar
                members={currentChannel.members}
                size={avatarSize}
                layout="grid"
                showStatus={true}
                showRoles={false}
                showNames={true}
                onMemberClick={handleMemberClick}
                gridColumns={4}
                className="ihub-grid-avatars"
              />
            )}
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Interactive Features</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Channel Management</h3>
            <p className="ihub-text-muted">Avatar list with management actions</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-channel-management">
              <div className="ihub-management-header">
                <h4>{currentChannel?.name}</h4>
                <div className="ihub-management-actions">
                  <button
                    className="ihub-outlined-btn ihub-btn-sm"
                    onClick={handleInviteUser}
                  >
                    + Invite User
                  </button>
                  <button
                    className="ihub-outlined-btn ihub-btn-sm"
                    onClick={handleManageChannel}
                  >
                    ⚙️ Manage
                  </button>
                </div>
              </div>
              
              {currentChannel && (
                <>
                  <ChannelListAvatar
                    members={currentChannel.members}
                    size="medium"
                    showStatus={true}
                    showRoles={true}
                    showNames={false}
                    onMemberClick={handleMemberClick}
                    maxVisible={6}
                    showAddButton={true}
                    onAddClick={handleInviteUser}
                    className="ihub-management-avatars"
                  />
                  
                  <div className="ihub-channel-stats ihub-mt-3">
                    <div className="ihub-stat-item">
                      <span className="ihub-stat-label">Total Members:</span>
                      <span className="ihub-stat-value">{currentChannel.members.length}</span>
                    </div>
                    <div className="ihub-stat-item">
                      <span className="ihub-stat-label">Online:</span>
                      <span className="ihub-stat-value">{getOnlineCount(currentChannel.members)}</span>
                    </div>
                    <div className="ihub-stat-item">
                      <span className="ihub-stat-label">Admins:</span>
                      <span className="ihub-stat-value">
                        {currentChannel.members.filter(m => m.role === 'admin').length}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Status Indicators */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Status Indicators</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Status Legend</h3>
            <p className="ihub-text-muted">Different user status types</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-status-legend">
              {['online', 'away', 'busy', 'offline'].map((status) => (
                <div key={status} className="ihub-status-item">
                  <div
                    className="ihub-status-dot"
                    style={{ backgroundColor: getStatusColor(status) }}
                  ></div>
                  <span className="ihub-status-label">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                  <span className="ihub-status-count">
                    ({currentChannel ? currentChannel.members.filter(m => m.status === status).length : 0})
                  </span>
                </div>
              ))}
            </div>
            
            <div className="ihub-status-examples ihub-mt-4">
              <h5>Status Examples:</h5>
              <div className="ihub-status-demo">
                {currentChannel?.members.slice(0, 4).map((member) => (
                  <div key={member.id} className="ihub-status-example">
                    <div className="ihub-avatar-wrapper">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="ihub-avatar ihub-avatar-small"
                      />
                      <div
                        className="ihub-status-indicator"
                        style={{ backgroundColor: getStatusColor(member.status) }}
                      ></div>
                    </div>
                    <div className="ihub-member-info">
                      <span className="ihub-member-name">{member.name}</span>
                      <span className={`ihub-member-status ${member.status}`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                ))}
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
{`interface ChannelListAvatarProps {
  members: Array<{                      // Array of channel members
    id: string | number;
    name: string;
    avatar?: string;
    status?: 'online' | 'away' | 'busy' | 'offline';
    role?: 'admin' | 'moderator' | 'member';
  }>;
  size?: 'small' | 'medium' | 'large';   // Avatar size
  layout?: 'horizontal' | 'vertical' | 'grid'; // Layout type
  showStatus?: boolean;                  // Show status indicators
  showRoles?: boolean;                   // Show role badges
  showNames?: boolean;                   // Show member names
  maxVisible?: number;                   // Maximum visible avatars
  gridColumns?: number;                  // Grid layout columns
  showAddButton?: boolean;               // Show add member button
  className?: string;                    // CSS classes
  onMemberClick?: (member: any) => void; // Member click handler
  onAddClick?: () => void;               // Add button click handler
}`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Multiple Layouts:</strong> Horizontal, vertical, and grid arrangements</li>
            <li><strong>Status Indicators:</strong> Visual status indicators for online presence</li>
            <li><strong>Role Management:</strong> Display user roles and permissions</li>
            <li><strong>Interactive Elements:</strong> Click handlers and management actions</li>
            <li><strong>Customizable Display:</strong> Configurable avatar sizes and visibility options</li>
            <li><strong>Overflow Handling:</strong> Smart handling of large member lists</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use appropriate avatar sizes for the available space</li>
            <li>Provide clear status indicators for better user awareness</li>
            <li>Implement proper click handlers for member interactions</li>
            <li>Consider performance with large member lists</li>
            <li>Ensure accessibility with proper ARIA labels</li>
            <li>Use consistent styling across different layouts</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ChannelListAvatarExamples;
```

## 🔗 Related Components

- [MenuDropdown](./MenuDropdown.md) - Menu dropdown component
- [SideNavbar](./SideNavbar.md) - Side navbar component
- [ResponsiveNavbar](./ResponsiveNavbar.md) - Responsive navbar component
- [Breadcrumb](./Breadcrumb.md) - Breadcrumb component
- [Badge](./Badge.md) - Badge component for status indicators

