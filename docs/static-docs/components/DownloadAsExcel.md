# DownloadAsExcel

**Category:** Forms | **Type:** component

Excel download functionality component for exporting data to Excel files

## 🏷️ Tags

`forms`, `excel`, `download`, `export`, `data`

```tsx
"use client";
import React, { useState } from "react";
import {
  DownloadAsExcel,
  IHubTable,
  Card,
  Badge,
} from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";
import {
  DocumentArrowDownIcon,
  TableCellsIcon,
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

/**
 * Example component demonstrating various ways to use the DownloadAsExcel
 */
const DownloadAsExcelExamples = () => {
  const [downloadStatus, setDownloadStatus] = useState<{[key: string]: number}>({});

  // Sample authentication token (in real app, get from auth context)
  const authToken = "your-auth-token-here";

  // Sample data for demonstration
  const sampleStudents = [
    { id: 1, name: "John Doe", email: "john@example.com", course: "React Development", progress: 85 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", course: "Vue.js Mastery", progress: 92 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", course: "Angular Fundamentals", progress: 78 },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", course: "Node.js Backend", progress: 95 },
  ];

  const sampleSales = [
    { id: 1, product: "Pro Plan", amount: 99.99, date: "2024-01-15", customer: "TechCorp Inc" },
    { id: 2, product: "Enterprise Plan", amount: 299.99, date: "2024-01-14", customer: "StartupXYZ" },
    { id: 3, product: "Basic Plan", amount: 29.99, date: "2024-01-13", customer: "Freelancer Co" },
  ];

  const handleDownloadComplete = (fileName: string) => {
    openToast(`Successfully downloaded: ${fileName}`, 200);
  };

  const handleDownloadError = (error: string) => {
    openToast(`Download failed: ${error}`, 400);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>DownloadAsExcel Examples</h1>

      {/* Basic Excel Download */}
      <section className="ihub-mb-5">
        <h2>Basic Excel Download</h2>
        <p>Simple Excel download with default button styling</p>
        
        <Card className="ihub-p-4" style={{ maxWidth: "500px" }}>
          <div className="ihub-d-flex ihub-align-items-center ihub-gap-3 ihub-mb-3">
            <DocumentArrowDownIcon className="w-8 h-8 ihub-text-primary" />
            <div>
              <h4>Export User Data</h4>
              <p className="ihub-text-muted ihub-mb-0">Download all user records in Excel format</p>
            </div>
          </div>
          
          <DownloadAsExcel
            urlPath="/api/v1/users"
            token={authToken}
            fileName="user_data"
            labels="Download Users"
          />
        </Card>
      </section>

      {/* Plain Button Style */}
      <section className="ihub-mb-5">
        <h2>Plain Button Style</h2>
        <p>Excel download with plain text button styling</p>
        
        <div className="ihub-d-flex ihub-gap-4 ihub-flex-wrap">
          <Card className="ihub-p-4" style={{ width: "250px" }}>
            <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-3">
              <TableCellsIcon className="w-6 h-6 ihub-text-success" />
              <h5>Student Reports</h5>
            </div>
            <p className="ihub-text-sm ihub-text-muted ihub-mb-3">
              Export student progress and enrollment data
            </p>
            <DownloadAsExcel
              urlPath="/api/v1/students"
              token={authToken}
              fileName="student_reports"
              labels="Export Students"
              plainBtn={true}
            />
          </Card>

          <Card className="ihub-p-4" style={{ width: "250px" }}>
            <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-3">
              <ChartBarIcon className="w-6 h-6 ihub-text-warning" />
              <h5>Sales Analytics</h5>
            </div>
            <p className="ihub-text-sm ihub-text-muted ihub-mb-3">
              Download sales data and analytics reports
            </p>
            <DownloadAsExcel
              urlPath="/api/v1/sales"
              token={authToken}
              fileName="sales_analytics"
              labels="Export Sales Data"
              plainBtn={true}
            />
          </Card>

          <Card className="ihub-p-4" style={{ width: "250px" }}>
            <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-3">
              <UsersIcon className="w-6 h-6 ihub-text-info" />
              <h5>Customer Database</h5>
            </div>
            <p className="ihub-text-sm ihub-text-muted ihub-mb-3">
              Export complete customer information
            </p>
            <DownloadAsExcel
              urlPath="/api/v1/customers"
              token={authToken}
              fileName="customer_database"
              labels="Export Customers"
              plainBtn={true}
            />
          </Card>
        </div>
      </section>

      {/* Data Table with Export */}
      <section className="ihub-mb-5">
        <h2>Data Table with Export Function</h2>
        <p>Excel download integrated with data tables</p>
        
        <Card className="ihub-p-4">
          <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-4">
            <div>
              <h4>Student Enrollment Data</h4>
              <p className="ihub-text-muted ihub-mb-0">Manage and export student information</p>
            </div>
            <div className="ihub-d-flex ihub-gap-2">
              <Badge text={`${sampleStudents.length} Records`} variant="info" />
              <DownloadAsExcel
                urlPath="/api/v1/students/export"
                token={authToken}
                fileName="student_enrollment_data"
                labels="Export to Excel"
                plainBtn={true}
              />
            </div>
          </div>
          
          <div className="ihub-table-responsive">
            <table className="ihub-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {sampleStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>
                      <div className="ihub-d-flex ihub-align-items-center ihub-gap-2">
                        <div className="ihub-progress" style={{ width: "80px", height: "8px" }}>
                          <div 
                            className="ihub-progress-bar" 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="ihub-text-sm">{student.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Multiple Export Options */}
      <section className="ihub-mb-5">
        <h2>Multiple Export Options</h2>
        <p>Different export formats and data sets</p>
        
        <div className="ihub-row ihub-gap-4">
          <div className="ihub-col-md-6">
            <Card className="ihub-p-4 ihub-h-100">
              <div className="ihub-d-flex ihub-align-items-center ihub-gap-3 ihub-mb-4">
                <DocumentTextIcon className="w-8 h-8 ihub-text-primary" />
                <div>
                  <h4>Financial Reports</h4>
                  <p className="ihub-text-muted ihub-mb-0">Export detailed financial data</p>
                </div>
              </div>
              
              <div className="ihub-d-flex ihub-flex-column ihub-gap-3">
                <DownloadAsExcel
                  urlPath="/api/v1/reports/monthly"
                  token={authToken}
                  fileName="monthly_financial_report"
                  labels="Monthly Report"
                />
                
                <DownloadAsExcel
                  urlPath="/api/v1/reports/quarterly"
                  token={authToken}
                  fileName="quarterly_financial_report"
                  labels="Quarterly Report"
                />
                
                <DownloadAsExcel
                  urlPath="/api/v1/reports/yearly"
                  token={authToken}
                  fileName="yearly_financial_report"
                  labels="Yearly Report"
                />
              </div>
            </Card>
          </div>
          
          <div className="ihub-col-md-6">
            <Card className="ihub-p-4 ihub-h-100">
              <div className="ihub-d-flex ihub-align-items-center ihub-gap-3 ihub-mb-4">
                <ChartBarIcon className="w-8 h-8 ihub-text-success" />
                <div>
                  <h4>Analytics Data</h4>
                  <p className="ihub-text-muted ihub-mb-0">Export analytics and metrics</p>
                </div>
              </div>
              
              <div className="ihub-d-flex ihub-flex-column ihub-gap-3">
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <span>User Analytics</span>
                  <DownloadAsExcel
                    urlPath="/api/v1/analytics/users"
                    token={authToken}
                    fileName="user_analytics"
                    labels="Export"
                    plainBtn={true}
                  />
                </div>
                
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <span>Performance Metrics</span>
                  <DownloadAsExcel
                    urlPath="/api/v1/analytics/performance"
                    token={authToken}
                    fileName="performance_metrics"
                    labels="Export"
                    plainBtn={true}
                  />
                </div>
                
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <span>Traffic Reports</span>
                  <DownloadAsExcel
                    urlPath="/api/v1/analytics/traffic"
                    token={authToken}
                    fileName="traffic_reports"
                    labels="Export"
                    plainBtn={true}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Usage with Custom Styling */}
      <section className="ihub-mb-5">
        <h2>Advanced Usage Examples</h2>
        <p>Custom styled download components with different use cases</p>
        
        <div className="ihub-d-flex ihub-flex-column ihub-gap-4">
          {/* Admin Dashboard Export */}
          <Card className="ihub-p-4 ihub-border-primary">
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-start ihub-mb-3">
              <div>
                <h4 className="ihub-text-primary">Admin Dashboard Export</h4>
                <p className="ihub-text-muted">
                  Comprehensive system data export for administrators
                </p>
              </div>
              <Badge text="Admin Only" variant="primary" />
            </div>
            
            <div className="ihub-row ihub-gap-3">
              <div className="ihub-col-md-4">
                <div className="ihub-text-center ihub-p-3 ihub-border ihub-rounded">
                  <UsersIcon className="w-12 h-12 ihub-text-primary ihub-mx-auto ihub-mb-2" />
                  <h6>All Users</h6>
                  <p className="ihub-text-sm ihub-text-muted ihub-mb-3">Complete user database</p>
                  <DownloadAsExcel
                    urlPath="/api/v1/admin/users/all"
                    token={authToken}
                    fileName="complete_user_database"
                    labels="Export All Users"
                    plainBtn={true}
                  />
                </div>
              </div>
              
              <div className="ihub-col-md-4">
                <div className="ihub-text-center ihub-p-3 ihub-border ihub-rounded">
                  <DocumentTextIcon className="w-12 h-12 ihub-text-success ihub-mx-auto ihub-mb-2" />
                  <h6>System Logs</h6>
                  <p className="ihub-text-sm ihub-text-muted ihub-mb-3">Application activity logs</p>
                  <DownloadAsExcel
                    urlPath="/api/v1/admin/logs"
                    token={authToken}
                    fileName="system_activity_logs"
                    labels="Export Logs"
                    plainBtn={true}
                  />
                </div>
              </div>
              
              <div className="ihub-col-md-4">
                <div className="ihub-text-center ihub-p-3 ihub-border ihub-rounded">
                  <ChartBarIcon className="w-12 h-12 ihub-text-warning ihub-mx-auto ihub-mb-2" />
                  <h6>Full Analytics</h6>
                  <p className="ihub-text-sm ihub-text-muted ihub-mb-3">Complete analytics data</p>
                  <DownloadAsExcel
                    urlPath="/api/v1/admin/analytics/complete"
                    token={authToken}
                    fileName="complete_analytics_report"
                    labels="Export Analytics"
                    plainBtn={true}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Sales Dashboard */}
          <Card className="ihub-p-4 ihub-border-success">
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center ihub-mb-4">
              <div>
                <h4 className="ihub-text-success">Sales Dashboard</h4>
                <p className="ihub-text-muted ihub-mb-0">Export sales data and customer information</p>
              </div>
              <div className="ihub-d-flex ihub-gap-2">
                <Badge text="Real-time" variant="success" />
                <Badge text="Updated Daily" variant="info" />
              </div>
            </div>
            
            <div className="ihub-table-responsive ihub-mb-4">
              <table className="ihub-table ihub-table-sm">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Customer</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleSales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.product}</td>
                      <td>${sale.amount}</td>
                      <td>{sale.date}</td>
                      <td>{sale.customer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="ihub-d-flex ihub-justify-content-end ihub-gap-2">
              <DownloadAsExcel
                urlPath="/api/v1/sales/detailed"
                token={authToken}
                fileName="detailed_sales_report"
                labels="Detailed Report"
              />
              <DownloadAsExcel
                urlPath="/api/v1/sales/summary"
                token={authToken}
                fileName="sales_summary"
                labels="Summary Report"
                plainBtn={true}
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Error Handling Example */}
      <section className="ihub-mb-5">
        <h2>Error Handling & Status</h2>
        <p>Examples showing how the component handles errors and loading states</p>
        
        <div className="ihub-row ihub-gap-4">
          <div className="ihub-col-md-6">
            <Card className="ihub-p-4">
              <h5>Valid Endpoint</h5>
              <p className="ihub-text-muted">This will successfully download data</p>
              <DownloadAsExcel
                urlPath="/api/v1/valid-endpoint"
                token={authToken}
                fileName="valid_data"
                labels="Download Valid Data"
              />
            </Card>
          </div>
          
          <div className="ihub-col-md-6">
            <Card className="ihub-p-4">
              <h5>Invalid Endpoint</h5>
              <p className="ihub-text-muted">This will show error handling</p>
              <DownloadAsExcel
                urlPath="/api/v1/non-existent-endpoint"
                token={authToken}
                fileName="error_test"
                labels="Test Error Handling"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="ihub-mb-5">
        <h2>Best Practices</h2>
        <Card className="ihub-p-4">
          <h5>Implementation Guidelines</h5>
          <ul className="ihub-list-unstyled">
            <li className="ihub-mb-2">
              <strong>Authentication:</strong> Always provide a valid authentication token
            </li>
            <li className="ihub-mb-2">
              <strong>File Naming:</strong> Use descriptive file names that include dates or identifiers
            </li>
            <li className="ihub-mb-2">
              <strong>Error Handling:</strong> The component automatically handles API errors and shows toast messages
            </li>
            <li className="ihub-mb-2">
              <strong>Data Flattening:</strong> Complex nested objects are automatically flattened for Excel export
            </li>
            <li className="ihub-mb-2">
              <strong>User Confirmation:</strong> Users are prompted to confirm before downloading
            </li>
            <li className="ihub-mb-2">
              <strong>Loading States:</strong> The component shows loading states during data fetching
            </li>
          </ul>
        </Card>
      </section>
    </div>
  );
};

export default DownloadAsExcelExamples;
```

## 🔗 Related Components

- [SubmitButton](./SubmitButton.md) - Submit button component
- [IHubTable](./IHubTable.md) - Data table component
- [ActionDropdown](./ActionDropdown.md) - Action dropdown component
- [FilterArray](./FilterArray.md) - Array filtering component
- [Tables](./Tables.md) - Table components collection