import React, { useState } from 'react';

const Tables = ({ data }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <table>
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
