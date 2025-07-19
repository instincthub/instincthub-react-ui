# IHubTableServer

**Category:** UI | **Type:** component

Server-side table component with built-in pagination, sorting, and filtering

**File Location:** `src/components/ui/tables/IHubTableServer.tsx`

## 🏷️ Tags

`ui`, `table`, `data`, `server`, `pagination`, `sorting`, `filtering`

```tsx
"use client";
import React, { useState } from "react";
import { Badge, Action, IHubTableServer } from "@instincthub/react-ui";
import { DataResponseType, TableColumnType } from "@instincthub/react-ui/types";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

/**
 * Example component demonstrating various ways to use the IHubTableServer component
 */
const IHubTableServerExamples = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

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
          onFetchError={handleFetchError}
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
<IHubTableServer
  token={process.env.NEXT_PUBLIC_API_TOKEN}
  columns={studentsColumns}
  endpointPath="/api/students"
  initialParams={{
    sort: "name",
    direction: "asc",
    department: "Computer Science"
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
            </ul>
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

