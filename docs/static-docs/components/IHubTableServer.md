# IHubTableServer

**Category:** UI | **Type:** component

InstinctHub server table component

## 📁 File Location

`src/components/ui/tables/IHubTableServer.tsx`

## 🏷️ Tags

`ui`, `table`, `data`

## 📦 Installation & Import

```bash
npm install @instincthub/react-ui
```

```tsx
import { IHubTableServer } from '@instincthub/react-ui';
```

## 🚀 Basic Usage

```tsx
"use client";
import Link from "next/link";
import { Badge, Action, IHubTableServer } from "@instincthub/react-ui";
import { DataResponseType, TableColumnType } from "@instincthub/react-ui/types";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

// Example page component
export default function ProgramCoursesPage() {
  // Define table columns
  const columns = [
    {
      header: "Code",
      accessor: "course.code", // Type assertion needed for nested properties
      sortable: true,
      width: "200px",
    },
    {
      header: "Title",
      accessor: "course.title",
      sortable: true,
      tooltip: true,
    },
    {
      header: "Level",
      accessor: "course.level",
      sortable: true,
      width: "80px",
    },
    {
      header: "Semester",
      accessor: "course.semester",
      sortable: true,
      width: "100px",
    },
    {
      header: "Credits",
      accessor: "course.credits",
      sortable: true,
      width: "80px",
    },
    {
      header: "Enrollment",
      accessor: "enroll_count",
      sortable: true,
      width: "100px",
    },
    {
      header: "Actions",
      cell: (row: DataResponseType) => (
        <div className="ihub-item-actions">
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleViewCourse(row);
            }}
          >
            View
          </p>
          <div className="ihub-action-divider"></div>
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleEditCourse(row);
            }}
          >
            Edit
          </p>
        </div>
      ),
      width: "120px",
    },
  ];

  const columns2 = [
    {
      header: "Invoice",
      accessor: "id",
      sortable: true,
      width: "100px",
    },
    {
      header: "Student",
      accessor: "student",
      sortable: true,
    },
    {
      header: "Category",
      accessor: "category",
      sortable: true,
    },
    {
      header: "Amount",
      accessor: "amount",
      sortable: true,
      cell: (row: any) => `$${row.amount}`,
      width: "100px",
    },
    {
      header: "Date",
      accessor: "date",
      sortable: true,
      cell: (row: any) => new Date(row.date).toLocaleDateString(),
      width: "120px",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      sortable: true,
      cell: (row: any) => new Date(row.dueDate).toLocaleDateString(),
      width: "120px",
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
        <Action
          label="Actions"
          dropdown
          variant="outline"
          dropdownItems={[
            {
              label: "View Details",
              iconBefore: <FileDownloadOutlinedIcon className="mui-icon" />,
              onClick: () => console.log(row),
            },
            {
              label: "Download Invoice",
              iconBefore: <RemoveRedEyeOutlinedIcon className="mui-icon" />,
              onClick: () => console.log(row),
            },
            {
              label: "Send Reminder",
              iconBefore: <SendOutlinedIcon className="mui-icon" />,
              onClick: () => console.log(row),
            },
          ]}
        />
      ),
      width: "100px",
    },
  ];

  // Mock data for demo purposes
  // In a real implementation, this would be fetched from an API
  const mockData = [
    {
      id: "INV-001",
      student: "John Smith",
      amount: 1250,
      category: "Tuition Fees",
      date: "2023-04-12",
      dueDate: "2023-05-12",
      status: "paid",
    },
    {
      id: "INV-002",
      student: "Sarah Johnson",
      amount: 450,
      category: "ICT Fees",
      date: "2023-04-10",
      dueDate: "2023-05-10",
      status: "paid",
    },
    // ... other payment data
  ];

  // Action handlers
  const handleRowClick = (row: DataResponseType) => {
    console.log("Row clicked:", row);
  };

  const handleViewCourse = (course: DataResponseType) => {
    console.log("View course:", course);
  };

  const handleEditCourse = (course: DataResponseType) => {
    console.log("Edit course:", course);
  };

  // Render expanded row content
  const renderExpandedRow = (row: DataResponseType) => (
    <div className="ihub-row-detail-content">
      <div className="ihub-detail-item">
        <div className="ihub-detail-label">Course ID</div>
        <div className="ihub-detail-value">{row.course.id}</div>
      </div>
      <div className="ihub-detail-item">
        <div className="ihub-detail-label">Choice Type</div>
        <div className="ihub-detail-value">{row.course.choice}</div>
      </div>
      <div className="ihub-detail-item">
        <div className="ihub-detail-label">Last Updated</div>
        <div className="ihub-detail-value">
          {new Date(row.last_action).toLocaleString()}
        </div>
      </div>
      <div className="ihub-detail-item">
        <div className="ihub-detail-label">Program ID</div>
        <div className="ihub-detail-value">{row.program}</div>
      </div>
    </div>
  );

  return (
    <div className="program-courses-page">
      <h2>Valid Endpoint</h2>
      <IHubTableServer
        token={process.env.NEXT_PUBLIC_TOKEN}
        columns={columns as TableColumnType<DataResponseType>[]}
        endpointPath={"sis/hust/admins/program-course-list/"}
        initialParams={{
          sort: "course.title",
          direction: "asc",
        }}
        title="Program Courses"
        showSearch={true}
        searchPlaceholder="Search by title or code..."
        enableSorting={true}
        enableExport={true}
        exportOptions={{
          csv: true,
          excel: true,
          fileName: "program-courses-export",
        }}
        onRowClick={handleRowClick}
        expandable={true}
        renderExpandedRow={renderExpandedRow}
        keyExtractor={(row) => row.id}
        stickyHeader={true}
        maxHeight="600px"
      />

      <h2>Dummy Data</h2>
      <IHubTableServer
        columns={columns2 as TableColumnType<DataResponseType>[]}
        defaultData={mockData} // For demo, in production use endpoint
        // endpointPath="finance/payments" // Use in production
        // token={process.env.NEXT_PUBLIC_TOKEN} // Use in production
        initialParams={{
          sort: "date",
          direction: "desc",
        }}
        title="Student Payments"
        endpointPath=""
        showSearch={true}
        searchPlaceholder="Search by invoice or student..."
        enableSorting={true}
        enableExport={true}
        exportOptions={{
          csv: true,
          excel: true,
          fileName: "student-payments-export",
        }}
        // onRowClick={handleRowClick}
        // keyExtractor={(row) => row.id}
        stickyHeader={true}
        maxHeight="500px"
      />

      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/TableServerExamples.tsx"
      >
        <button className="ihub-outlined-btn">View codebase</button>
      </Link>
    </div>
  );
}

```

## 🔗 Related Components

- [CustomTextEditor](./CustomTextEditor.md) - Custom text editor component
- [ContentViewer](./ContentViewer.md) - Content viewer component
- [ContentViewOrEdit](./ContentViewOrEdit.md) - Content view or edit component
- [CodeDisplay](./CodeDisplay.md) - Code display component
- [IHubTable](./IHubTable.md) - InstinctHub table component

