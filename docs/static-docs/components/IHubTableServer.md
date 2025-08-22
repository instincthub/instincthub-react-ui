# IHubTableServer

**Category:** UI | **Type:** component

Server-side table component with built-in pagination, sorting, filtering, external refresh control, and dynamic search parameters

**File Location:** `src/components/ui/tables/IHubTableServer.tsx`

## 🏷️ Tags

`ui`, `table`, `data`, `server`, `pagination`, `sorting`, `filtering`, `refresh`, `forwardRef`, `searchParams`, `dynamic`

```tsx
"use client";
import React, { useState, useRef } from "react";
import { Badge, Action, IHubTableServer, IHubTableServerRef } from "@instincthub/react-ui";
import { DataResponseType, TableColumnType } from "@instincthub/react-ui/types";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

/**
 * Example component demonstrating various ways to use the IHubTableServer component
 */
const IHubTableServerExamples = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  
  // Create ref for table control
  const tableRef = useRef<IHubTableServerRef>(null);

  // Example: Refresh table from parent component
  const handleExternalRefresh = () => {
    tableRef.current?.refresh();
  };

  // Sample data for different examples
  const studentsData = [
    {
      id: "STU-001",
      name: "John Smith",
      email: "john.smith@email.com",
      department: "Computer Science",
      level: "400",
      gpa: 3.85,
      status: "active",
      enrollment_date: "2020-09-15",
    },
    {
      id: "STU-002",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      department: "Engineering",
      level: "300",
      gpa: 3.92,
      status: "active",
      enrollment_date: "2021-01-10",
    },
    {
      id: "STU-003",
      name: "Michael Brown",
      email: "michael.brown@email.com",
      department: "Business",
      level: "200",
      gpa: 3.67,
      status: "inactive",
      enrollment_date: "2022-08-22",
    },
    // ... more students
  ];

  const invoicesData = [
    {
      id: "INV-001",
      student: "John Smith",
      amount: 1250.00,
      category: "Tuition Fees",
      date: "2024-01-15",
      dueDate: "2024-02-15",
      status: "paid",
    },
    {
      id: "INV-002",
      student: "Sarah Johnson",
      amount: 450.00,
      category: "ICT Fees",
      date: "2024-01-10",
      dueDate: "2024-02-10",
      status: "pending",
    },
    {
      id: "INV-003",
      student: "Michael Brown",
      amount: 800.00,
      category: "Lab Fees",
      date: "2024-01-08",
      dueDate: "2024-02-08",
      status: "overdue",
    },
    // ... more invoices
  ];

  const coursesData = [
    {
      id: "CS101",
      title: "Introduction to Computer Science",
      instructor: "Dr. Alice Wilson",
      credits: 3,
      enrollment: 45,
      capacity: 50,
      semester: "Fall 2024",
      status: "active",
    },
    {
      id: "ENG201",
      title: "Advanced Engineering Mathematics",
      instructor: "Prof. Bob Anderson",
      credits: 4,
      enrollment: 32,
      capacity: 40,
      semester: "Fall 2024",
      status: "active",
    },
    // ... more courses
  ];

  // Column definitions for students table
  const studentsColumns: TableColumnType<any>[] = [
    {
      header: "Student ID",
      accessor: "id",
      sortable: true,
      width: "120px",
    },
    {
      header: "Name",
      accessor: "name",
      sortable: true,
      tooltip: true,
    },
    {
      header: "Email",
      accessor: "email",
      sortable: true,
    },
    {
      header: "Department",
      accessor: "department",
      sortable: true,
      width: "150px",
    },
    {
      header: "Level",
      accessor: "level",
      sortable: true,
      width: "80px",
    },
    {
      header: "GPA",
      accessor: "gpa",
      sortable: true,
      cell: (row: any) => row.gpa.toFixed(2),
      width: "80px",
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      cell: (row: any) => (
        <Badge
          variant={row.status === "active" ? "success" : "warning"}
          shape="pill"
        >
          {row.status}
        </Badge>
      ),
      width: "100px",
    },
    {
      header: "Actions",
      cell: (row: any) => (
        <Action
          label="Actions"
          dropdown
          variant="outline"
          dropdownItems={[
            {
              label: "View Profile",
              iconBefore: <RemoveRedEyeOutlinedIcon className="mui-icon" />,
              onClick: () => console.log("View student:", row),
            },
            {
              label: "Edit Student",
              iconBefore: <EditOutlinedIcon className="mui-icon" />,
              onClick: () => console.log("Edit student:", row),
            },
            {
              label: "Download Report",
              iconBefore: <FileDownloadOutlinedIcon className="mui-icon" />,
              onClick: () => console.log("Download report:", row),
            },
          ]}
        />
      ),
      width: "120px",
    },
  ];

  // Column definitions for invoices table
  const invoicesColumns: TableColumnType<any>[] = [
    {
      header: "Invoice ID",
      accessor: "id",
      sortable: true,
      width: "120px",
    },
    {
      header: "Student",
      accessor: "student",
      sortable: true,
    },
    {
      header: "Amount",
      accessor: "amount",
      sortable: true,
      cell: (row: any) => `$${row.amount.toFixed(2)}`,
      width: "100px",
    },
    {
      header: "Category",
      accessor: "category",
      sortable: true,
      width: "120px",
    },
    {
      header: "Date",
      accessor: "date",
      sortable: true,
      cell: (row: any) => new Date(row.date).toLocaleDateString(),
      width: "100px",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      sortable: true,
      cell: (row: any) => new Date(row.dueDate).toLocaleDateString(),
      width: "100px",
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      cell: (row: any) => (
        <Badge
          variant={
            row.status === "paid"
              ? "success"
              : row.status === "pending"
              ? "warning"
              : "danger"
          }
          shape="pill"
        >
          {row.status}
        </Badge>
      ),
      width: "100px",
    },
    {
      header: "Actions",
      cell: (row: any) => (
        <div className="ihub-item-actions">
          <span
            onClick={(e) => {
              e.stopPropagation();
              console.log("View invoice:", row);
            }}
            className="ihub-action-link"
          >
            View
          </span>
          <div className="ihub-action-divider"></div>
          <span
            onClick={(e) => {
              e.stopPropagation();
              console.log("Send reminder:", row);
            }}
            className="ihub-action-link"
          >
            Send
          </span>
        </div>
      ),
      width: "100px",
    },
  ];

  // Column definitions for courses table
  const coursesColumns: TableColumnType<any>[] = [
    {
      header: "Course ID",
      accessor: "id",
      sortable: true,
      width: "100px",
    },
    {
      header: "Title",
      accessor: "title",
      sortable: true,
      tooltip: true,
    },
    {
      header: "Instructor",
      accessor: "instructor",
      sortable: true,
      width: "150px",
    },
    {
      header: "Credits",
      accessor: "credits",
      sortable: true,
      width: "80px",
    },
    {
      header: "Enrollment",
      accessor: "enrollment",
      sortable: true,
      cell: (row: any) => `${row.enrollment}/${row.capacity}`,
      width: "100px",
    },
    {
      header: "Progress",
      accessor: "enrollment",
      cell: (row: any) => {
        const percentage = (row.enrollment / row.capacity) * 100;
        return (
          <div className="ihub-progress-bar">
            <div 
              className="ihub-progress-fill" 
              style={{ 
                width: `${percentage}%`,
                backgroundColor: percentage > 90 ? '#dc3545' : percentage > 70 ? '#ffc107' : '#28a745'
              }}
            ></div>
            <span className="ihub-progress-text">{Math.round(percentage)}%</span>
          </div>
        );
      },
      width: "120px",
    },
  ];

  // Event handlers
  const handleRowClick = (row: any) => {
    console.log("Row clicked:", row);
  };

  const handleFetchError = (error: any) => {
    console.error("Fetch error:", error);
  };

  // Expanded row renderer
  const renderExpandedStudentRow = (row: any) => (
    <div className="ihub-row-detail-content">
      <div className="ihub-detail-item">
        <div className="ihub-detail-label">Enrollment Date</div>
        <div className="ihub-detail-value">{new Date(row.enrollment_date).toLocaleDateString()}</div>
      </div>
      <div className="ihub-detail-item">
        <div className="ihub-detail-label">Full Email</div>
        <div className="ihub-detail-value">{row.email}</div>
      </div>
      <div className="ihub-detail-item">
        <div className="ihub-detail-label">Academic Performance</div>
        <div className="ihub-detail-value">GPA: {row.gpa} ({row.gpa >= 3.5 ? 'Excellent' : row.gpa >= 3.0 ? 'Good' : 'Needs Improvement'})</div>
      </div>
    </div>
  );

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>IHubTableServer Examples</h1>

      {/* Basic Table Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Basic Server Table</h2>
        <p>Simple table with default features</p>
        
        <IHubTableServer
          columns={studentsColumns}
          defaultData={studentsData}
          endpointPath="" // Using default data for demo
          title="Students List"
          showSearch={true}
          searchPlaceholder="Search students..."
          enableSorting={true}
          showRowNumbers={true}
          keyExtractor={(row) => row.id}
        />
      </div>

      {/* Advanced Table with All Features */}
      <div className="ihub-card ihub-mb-4">
        <h2>Advanced Table with All Features</h2>
        <p>Table with search, sorting, export, pagination, and row expansion</p>
        
        <IHubTableServer
          columns={studentsColumns}
          defaultData={studentsData}
          endpointPath=""
          title="Advanced Students Management"
          showSearch={true}
          searchPlaceholder="Search by name, email, or department..."
          enableSorting={true}
          enableExport={true}
          exportOptions={{
            csv: true,
            excel: true,
            fileName: "students-export",
          }}
          rowsPerPageOptions={[5, 10, 25, 50]}
          defaultRowsPerPage={5}
          onRowClick={handleRowClick}
          expandable={true}
          renderExpandedRow={renderExpandedStudentRow}
          keyExtractor={(row) => row.id}
          stickyHeader={true}
          maxHeight="400px"
          showRowNumbers={true}
          rowNumberStartFrom={1}
          onFetchError={handleFetchError}
        />
      </div>

      {/* Table with External Refresh Control */}
      <div className="ihub-card ihub-mb-4">
        <h2>Table with External Refresh Control</h2>
        <p>Control table refresh from parent component using ref</p>
        
        <div style={{ marginBottom: "1rem" }}>
          <button 
            onClick={handleExternalRefresh}
            className="ihub-btn ihub-btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <RefreshOutlinedIcon /> Refresh Table from Parent
          </button>
        </div>
        
        <IHubTableServer
          ref={tableRef}
          columns={invoicesColumns}
          defaultData={invoicesData}
          endpointPath=""
          title="Refreshable Invoices Table"
          showSearch={true}
          searchPlaceholder="Search invoices..."
          enableSorting={true}
          keyExtractor={(row) => row.id}
        />
      </div>

      {/* Table with Dynamic Search Parameters */}
      <div className="ihub-card ihub-mb-4">
        <h2>Table with Dynamic Search Parameters</h2>
        <p>Control table filtering using external searchParams that trigger automatic refetch</p>
        
        <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
          <label>
            Department:
            <select 
              onChange={(e) => setSearchParams({ ...searchParams, department: e.target.value })}
              className="ihub-select"
            >
              <option value="">All Departments</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
            </select>
          </label>
          
          <label>
            Status:
            <select 
              onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
              className="ihub-select"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          
          <label>
            Min GPA:
            <input 
              type="number" 
              step="0.1" 
              min="0" 
              max="4"
              onChange={(e) => setSearchParams({ ...searchParams, min_gpa: e.target.value })}
              className="ihub-input"
              placeholder="0.0"
            />
          </label>
        </div>
        
        <IHubTableServer
          columns={studentsColumns}
          defaultData={studentsData}
          endpointPath="/api/students" // Would include searchParams in API request
          searchParams={searchParams}
          title="Filtered Students Table"
          showSearch={true}
          searchPlaceholder="Search students..."
          enableSorting={true}
          keyExtractor={(row) => row.id}
        />
      </div>

      {/* Invoices Table Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Invoices Management Table</h2>
        <p>Financial data with status badges and custom actions</p>
        
        <IHubTableServer
          columns={invoicesColumns}
          defaultData={invoicesData}
          endpointPath=""
          initialParams={{
            sort: "date",
            direction: "desc",
          }}
          title="Student Invoices"
          showSearch={true}
          searchPlaceholder="Search by invoice ID or student name..."
          enableSorting={true}
          enableExport={true}
          exportOptions={{
            csv: true,
            fileName: "invoices-export",
          }}
          keyExtractor={(row) => row.id}
          emptyStateMessage="No invoices found"
        />
      </div>

      {/* Row Numbering Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Table with Row Numbering</h2>
        <p>Shows row numbers that work correctly with pagination</p>
        
        <IHubTableServer
          columns={invoicesColumns}
          defaultData={invoicesData}
          endpointPath=""
          title="Numbered Invoices List"
          showSearch={true}
          searchPlaceholder="Search invoices..."
          enableSorting={true}
          showRowNumbers={true}
          rowNumberStartFrom={100} // Custom starting number
          rowsPerPageOptions={[3, 5, 10]}
          defaultRowsPerPage={3}
          keyExtractor={(row) => row.id}
        />
      </div>

      {/* Compact Table Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Compact Courses Table</h2>
        <p>Smaller table with custom progress bars</p>
        
        <IHubTableServer
          columns={coursesColumns}
          defaultData={coursesData}
          endpointPath=""
          title="Course Enrollment Status"
          showSearch={false}
          enableSorting={true}
          defaultRowsPerPage={10}
          keyExtractor={(row) => row.id}
          hideHeaderOnMobile={true}
        />
      </div>

      {/* API Integration Example */}
      <div className="ihub-card ihub-mb-4">
        <h2>Real API Integration Example</h2>
        <p>Example configuration for real API endpoints</p>
        
        <div className="ihub-code-block">
          <pre>
{`// Example with real API endpoint
const tableRef = useRef<IHubTableServerRef>(null);

// Refresh table data programmatically
const handleRefreshData = () => {
  tableRef.current?.refresh();
};

<IHubTableServer
  ref={tableRef}
  token={process.env.NEXT_PUBLIC_API_TOKEN}
  columns={studentsColumns}
  endpointPath="/api/students"
  initialParams={{
    sort: "name",
    direction: "asc"
  }}
  searchParams={{
    department: "Computer Science",
    status: "active",
    min_gpa: "3.0"
  }}
  title="Students from API"
  showSearch={true}
  searchPlaceholder="Search students..."
  enableSorting={true}
  enableExport={true}
  exportOptions={{
    csv: true,
    excel: true,
    fileName: "students-export"
  }}
  onRowClick={(row) => router.push("/student/")}
  expandable={true}
  renderExpandedRow={(row) => <StudentDetails student={row} />}
  keyExtractor={(row) => row.id}
  stickyHeader={true}
  maxHeight="600px"
  showRowNumbers={true}
  rowNumberStartFrom={1}
  dataAdapter={(apiResponse) => ({
    data: apiResponse.results,
    pagination: {
      totalCount: apiResponse.count,
      currentPage: apiResponse.page,
      perPage: apiResponse.per_page,
      totalPages: apiResponse.total_pages
    }
  })}
  onFetchError={(error) => {
    console.error("API Error:", error);
    showNotification("Failed to load data", "error");
  }}
/>`}
          </pre>
        </div>
      </div>

      {/* Performance Tips */}
      <div className="ihub-card">
        <h2>Performance & Best Practices</h2>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Performance Tips:</h4>
            <ul>
              <li>Use <code>keyExtractor</code> for efficient row rendering</li>
              <li>Implement server-side pagination for large datasets</li>
              <li>Use <code>debounce</code> for search (default: 1000ms)</li>
              <li>Enable <code>stickyHeader</code> for better UX</li>
              <li>Set appropriate <code>maxHeight</code> for scrolling</li>
            </ul>
          </div>
          
          <div className="ihub-col-md-6">
            <h4>Best Practices:</h4>
            <ul>
              <li>Always provide meaningful column headers</li>
              <li>Use <code>tooltip</code> for long text content</li>
              <li>Implement proper error handling with <code>onFetchError</code></li>
              <li>Use appropriate column widths</li>
              <li>Provide clear empty state messages</li>
              <li>Use <code>ref</code> for external refresh control</li>
              <li>Use <code>searchParams</code> for dynamic filtering</li>
              <li>Combine <code>initialParams</code> and <code>searchParams</code> appropriately</li>
              <li>Enable <code>showRowNumbers</code> for better data identification</li>
              <li>Use <code>rowNumberStartFrom</code> for custom numbering sequences</li>
            </ul>
          </div>
        </div>
        
        <div className="ihub-mt-4">
          <h4>Dynamic Search Parameters:</h4>
          <p>Use the <code>searchParams</code> prop to control table filtering from parent components. Changes to searchParams automatically trigger a data refetch:</p>
          <div className="ihub-code-block">
            <pre>
{`import { useState } from 'react';
import { IHubTableServer } from '@instincthub/react-ui';

function FilterableTable() {
  const [searchParams, setSearchParams] = useState({
    department: 'Computer Science',
    status: 'active'
  });

  const handleFilterChange = (newFilters) => {
    // Table will automatically refetch with new parameters
    setSearchParams({ ...searchParams, ...newFilters });
  };

  return (
    <>
      <div className="filters">
        <select onChange={(e) => handleFilterChange({ department: e.target.value })}>
          <option value="">All Departments</option>
          <option value="CS">Computer Science</option>
          <option value="ENG">Engineering</option>
        </select>
      </div>
      
      <IHubTableServer
        columns={columns}
        endpointPath="/api/students"
        searchParams={searchParams} // API request includes these params
        // ... other props
      />
    </>
  );
}`}
            </pre>
          </div>
        </div>

        <div className="ihub-mt-4">
          <h4>External Refresh Control:</h4>
          <p>The component exposes a <code>refresh</code> method through ref that allows parent components to trigger a data refresh:</p>
          <div className="ihub-code-block">
            <pre>
{`import { useRef } from 'react';
import { IHubTableServer, IHubTableServerRef } from '@instincthub/react-ui';

function ParentComponent() {
  const tableRef = useRef<IHubTableServerRef>(null);

  const handleRefresh = () => {
    // Trigger table refresh
    tableRef.current?.refresh();
  };

  return (
    <>
      <button onClick={handleRefresh}>Refresh Data</button>
      <IHubTableServer
        ref={tableRef}
        columns={columns}
        endpointPath="/api/data"
        // ... other props
      />
    </>
  );
}`}
            </pre>
          </div>
        </div>
        
        <div className="ihub-mt-4">
          <h4>API Request Format with searchParams:</h4>
          <p>When <code>searchParams</code> are provided, they are included in the API request URL:</p>
          <div className="ihub-code-block">
            <pre>
{`// Example API request URL with searchParams
GET /api/students?limit=10&offset=0&ordering=name&search=john&department=Computer%20Science&status=active&min_gpa=3.0

// searchParams = { department: "Computer Science", status: "active", min_gpa: "3.0" }
// Combined with internal params: limit, offset, ordering, search`}
            </pre>
          </div>
        </div>

        <div className="ihub-mt-4">
          <h4>Row Numbering Feature:</h4>
          <p>Enable row numbers to help users identify specific records. Row numbers automatically adjust for pagination:</p>
          <div className="ihub-code-block">
            <pre>
{`<IHubTableServer
  columns={columns}
  endpointPath="/api/data"
  showRowNumbers={true}          // Enable row numbering
  rowNumberStartFrom={1}         // Start counting from 1 (default)
  defaultRowsPerPage={10}
  // ... other props
/>

// For pagination:
// Page 1: Shows rows 1, 2, 3, 4, 5...
// Page 2: Shows rows 11, 12, 13, 14, 15... (if 10 rows per page)
// Page 3: Shows rows 21, 22, 23, 24, 25...

// Custom starting number:
// rowNumberStartFrom={100} would show: 100, 101, 102, etc.`}
            </pre>
          </div>
        </div>

        <div className="ihub-mt-4">
          <h4>API Response Format:</h4>
          <div className="ihub-code-block">
            <pre>
{`{
  "results": [...],  // Array of data items
  "count": 150,      // Total count of items
  "next": "...",     // Next page URL
  "previous": "...", // Previous page URL
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IHubTableServerExamples;
```

## 🔗 Related Components

- [IHubTable](./IHubTable.md) - Client-side table component
- [Badge](./Badge.md) - Status badge component
- [Action](./Action.md) - Action dropdown component
- [Pagination](./Pagination.md) - Pagination component
- [ContentViewer](./ContentViewer.md) - Content viewer component

