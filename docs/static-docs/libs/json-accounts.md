# Account & Course Data Collections

**Category:** Library | **Type:** JSON data collections

Sample data collections for educational platform development including user accounts, course features, project history, and comment structures. Provides realistic mock data for testing, prototyping, and development scenarios.

## 📁 File Location

`src/components/lib/json/accounts.ts`

## 🏷️ Tags

`mock-data`, `accounts`, `courses`, `projects`, `comments`, `educational`, `development`, `testing`, `nigeria`

## 📖 Usage Examples

### Example 1: Complete Educational Platform Data Dashboard

```tsx
"use client";

import React, { useState } from "react";
import {
  accounts,
  AllCoursesdataList,
  DataList,
  dataList,
  projectStartHistory,
  pending,
  statesNigeria,
  COMMENTS_BY
} from "@instincthub/react-ui/lib";

/**
 * Educational platform data showcase with all available collections
 */
const EducationalDataDashboard = () => {
  const [selectedDataType, setSelectedDataType] = useState<string>("accounts");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  // Data type configurations
  const dataTypes = [
    { id: "accounts", label: "User Accounts", icon: "pi-users", data: accounts },
    { id: "features", label: "Course Features", icon: "pi-list", data: AllCoursesdataList },
    { id: "access", label: "Access Features", icon: "pi-key", data: DataList },
    { id: "courses", label: "Course Archive", icon: "pi-book", data: dataList },
    { id: "projects", label: "Project History", icon: "pi-calendar", data: projectStartHistory },
    { id: "pending", label: "Pending Tasks", icon: "pi-clock", data: pending },
    { id: "states", label: "Nigerian States", icon: "pi-map", data: statesNigeria },
    { id: "comments", label: "Comments", icon: "pi-comments", data: COMMENTS_BY }
  ];

  // Filter data based on search term
  const filterData = (data: any[], term: string) => {
    if (!term) return data;
    return data.filter(item => {
      if (typeof item === 'string') {
        return item.toLowerCase().includes(term.toLowerCase());
      }
      return JSON.stringify(item).toLowerCase().includes(term.toLowerCase());
    });
  };

  const currentDataType = dataTypes.find(dt => dt.id === selectedDataType);
  const filteredData = currentDataType ? filterData(currentDataType.data, searchTerm) : [];

  return (
    <div className="ihub-container ihub-py-5">
      <h1>Educational Platform Data Collections</h1>
      
      {/* Data Type Selector */}
      <section className="ihub-mb-4">
        <h2 className="ihub-fs-lg ihub-mb-3">Data Collections</h2>
        <div className="ihub-row">
          {dataTypes.map((type) => (
            <div key={type.id} className="ihub-col-lg-3 ihub-col-md-4 ihub-col-sm-6 ihub-mb-2">
              <button
                className={`ihub-btn ihub-w-100 ${
                  selectedDataType === type.id 
                    ? 'ihub-btn-primary' 
                    : 'ihub-btn-outline-primary'
                }`}
                onClick={() => setSelectedDataType(type.id)}
              >
                <i className={`${type.icon} ihub-me-2`}></i>
                {type.label}
                <span className="ihub-badge ihub-badge-light ihub-ms-2">
                  {type.data.length}
                </span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Search and Filters */}
      <section className="ihub-mb-4">
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <div className="ihub-input-group">
              <span className="ihub-input-group-text">
                <i className="pi pi-search"></i>
              </span>
              <input
                type="text"
                className="ihub-form-control"
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="ihub-col-md-6">
            <div className="ihub-d-flex ihub-align-items-center">
              <span className="ihub-me-2">Results:</span>
              <span className="ihub-badge ihub-badge-info">
                {filteredData.length} items
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* User Accounts Display */}
      {selectedDataType === "accounts" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">User Accounts</h2>
          <div className="ihub-row">
            {filteredData.map((account: any, index) => (
              <div key={account.id || index} className="ihub-col-md-6 ihub-col-lg-4 ihub-mb-3">
                <div className="ihub-card">
                  <div className="ihub-card-body ihub-p-4">
                    <div className="ihub-d-flex ihub-align-items-center">
                      <div className="ihub-avatar ihub-me-3">
                        <i className="pi pi-user" style={{ fontSize: "24px" }}></i>
                      </div>
                      <div>
                        <h6 className="ihub-mb-1">{account.name}</h6>
                        <span className={`ihub-badge ${
                          account.type === "Staff" ? "ihub-badge-primary" : "ihub-badge-success"
                        }`}>
                          {account.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Course Features Display */}
      {(selectedDataType === "features" || selectedDataType === "access") && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">
            {selectedDataType === "features" ? "Course Plan Features" : "Access Features"}
          </h2>
          <div className="ihub-card">
            <div className="ihub-card-body ihub-p-4">
              <div className="ihub-row">
                {filteredData.map((item: any, index) => (
                  <div key={index} className="ihub-col-md-6 ihub-mb-3">
                    <div className="ihub-d-flex ihub-align-items-center">
                      <i className={`pi ${
                        item.icon === "done" ? "pi-check-circle text-success" : "pi-times-circle text-danger"
                      } ihub-me-3`} style={{ fontSize: "20px" }}></i>
                      <span>{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Course Archive Display */}
      {selectedDataType === "courses" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Course Archive</h2>
          <div className="ihub-card">
            <div className="table-responsive">
              <table className="table table-hover ihub-mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Course Title</th>
                    <th>Archive Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((course: any, index) => (
                    <tr key={index}>
                      <td>
                        <div className="ihub-d-flex ihub-align-items-center">
                          <i className="pi pi-book ihub-me-2 text-primary"></i>
                          {course.title}
                        </div>
                      </td>
                      <td>{course.archiveDate}</td>
                      <td>
                        <span className="ihub-badge ihub-badge-warning">
                          Archived
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Project History Display */}
      {selectedDataType === "projects" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Project Timeline</h2>
          <div className="ihub-card ihub-p-4">
            <div className="ihub-timeline">
              {filteredData.map((project: any, index) => (
                <div key={index} className="ihub-mb-4">
                  <div className="ihub-d-flex">
                    <div className="ihub-me-3">
                      <div className={`ihub-badge ${
                        project.title.includes("Started") ? "ihub-badge-info" : "ihub-badge-success"
                      } ihub-rounded-circle`} style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className={`pi ${
                          project.title.includes("Started") ? "pi-play" : "pi-check"
                        }`}></i>
                      </div>
                    </div>
                    <div>
                      <h6 className="ihub-mb-1">{project.title}</h6>
                      <div className="text-muted">
                        <i className="pi pi-calendar ihub-me-1"></i>
                        {project.date}
                        <span className="ihub-ms-2">
                          <i className="pi pi-clock ihub-me-1"></i>
                          {project.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pending Tasks Display */}
      {selectedDataType === "pending" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Pending Tasks</h2>
          <div className="ihub-row">
            {filteredData.map((task: any, index) => (
              <div key={index} className="ihub-col-md-6 ihub-col-lg-4 ihub-mb-3">
                <div className="ihub-card ihub-h-100">
                  <div className="ihub-card-body ihub-p-4">
                    <h6 className="ihub-card-title">{task.title}</h6>
                    <div className="ihub-mb-2">
                      <span className="ihub-badge ihub-badge-primary">
                        {task.stack}
                      </span>
                    </div>
                    <div className="text-muted">
                      <i className="pi pi-calendar ihub-me-1"></i>
                      {task.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Nigerian States Display */}
      {selectedDataType === "states" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Nigerian States</h2>
          <div className="ihub-card ihub-p-4">
            <div className="ihub-mb-3">
              <span className="ihub-badge ihub-badge-info ihub-me-2">
                Total States: {statesNigeria.length}
              </span>
              <span className="ihub-badge ihub-badge-light">
                Including FCT (Federal Capital Territory)
              </span>
            </div>
            <div className="ihub-row">
              {filteredData.map((state: string, index) => (
                <div key={index} className="ihub-col-md-3 ihub-col-sm-4 ihub-col-6 ihub-mb-2">
                  <div className="ihub-p-2 ihub-border ihub-rounded">
                    <i className="pi pi-map-marker ihub-me-2 text-primary"></i>
                    {state}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comments Display */}
      {selectedDataType === "comments" && (
        <section className="ihub-mb-5">
          <h2 className="ihub-fs-lg ihub-mb-3">Comments System</h2>
          <div className="ihub-card ihub-p-4">
            {filteredData.map((comment: any, index) => (
              <div key={comment.id || index} className="ihub-mb-4 ihub-pb-3 ihub-border-bottom">
                <div className="ihub-d-flex">
                  <div className="ihub-me-3">
                    <div className="ihub-avatar ihub-bg-primary ihub-text-white ihub-rounded-circle ihub-d-flex ihub-align-items-center ihub-justify-content-center" style={{ width: "40px", height: "40px" }}>
                      {comment.user.first_name.charAt(0)}{comment.user.last_name.charAt(0)}
                    </div>
                  </div>
                  <div className="ihub-flex-grow-1">
                    <div className="ihub-d-flex ihub-align-items-center ihub-mb-2">
                      <h6 className="ihub-mb-0 ihub-me-2">
                        {comment.user.first_name} {comment.user.last_name}
                      </h6>
                      {comment.user.verified && (
                        <span className="ihub-badge ihub-badge-success ihub-me-2">
                          <i className="pi pi-check-circle"></i> Verified
                        </span>
                      )}
                      {comment.user.is_staff && (
                        <span className="ihub-badge ihub-badge-warning">
                          Staff
                        </span>
                      )}
                    </div>
                    <p className="ihub-mb-2">{comment.content}</p>
                    <div className="text-muted">
                      <small>
                        <i className="pi pi-user ihub-me-1"></i>
                        @{comment.user.username}
                        <span className="ihub-ms-2">
                          <i className="pi pi-clock ihub-me-1"></i>
                          {comment.timestamp.toLocaleString()}
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Implementation Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Implementation Examples</h2>
        
        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-code ihub-me-2"></i>
              User Account Management
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// User account management component
import { accounts } from '@instincthub/react-ui/lib';

const UserManagement = () => {
  const [users, setUsers] = useState(accounts);
  const [filter, setFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return user.type.toLowerCase() === filter.toLowerCase();
  });

  const getUserTypeColor = (type: string) => {
    return type === 'Staff' ? 'badge-primary' : 'badge-success';
  };

  return (
    <div>
      <div className="filter-buttons mb-3">
        <button onClick={() => setFilter('all')}>All Users</button>
        <button onClick={() => setFilter('staff')}>Staff Only</button>
        <button onClick={() => setFilter('learner')}>Learners Only</button>
      </div>
      
      <div className="user-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <span className={\`badge \${getUserTypeColor(user.type)}\`}>
              {user.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-list ihub-me-2"></i>
              Course Feature Comparison
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Course feature comparison component
import { AllCoursesdataList, DataList } from '@instincthub/react-ui/lib';

const FeatureComparison = () => {
  const plans = [
    { name: 'Course Plan', features: AllCoursesdataList },
    { name: 'Access Plan', features: DataList }
  ];

  const FeatureIcon = ({ included }: { included: boolean }) => (
    <i className={\`pi \${included ? 'pi-check text-success' : 'pi-times text-danger'}\`} />
  );

  return (
    <div className="feature-comparison">
      <div className="row">
        {plans.map((plan, planIndex) => (
          <div key={planIndex} className="col-md-6">
            <div className="plan-card">
              <h3>{plan.name}</h3>
              <ul className="feature-list">
                {plan.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <FeatureIcon included={feature.icon === 'done'} />
                    <span className="ms-2">{feature.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};`}
            </pre>
          </div>
        </div>

        <div className="ihub-mb-4">
          <div className="ihub-card ihub-p-4">
            <h5>
              <i className="pi pi-map ihub-me-2"></i>
              Location Selector for Nigeria
            </h5>
            <pre className="ihub-bg-light ihub-p-3" style={{ fontSize: "11px" }}>
{`// Nigerian states selector component
import { statesNigeria } from '@instincthub/react-ui/lib';

const LocationSelector = () => {
  const [selectedState, setSelectedState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = statesNigeria.filter(state =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="location-selector">
      <div className="search-input mb-3">
        <input
          type="text"
          placeholder="Search states..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
        />
      </div>
      
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="form-select"
      >
        <option value="">Select a state</option>
        {filteredStates.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      
      {selectedState && (
        <div className="selected-info mt-3">
          <p>Selected: <strong>{selectedState}</strong></p>
          <small className="text-muted">
            {selectedState === 'FCT' ? 'Federal Capital Territory' : 'State'}
          </small>
        </div>
      )}
    </div>
  );
};`}
            </pre>
          </div>
        </div>
      </section>

      {/* Data Statistics */}
      <section className="ihub-mb-5">
        <h2 className="ihub-fs-lg ihub-mb-3">Data Statistics</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-3 ihub-mb-3">
            <div className="ihub-card ihub-p-3 ihub-text-center">
              <h4 className="text-primary">{accounts.length}</h4>
              <small>User Accounts</small>
            </div>
          </div>
          <div className="ihub-col-md-3 ihub-mb-3">
            <div className="ihub-card ihub-p-3 ihub-text-center">
              <h4 className="text-success">{pending.length}</h4>
              <small>Pending Tasks</small>
            </div>
          </div>
          <div className="ihub-col-md-3 ihub-mb-3">
            <div className="ihub-card ihub-p-3 ihub-text-center">
              <h4 className="text-warning">{statesNigeria.length}</h4>
              <small>Nigerian States</small>
            </div>
          </div>
          <div className="ihub-col-md-3 ihub-mb-3">
            <div className="ihub-card ihub-p-3 ihub-text-center">
              <h4 className="text-info">{dataList.length}</h4>
              <small>Archived Courses</small>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationalDataDashboard;
```

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import {
  accounts,
  AllCoursesdataList,
  DataList,
  dataList,
  projectStartHistory,
  pending,
  statesNigeria,
  COMMENTS_BY
} from '@instincthub/react-ui/lib';
```

## 🚀 Basic Usage

```tsx
import React from 'react';
import { accounts, statesNigeria, pending } from '@instincthub/react-ui/lib';

function DataDisplays() {
  return (
    <div>
      {/* Display user accounts */}
      <h2>Users ({accounts.length})</h2>
      {accounts.map(user => (
        <div key={user.id}>
          {user.name} - {user.type}
        </div>
      ))}

      {/* Display Nigerian states */}
      <h2>Nigerian States</h2>
      <select>
        {statesNigeria.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      {/* Display pending tasks */}
      <h2>Pending Tasks</h2>
      {pending.map((task, index) => (
        <div key={index}>{task.title} - {task.stack}</div>
      ))}
    </div>
  );
}
```

## 🔧 Data Collections Reference

### User & Account Data

#### `accounts: Account[]`
Sample user accounts with different roles.

```tsx
interface Account {
  id: number;
  name: string;
  type: "Learner" | "Staff";
}
```

#### `COMMENTS_BY: Comment[]`
Sample comment structure with user information.

```tsx
interface Comment {
  id: number;
  content: string;
  timestamp: Date;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    verified: boolean;
    is_staff: boolean;
  };
  replies: any[];
}
```

### Course & Feature Data

#### `AllCoursesdataList: FeatureItem[]`
Course plan features with availability indicators.

#### `DataList: FeatureItem[]`
Access plan features with availability indicators.

```tsx
interface FeatureItem {
  icon: "done" | "close";
  title: string;
}
```

#### `dataList: CourseArchive[]`
Archived course information.

```tsx
interface CourseArchive {
  title: string;
  archiveDate: string;
}
```

### Project & Task Data

#### `projectStartHistory: ProjectEvent[]`
Timeline of project events.

```tsx
interface ProjectEvent {
  title: string;
  date: string;
  time: string;
}
```

#### `pending: PendingTask[]`
Pending development tasks with technology stacks.

```tsx
interface PendingTask {
  title: string;
  stack: string;
  date: string;
}
```

### Geographic Data

#### `statesNigeria: string[]`
Complete list of Nigerian states including FCT.

**Contents:**
- 36 Nigerian states
- Federal Capital Territory (FCT)
- Alphabetically ordered
- Standard state names

## 💡 Use Cases

### Educational Platforms
- **User Management**: Role-based user displays and filtering
- **Course Features**: Feature comparison between subscription tiers
- **Progress Tracking**: Project timeline and task management
- **Regional Support**: Location-based services for Nigeria

### Development & Testing
- **Mock Data**: Realistic data for component testing
- **Prototyping**: Quick setup for educational platform prototypes
- **UI Testing**: Consistent data for UI component development
- **Demo Applications**: Sample data for demo purposes

### Nigerian Applications
- **Location Services**: State selection for Nigerian users
- **Regional Features**: State-specific functionality
- **Address Forms**: Nigerian address input forms
- **Geographic Filtering**: Location-based content filtering

## 🎯 Advanced Features

### Data Filtering & Search
- **Multi-field Search**: Search across all object properties
- **Type-based Filtering**: Filter by user roles, feature availability
- **Geographic Filtering**: State-based filtering for Nigerian data
- **Date-based Filtering**: Project timeline filtering

### Regional Support
- **Nigerian States**: Complete state listing with FCT
- **Educational System**: Nigerian educational context
- **Local Projects**: Technology stacks relevant to Nigerian market
- **Cultural Context**: Names and scenarios relevant to Nigerian users

### Feature Management
- **Tier Comparison**: Different feature sets for subscription tiers
- **Availability Status**: Clear indication of included/excluded features
- **Progressive Enhancement**: Features that build upon each other
- **Access Control**: Different features for different user types

## 🔒 Development Guidelines

### Data Consistency
- **Type Safety**: All collections have proper TypeScript interfaces
- **Naming Conventions**: Consistent naming across all data structures
- **Update Procedures**: Guidelines for maintaining and updating sample data
- **Version Control**: Track changes to maintain backward compatibility

### Usage Best Practices
- **Immutability**: Treat imported data as read-only
- **Local Copies**: Create local copies for manipulation
- **Performance**: Consider data size for large applications
- **Testing**: Use for unit tests and integration testing

## 🌍 Localization Considerations

### Nigerian Context
- **State Names**: Official Nigerian state names
- **Educational Levels**: Relevant to Nigerian education system
- **Project Types**: Technology stacks popular in Nigerian market
- **User Names**: Diverse Nigerian names for inclusivity

### Extensibility
- **Additional States**: Framework for adding more geographic data
- **International Support**: Structure allows for other countries
- **Multi-language**: Data structure supports localization
- **Cultural Adaptation**: Easy adaptation for different regions

## ⚠️ Important Notes

- **Development Only**: Sample data not suitable for production
- **Regular Updates**: Data should be refreshed periodically
- **Privacy**: No real user data included
- **Compliance**: Follows data protection best practices
- **Performance**: Consider data size in large-scale applications

## 🔗 Related Utilities

- [countryNigeria](./json-countryNigeria.md) - Detailed Nigeria country information
- [countryObjects](./json-countryObjects.md) - Global country database
- [educationLevels](./json-educationLevels.md) - Educational qualification levels
- [utils](./utils.md) - Additional constants and configuration data