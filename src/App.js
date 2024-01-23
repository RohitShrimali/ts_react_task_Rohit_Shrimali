// src/components/Table.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTable } from './store/slice';

const App = () => {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.office.tables);
  const [tableName, setTableName] = useState('');

  const handleAddTable = () => {
    if (tableName.trim() !== '') {
      dispatch(addTable(tableName));
      setTableName('');
    }
  };

  return (
    <div>
      <h2>Table List</h2>
      <ul>
        {tables.map((table) => (
          <li key={table.id}>{table.name}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="Enter table name"
        />
        <button onClick={handleAddTable}>Add Table</button>
      </div>
    </div>
  );
};

export default App;
