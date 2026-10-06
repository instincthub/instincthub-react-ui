"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { Badge, Action, IHubTableServer, IHubTableServerRef } from "../../../../index";
import { IHubTableDefaultDataType, TableColumnType } from "../../../../types";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

// Typed interfaces for table data
interface ProgramCourseData extends IHubTableDefaultDataType {
  id: string | number;
  course: {
    id: string;
    code: string;
    title: string;
    level: string;
    semester: string;
    credits: number;
    choice: string;
  };
  enroll_count: number;
  program: string;
  last_action: string;
}

interface InvoiceData extends IHubTableDefaultDataType {
  id: string;
  student: string;
  amount: number;
  category: string;
  date: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}


// Deterministic dummy invoices (no Math.random, so SSR and client agree).
// 187 rows = 19 pages at 10 per page: enough to exercise the gap jumps,
// the "Go to page" input and reaching the last page by number.
const STUDENTS = [
  "John Smith",
  "Sarah Johnson",
  "Adaeze Okafor",
  "Tunde Bakare",
  "Maria Garcia",
  "Chen Wei",
  "Fatima Al-Sayed",
  "Liam O'Connor",
  "Priya Nair",
  "Kwame Mensah",
  "Yuki Tanaka",
  "Elena Petrova",
];
const CATEGORIES = [
  "Tuition Fees",
  "ICT Fees",
  "Library Fees",
  "Hostel Fees",
  "Exam Fees",
];
const STATUSES: InvoiceData["status"][] = ["paid", "pending", "overdue"];

const isoDate = (date: Date) => date.toISOString().slice(0, 10);

const mockData: InvoiceData[] = Array.from({ length: 187 }, (_, i) => {
  const issued = new Date(Date.UTC(2023, i % 12, (i % 27) + 1));
  const due = new Date(issued);
  due.setUTCDate(due.getUTCDate() + 30);
  return {
    id: `INV-${String(i + 1).padStart(3, "0")}`,
    student: STUDENTS[i % STUDENTS.length],
    amount: 150 + ((i * 37) % 1400),
    category: CATEGORIES[i % CATEGORIES.length],
    date: isoDate(issued),
    dueDate: isoDate(due),
    status: STATUSES[(i * 7) % STATUSES.length],
  };
});

/** Fits on one page: the pager's navigation should not render for this table. */
const singlePageData: InvoiceData[] = mockData.slice(0, 6);

// Example page component
export default function ProgramCoursesPage() {
  // Create ref for table control
  const tableRef = useRef<IHubTableServerRef>(null);

  // Example: Refresh table from parent component
  const handleExternalRefresh = () => {
    tableRef.current?.refresh();
  };

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
      // UI-only column: keep the buttons out of CSV/Excel/PDF exports
      exportable: false,
      cell: (row: ProgramCourseData) => (
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
      cell: (row: InvoiceData) => `$${row.amount}`,
      width: "100px",
    },
    {
      header: "Date",
      accessor: "date",
      sortable: true,
      cell: (row: InvoiceData) => new Date(row.date).toLocaleDateString(),
      width: "120px",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      sortable: true,
      cell: (row: InvoiceData) => new Date(row.dueDate).toLocaleDateString(),
      width: "120px",
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      cell: (row: InvoiceData) => (
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
      // UI-only column: keep the dropdown out of CSV/Excel/PDF exports
      exportable: false,
      cell: (row: InvoiceData) => (
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

  // Action handlers
  const handleRowClick = (row: ProgramCourseData) => {
    console.log("Row clicked:", row);
  };

  const handleViewCourse = (course: ProgramCourseData) => {
    console.log("View course:", course);
  };

  const handleEditCourse = (course: ProgramCourseData) => {
    console.log("Edit course:", course);
  };

  // Render expanded row content
  const renderExpandedRow = (row: ProgramCourseData) => (
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
      <h2>Valid Endpoint with External Refresh Control</h2>
      
      {/* Example button to trigger refresh from parent */}
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
        token={process.env.NEXT_PUBLIC_TOKEN}
        columns={columns as TableColumnType<ProgramCourseData>[]}
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
          pdf: true,
          fileName: "program-courses-export",
          maxRows: 5000,
        }}
        onRowClick={handleRowClick}
        expandable={true}
        renderExpandedRow={renderExpandedRow}
        keyExtractor={(row) => row.id}
        stickyHeader={true}
        maxHeight="calc(100vh - 340px)"
        minHeight="360px" // floor so short screens still show a usable table
        persistKey="program-courses" // remember page/sort/search across visits in this tab
      />

      <h2>Dummy Data</h2>
      <IHubTableServer
        columns={columns2 as TableColumnType<InvoiceData>[]}
        defaultData={mockData} // For demo, in production use endpoint
        // endpointPath="finance/payments" // Use in production
        // token={process.env.NEXT_PUBLIC_TOKEN} // Use in production
        initialParams={{
          sort: "date",
          direction: "desc",
        }}
        title="Student Payments"
        endpointPath=""
        persistState={false}
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

      <h2>Single Page (pager navigation hides)</h2>
      <IHubTableServer
        columns={columns2 as TableColumnType<InvoiceData>[]}
        defaultData={singlePageData}
        endpointPath=""
        title="Recent Payments"
        showSearch={false}
        enableSorting={true}
        persistState={false}
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
