# CardList

**Category:** UI | **Type:** component

Vertical list layout component for displaying cards in a single column with consistent spacing and interaction states

**File Location:** `src/components/ui/cards/CardList.tsx`

## 🏷️ Tags

`ui`, `cards`, `list`, `layout`, `vertical`

```tsx
"use client";
import React, { useState } from "react";
import { CardList } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating CardList usage
 * Shows different list layouts, item interactions, and customization options
 */
const CardListExamples = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const notifications = [
    { id: 1, title: "New message received", description: "You have a new message from John Doe", type: "message", time: "2 min ago", read: false },
    { id: 2, title: "System update completed", description: "The system has been successfully updated to version 2.1.0", type: "system", time: "1 hour ago", read: true },
    { id: 3, title: "Payment processed", description: "Your payment of $99.99 has been processed successfully", type: "payment", time: "3 hours ago", read: false },
    { id: 4, title: "Profile updated", description: "Your profile information has been updated", type: "profile", time: "1 day ago", read: true },
    { id: 5, title: "New feature available", description: "Check out our new dashboard features", type: "feature", time: "2 days ago", read: false },
  ];

  const transactions = [
    { id: 1, type: "income", amount: 2500.00, description: "Salary payment", date: "2024-01-15", category: "Salary", status: "completed" },
    { id: 2, type: "expense", amount: 89.99, description: "Software subscription", date: "2024-01-14", category: "Software", status: "completed" },
    { id: 3, type: "expense", amount: 450.00, description: "Rent payment", date: "2024-01-13", category: "Housing", status: "pending" },
    { id: 4, type: "income", amount: 150.00, description: "Freelance project", date: "2024-01-12", category: "Freelance", status: "completed" },
    { id: 5, type: "expense", amount: 75.50, description: "Grocery shopping", date: "2024-01-11", category: "Food", status: "completed" },
  ];

  const taskList = [
    { id: 1, title: "Complete project documentation", description: "Write comprehensive documentation for the new project", priority: "high", status: "in-progress", assignee: "John Doe", dueDate: "2024-01-20" },
    { id: 2, title: "Review code changes", description: "Review and approve pending pull requests", priority: "medium", status: "pending", assignee: "Jane Smith", dueDate: "2024-01-18" },
    { id: 3, title: "Update user interface", description: "Implement new design changes to the dashboard", priority: "high", status: "pending", assignee: "Bob Johnson", dueDate: "2024-01-25" },
    { id: 4, title: "Database optimization", description: "Optimize database queries for better performance", priority: "low", status: "completed", assignee: "Alice Brown", dueDate: "2024-01-15" },
    { id: 5, title: "Security audit", description: "Conduct security review of the application", priority: "high", status: "pending", assignee: "Charlie Wilson", dueDate: "2024-01-22" },
  ];

  const handleItemSelect = (itemId: string) => {
    setSelectedItem(itemId);
    openToast(`Selected item: ${itemId}`);
  };

  const handleItemExpand = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleSortChange = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    openToast(`Sorted ${newOrder}ending`);
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    openToast(`Filtered by: ${status}`);
  };

  const filteredTasks = taskList.filter(task => 
    filterStatus === "all" || task.status === filterStatus
  );

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>CardList Examples</h1>
      <p className="ihub-mb-4">
        Vertical list layout component for displaying cards in a single column
        with consistent spacing, interactions, and customizable styling.
      </p>

      {/* Basic Card List */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Notification List</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Notifications</h3>
            <p className="ihub-text-muted">Simple list of notification cards</p>
          </div>
          
          <div className="ihub-card-body ihub-p-0">
            <CardList
              spacing="0"
              dividers={true}
              className="ihub-notification-list"
            >
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`ihub-notification-item ${!notification.read ? 'unread' : ''} ${selectedItem === `notification-${notification.id}` ? 'selected' : ''}`}
                  onClick={() => handleItemSelect(`notification-${notification.id}`)}
                >
                  <div className="ihub-notification-icon">
                    {notification.type === 'message' && '💬'}
                    {notification.type === 'system' && '⚙️'}
                    {notification.type === 'payment' && '💳'}
                    {notification.type === 'profile' && '👤'}
                    {notification.type === 'feature' && '✨'}
                  </div>
                  <div className="ihub-notification-content">
                    <div className="ihub-notification-header">
                      <h4 className="ihub-notification-title">{notification.title}</h4>
                      <span className="ihub-notification-time">{notification.time}</span>
                    </div>
                    <p className="ihub-notification-description">{notification.description}</p>
                  </div>
                  {!notification.read && (
                    <div className="ihub-unread-indicator"></div>
                  )}
                </div>
              ))}
            </CardList>
          </div>
        </div>
      </section>

      {/* Sortable Transaction List */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Sortable Transaction List</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Recent Transactions</h3>
            <p className="ihub-text-muted">List with sorting and status indicators</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-list-controls ihub-mb-3">
              <button
                className="ihub-outlined-btn"
                onClick={handleSortChange}
              >
                Sort by Date ({sortOrder === "asc" ? "Oldest First" : "Newest First"})
              </button>
            </div>
            
            <CardList
              spacing="12px"
              className="ihub-transaction-list"
            >
              {sortedTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`ihub-transaction-card ${transaction.type}`}
                  onClick={() => handleItemSelect(`transaction-${transaction.id}`)}
                >
                  <div className="ihub-transaction-icon">
                    {transaction.type === 'income' ? '💰' : '💸'}
                  </div>
                  <div className="ihub-transaction-content">
                    <div className="ihub-transaction-header">
                      <h4 className="ihub-transaction-description">{transaction.description}</h4>
                      <div className={`ihub-transaction-amount ${transaction.type}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                    <div className="ihub-transaction-meta">
                      <span className="ihub-transaction-category">{transaction.category}</span>
                      <span className="ihub-transaction-date">{transaction.date}</span>
                      <span className={`ihub-transaction-status ${transaction.status}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardList>
          </div>
        </div>
      </section>

      {/* Filterable Task List */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Filterable Task List</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Project Tasks</h3>
            <p className="ihub-text-muted">List with filtering and expandable content</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-filter-controls ihub-mb-3">
              <label className="ihub-form-label">Filter by status:</label>
              <div className="ihub-button-group">
                {["all", "pending", "in-progress", "completed"].map((status) => (
                  <button
                    key={status}
                    className={`ihub-outlined-btn ihub-btn-sm ${filterStatus === status ? 'active' : ''}`}
                    onClick={() => handleFilterChange(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
            
            <CardList
              spacing="16px"
              className="ihub-task-list"
            >
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`ihub-task-card ${task.priority} ${expandedItems.has(`task-${task.id}`) ? 'expanded' : ''}`}
                >
                  <div 
                    className="ihub-task-header"
                    onClick={() => handleItemExpand(`task-${task.id}`)}
                  >
                    <div className="ihub-task-priority">
                      <span className={`ihub-priority-indicator ${task.priority}`}>
                        {task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                      </span>
                    </div>
                    <div className="ihub-task-content">
                      <h4 className="ihub-task-title">{task.title}</h4>
                      <p className="ihub-task-description">{task.description}</p>
                    </div>
                    <div className="ihub-task-status">
                      <span className={`ihub-status-badge ${task.status}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                    </div>
                    <button className="ihub-expand-btn">
                      {expandedItems.has(`task-${task.id}`) ? '▼' : '▶'}
                    </button>
                  </div>
                  
                  {expandedItems.has(`task-${task.id}`) && (
                    <div className="ihub-task-details">
                      <div className="ihub-task-meta">
                        <div className="ihub-meta-item">
                          <span className="ihub-meta-label">Assignee:</span>
                          <span className="ihub-meta-value">{task.assignee}</span>
                        </div>
                        <div className="ihub-meta-item">
                          <span className="ihub-meta-label">Due Date:</span>
                          <span className="ihub-meta-value">{task.dueDate}</span>
                        </div>
                        <div className="ihub-meta-item">
                          <span className="ihub-meta-label">Priority:</span>
                          <span className={`ihub-meta-value priority-${task.priority}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="ihub-task-actions">
                        <button className="ihub-primary-btn ihub-btn-sm">
                          Edit Task
                        </button>
                        <button className="ihub-outlined-btn ihub-btn-sm">
                          Add Comment
                        </button>
                        <button className="ihub-text-btn ihub-btn-sm">
                          View History
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardList>
          </div>
        </div>
      </section>

      {/* Compact List */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Compact List Layout</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="ihub-card-body ihub-p-0">
                <CardList
                  spacing="0"
                  dividers={true}
                  compact={true}
                  className="ihub-quick-actions-list"
                >
                  <div className="ihub-action-item" onClick={() => openToast("Create new document")}>
                    <div className="ihub-action-icon">📄</div>
                    <div className="ihub-action-content">
                      <span className="ihub-action-title">New Document</span>
                      <span className="ihub-action-shortcut">Ctrl+N</span>
                    </div>
                  </div>
                  
                  <div className="ihub-action-item" onClick={() => openToast("Upload files")}>
                    <div className="ihub-action-icon">📤</div>
                    <div className="ihub-action-content">
                      <span className="ihub-action-title">Upload Files</span>
                      <span className="ihub-action-shortcut">Ctrl+U</span>
                    </div>
                  </div>
                  
                  <div className="ihub-action-item" onClick={() => openToast("Share workspace")}>
                    <div className="ihub-action-icon">🔗</div>
                    <div className="ihub-action-content">
                      <span className="ihub-action-title">Share Workspace</span>
                      <span className="ihub-action-shortcut">Ctrl+S</span>
                    </div>
                  </div>
                  
                  <div className="ihub-action-item" onClick={() => openToast("Export data")}>
                    <div className="ihub-action-icon">💾</div>
                    <div className="ihub-action-content">
                      <span className="ihub-action-title">Export Data</span>
                      <span className="ihub-action-shortcut">Ctrl+E</span>
                    </div>
                  </div>
                </CardList>
              </div>
            </div>
          </div>
          
          <div className="ihub-col-md-6">
            <div className="ihub-card">
              <div className="ihub-card-header">
                <h3>Recent Files</h3>
              </div>
              <div className="ihub-card-body ihub-p-0">
                <CardList
                  spacing="0"
                  dividers={true}
                  compact={true}
                  className="ihub-files-list"
                >
                  <div className="ihub-file-item">
                    <div className="ihub-file-icon">📊</div>
                    <div className="ihub-file-content">
                      <span className="ihub-file-name">Monthly Report.xlsx</span>
                      <span className="ihub-file-date">Modified 2 hours ago</span>
                    </div>
                  </div>
                  
                  <div className="ihub-file-item">
                    <div className="ihub-file-icon">📝</div>
                    <div className="ihub-file-content">
                      <span className="ihub-file-name">Project Notes.docx</span>
                      <span className="ihub-file-date">Modified yesterday</span>
                    </div>
                  </div>
                  
                  <div className="ihub-file-item">
                    <div className="ihub-file-icon">🖼️</div>
                    <div className="ihub-file-content">
                      <span className="ihub-file-name">Design Mockup.png</span>
                      <span className="ihub-file-date">Modified 3 days ago</span>
                    </div>
                  </div>
                  
                  <div className="ihub-file-item">
                    <div className="ihub-file-icon">📋</div>
                    <div className="ihub-file-content">
                      <span className="ihub-file-name">Meeting Minutes.pdf</span>
                      <span className="ihub-file-date">Modified 1 week ago</span>
                    </div>
                  </div>
                </CardList>
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
{`interface CardListProps {
  children: React.ReactNode;           // List items to display
  spacing?: string;                    // Space between items (default: "16px")
  className?: string;                  // CSS classes
  dividers?: boolean;                  // Show dividers between items
  compact?: boolean;                   // Compact layout mode
  maxHeight?: string;                  // Maximum height with scroll
  emptyState?: React.ReactNode;        // Content when list is empty
  loading?: boolean;                   // Show loading state
  loadingItems?: number;               // Number of skeleton items while loading
  onScroll?: (event: React.UIEvent) => void; // Scroll event handler
  virtualScrolling?: boolean;          // Enable virtual scrolling for large lists
}`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Flexible Layout:</strong> Support for compact and spacious layouts</li>
            <li><strong>Interactive Items:</strong> Click, hover, and selection states</li>
            <li><strong>Dividers:</strong> Optional dividers between list items</li>
            <li><strong>Scrollable:</strong> Support for fixed height with scrolling</li>
            <li><strong>Empty States:</strong> Customizable content when list is empty</li>
            <li><strong>Loading States:</strong> Skeleton loading for better UX</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use consistent spacing and visual hierarchy for list items</li>
            <li>Implement proper keyboard navigation for accessibility</li>
            <li>Consider virtual scrolling for very long lists (1000+ items)</li>
            <li>Provide clear visual feedback for interactive states</li>
            <li>Use appropriate loading states while fetching data</li>
            <li>Ensure touch targets are large enough for mobile devices</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CardListExamples;
```

## 🔗 Related Components

- [CardGrid](./CardGrid.md) - Card grid layout component
- [Card](./Card.md) - Basic card component
- [ComponentLists](./ComponentLists.md) - Component listing component
- [Tables](./Tables.md) - Table layout component
- [VerticalTabs](./VerticalTabs.md) - Vertical tab navigation

