import React, { useState, useMemo } from 'react';

interface TableItem {
  id: string | number;
  title: string;
  // Uncomment as needed
  // column2: string;
  // column3: string;
  // column4: string;
  // column5: string;
  // column6: string;
}

interface TablesProps {
  data: TableItem[];
}

const Tables: React.FC<TablesProps> = ({ data }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return (
    <div className="ihub-table-container">
      <div className="ihub-table-filter">
        <input 
          type="text" 
          placeholder="Filter by title..." 
          value={filter} 
          onChange={handleFilterChange}
          className="ihub-table-filter-input"
        />
      </div>
      <table className="ihub-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Column 1</th>
            {/* <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
            <th>Column 6</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={item.id}>
              <td>{index+1}</td>
              <td>{item.title}</td>
              {/* <td>{item.column2}</td>
              <td>{item.column3}</td>
              <td>{item.column4}</td>
              <td>{item.column5}</td>
              <td>{item.column6}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;