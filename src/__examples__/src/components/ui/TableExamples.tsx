"use client";

import React, { useState, useCallback } from "react";
import { IHubTable } from "../../../../index";
import { TableColumnType } from "../../../../types";
import Link from "next/link";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

// Example user interface
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
  lastLogin: string;
  department: string;
  location: string;
  phone: string;
}

const EnhancedTableExample: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Memoized keyExtractor to prevent infinite re-renders
  const keyExtractor = useCallback((row: User) => row.id, []);

  // Sample data
  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      status: "active",
      createdAt: "2023-01-15",
      lastLogin: "2023-04-10",
      department: "IT",
      location: "New York",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      status: "active",
      createdAt: "2023-02-20",
      lastLogin: "2023-04-12",
      department: "Marketing",
      location: "San Francisco",
      phone: "+1 (555) 987-6543",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@example.com",
      role: "Viewer",
      status: "inactive",
      createdAt: "2023-03-05",
      lastLogin: "2023-03-28",
      department: "Finance",
      location: "Chicago",
      phone: "+1 (555) 456-7890",
    },
    {
      id: 4,
      name: "Emily Williams",
      email: "emily.w@example.com",
      role: "Editor",
      status: "pending",
      createdAt: "2023-04-10",
      lastLogin: "2023-04-10",
      department: "HR",
      location: "Boston",
      phone: "+1 (555) 234-5678",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael.b@example.com",
      role: "Admin",
      status: "active",
      createdAt: "2023-05-22",
      lastLogin: "2023-04-11",
      department: "IT",
      location: "Seattle",
      phone: "+1 (555) 876-5432",
    },
  ];

  // Define columns for the table
  const columns: TableColumnType<User>[] = [
    {
      header: "ID",
      accessor: "id",
      width: "80px",
      sortable: true,
    },
    {
      header: "Name",
      accessor: "name",
      width: "300px",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <div className="ihub-cell-with-icon">
          <div className="ihub-cell-icon">
            <PersonOutlinedIcon />
          </div>
          <Link href={`/users/${row.id}`} className="ihub-user-link">
            {row.name}
          </Link>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      sortable: true,
      filterable: true,
      tooltip: true,
    },
    {
      header: "Role",
      accessor: "role",
      sortable: true,
      filterable: true,
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      filterable: true,
      cell: (row) => (
        <span className={`ihub-status-badge ihub-status-${row.status}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      ),
    },
    {
      header: "Created At",
      accessor: "createdAt",
      width: "150px",
      sortable: true,
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="ihub-item-actions">
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(row);
            }}
          >
            View
          </p>
          <div className="ihub-action-divider"></div>
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
          >
            Edit
          </p>
          <div className="ihub-action-divider"></div>
          <p
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
          >
            Delete
          </p>
        </div>
      ),
    },
  ];

  // Event handlers
  const handleViewDetails = (user: User) => {
    console.log("View user details:", user);
    // Implement view details logic
  };

  const handleEdit = (user: User) => {
    console.log("Edit user:", user);
    // Implement edit logic
  };

  const handleDelete = (user: User) => {
    console.log("Delete user:", user);
    // Implement delete logic
  };

  const handleRowClick = (user: User) => {
    console.log("Row clicked:", user);
    // Navigate to user details page or open modal
  };

  // Handle add new user
  const handleAddUser = () => {
    console.log("Add new user");
    // Open add user modal or navigate to add user page
  };

  // Handle refresh data
  const handleRefresh = async () => {
    console.log("Refreshing data...");
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    console.log("Data refreshed");
  };

  // Handle selection change
  const handleSelectionChange = (users: User[]) => {
    setSelectedUsers(users);
    console.log("Selected users:", users);
  };

  // Render expanded row content
  const renderExpandedRow = (user: User) => {
    return (
      <div>
        <div className="ihub-row-detail-title">User Details</div>
        <div className="ihub-row-detail-content">
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Last Login</div>
            <div className="ihub-detail-value">{user.lastLogin}</div>
          </div>
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Department</div>
            <div className="ihub-detail-value">{user.department}</div>
          </div>
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Location</div>
            <div className="ihub-detail-value">{user.location}</div>
          </div>
          <div className="ihub-detail-item">
            <div className="ihub-detail-label">Phone</div>
            <div className="ihub-detail-value">{user.phone}</div>
          </div>
        </div>
      </div>
    );
  };

  // Bulk actions for selected users
  const renderBulkActions = () => {
    if (selectedUsers.length === 0) return null;

    return (
      <div className="ihub-bulk-actions">
        <button
          className="ihub-outlined-btn"
          onClick={() => console.log("Bulk edit")}
        >
          Edit Selected
        </button>
        <button
          className="ihub-danger-btn"
          onClick={() => console.log("Bulk delete")}
        >
          Delete Selected
        </button>
      </div>
    );
  };

  return (
    <div className="">
      <h1 className="ihub-mb-4 ihub-fs-lg">User Management</h1>

      {/* Render bulk actions if users are selected */}
      {renderBulkActions()}

      {/* Enhanced table with all features */}
      <IHubTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        title="Users"
        showSearch={true}
        pagination={true}
        rowsPerPageOptions={[5, 10, 25]}
        defaultRowsPerPage={5}
        onRowClick={handleRowClick}
        keyExtractor={keyExtractor}
        hideHeaderOnMobile={true}
        stickyHeader={true}
        maxHeight="600px"
        emptyStateMessage="No users found. Add a new user to get started."
        actions={
          <button className="ihub-important-btn" onClick={handleAddUser}>
            <PersonOutlinedIcon />
            Add User
          </button>
        }
        selectable={true}
        onSelectionChange={handleSelectionChange}
        expandable={true}
        renderExpandedRow={renderExpandedRow}
        exportOptions={{
          csv: true,
          excel: true,
          pdf: true,
          fileName: "users-list",
        }}
        refreshable={true}
        onRefresh={handleRefresh}
      />

      <Link
        rel="noreferrer noopener"
        target="_blank"
        href="https://github.com/instincthub/instincthub-react-ui/blob/main/src/__examples__/src/components/ui/TableExamples.tsx"
      >
        <button className="ihub-outlined-btn">View codebase</button>
      </Link>
    </div>
  );
};

export default EnhancedTableExample;
