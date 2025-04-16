"use client";
import Link from "next/link";
import { IHubTableServer } from "../../../../index";
import { DataResponseType } from "../../../../types";

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
      <IHubTableServer
        token={process.env.NEXT_PUBLIC_TOKEN}
        columns={columns}
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
