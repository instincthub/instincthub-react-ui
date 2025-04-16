"use client";
import { useState, useCallback } from "react";
import { IHubTableServerPropsType, ServerPaginationInfoType, FetchParamsType, ApiResponseType } from "../../../../types";
import { IHubTableServer } from "../../../../index";
import { reqOptions } from "../../../../components/lib/index";

// Define your data type
interface Course {
  id: string;
  title: string;
  code: string;
  credits: string;
  level: string;
  semester: string;
  choice: string;
}

interface ProgramCourse {
  id: string;
  course: Course;
  enroll_count: number;
  order: number;
  last_action: string;
  timestamp: string;
  owner: number;
  program: string;
  lecturer: string | null;
}

// Example page component
export default function ProgramCoursesPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch data from your API
  const fetchProgramCourses = useCallback(async (params: FetchParamsType): Promise<ApiResponseType<ProgramCourse>> => {
    setIsLoading(true);
    try {
      // Prepare API parameters
      const apiParams = new URLSearchParams({
        limit: params.limit.toString(),
        offset: ((params.page - 1) * params.limit).toString(),
      });
      
      // Add search parameter if provided
      if (params.search) {
        apiParams.append("search", params.search);
      }
      
      // Add sorting parameter if provided
      if (params.sort) {
        // Convert from sort & direction to API's ordering format
        const prefix = params.direction === "desc" ? "-" : "";
        apiParams.append("ordering", `${prefix}${params.sort}`);
      }
      
      // Make API request
      const response = await fetch(`/api/v1/sis/hust/admins/program-course-list/?${apiParams.toString()}`);
      const result = await response.json();
      
      // Transform API response to match component's expected format
      return {
        data: result.results,
        pagination: {
          totalCount: result.count,
          currentPage: Math.floor(parseInt(new URLSearchParams(result.next).get("offset") || "0") / params.limit) + 1,
          perPage: params.limit,
          totalPages: Math.ceil(result.count / params.limit),
        },
        links: {
          next: result.next,
          previous: result.previous,
        }
      };
    } catch (error) {
      console.error("Error fetching program courses:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Define table columns
  const columns = [
    {
      header: "Code",
      accessor: "course.code" as keyof ProgramCourse, // Type assertion needed for nested properties
      sortable: true,
      width: "120px",
    },
    {
      header: "Title",
      accessor: "course.title" as keyof ProgramCourse,
      sortable: true,
      tooltip: true,
    },
    {
      header: "Level",
      accessor: "course.level" as keyof ProgramCourse,
      sortable: true,
      width: "80px",
    },
    {
      header: "Semester",
      accessor: "course.semester" as keyof ProgramCourse,
      sortable: true,
      width: "100px",
    },
    {
      header: "Credits",
      accessor: "course.credits" as keyof ProgramCourse,
      sortable: true,
      width: "80px",
    },
    {
      header: "Enrollment",
      accessor: "enroll_count" as keyof ProgramCourse,
      sortable: true,
      width: "100px",
    },
    {
      header: "Actions",
      cell: (row: ProgramCourse) => (
        <div className="ihub-item-actions">
          <p onClick={(e) => {
            e.stopPropagation();
            handleViewCourse(row);
          }}>View</p>
          <div className="ihub-action-divider"></div>
          <p onClick={(e) => {
            e.stopPropagation();
            handleEditCourse(row);
          }}>Edit</p>
        </div>
      ),
      width: "120px",
    },
  ];

  // Action handlers
  const handleRowClick = (row: ProgramCourse) => {
    console.log("Row clicked:", row);
  };

  const handleViewCourse = (course: ProgramCourse) => {
    console.log("View course:", course);
  };

  const handleEditCourse = (course: ProgramCourse) => {
    console.log("Edit course:", course);
  };

  // Render expanded row content
  const renderExpandedRow = (row: ProgramCourse) => (
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
    <div className="program-courses-page ihub-container">
      <IHubTableServer
        columns={columns}
        fetchData={fetchProgramCourses}
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
    </div>
  );
}