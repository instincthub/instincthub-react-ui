# Example for fetching data on the client component.

```jsx
"use client";

import { useEffect, useState } from "react";
import { TableColumnType } from "@instincthub/react-ui/types";
import { IHubTable, Card } from "@instincthub/react-ui";
import { PaymentOutlined } from "@mui/icons-material";
import { reqOptions, API_HOST_URL, fetchAPI } from "@instincthub/react-ui/lib";

interface Student {
  id: string;
  first_name: string;
  last_name: string;
}

interface Transaction {
  reference: string;
  student: Student;
  amount: number;
  category: string;
  date: string;
  status: "paid" | "pending" | "overdue";
}

interface TransactionResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Transaction[];
}

export function RecentTransactions({
  handle,
  token,
}: {
  handle: string;
  token: string | null;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const requestOptions = reqOptions("GET", null, token, null, handle);
      const api = `${API_HOST_URL}sis/${handle}/finance/recent-transactions/?limit=10`;

      fetchAPI(
        (data: TransactionResponse) => {
          setTransactions(data.results);
        },
        api,
        requestOptions,
        true,
        setLoading,
        null,
        setError
      );
    };

    fetchTransactions();
  }, [handle, token]);

  console.log("transactions: ", transactions, loading);

  // Define columns for the table
  const columns: TableColumnType<Transaction>[] = [
    {
      header: "Reference",
      accessor: "reference",
      width: "80px",
      sortable: true,
    },
    {
      header: "Student",
      accessor: "student",
      sortable: true,
      filterable: false,
      tooltip: true,
    },
    {
      header: "Category",
      accessor: "category",
      sortable: true,
      filterable: false,
    },
    {
      header: "Amount",
      accessor: "amount",
      width: "150px",
      sortable: true,
      filterable: false,
    },
    {
      header: "Status",
      accessor: "status",
      width: "100px",
      sortable: true,
      filterable: false,
    },
  ];

  if (error) {
    return (
      <Card>
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      {loading ? (
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-gray-500">Loading transactions...</div>
        </div>
      ) : (
        <IHubTable
          columns={columns}
          data={transactions}
          isLoading={loading}
          title="Recent Transactions"
          showSearch={false}
          pagination={true}
          rowsPerPageOptions={[5, 10, 25]}
          defaultRowsPerPage={5}
          hideHeaderOnMobile={true}
          stickyHeader={true}
          maxHeight="600px"
          emptyStateMessage="No transactions found."
          actions={
            <button className="ihub-important-btn">
              <PaymentOutlined
                style={{ color: "#fff" }}
                className="ihub-mr-1"
              />
              New Transaction
            </button>
          }
          selectable={false}
          expandable={true}
          exportOptions={{
            csv: true,
            fileName: "transactions",
          }}
          refreshable={true}
        />
      )}
    </Card>
  );
}
```
