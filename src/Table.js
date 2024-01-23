
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTable, deleteTable, editTableName, addCubicle, editCubicleName, deleteCubicle } from './store/slice';
import './App.css';

const TableList = () => {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.office.tables);

  const [newTableName, setNewTableName] = useState('');
  const [editTableId, setEditTableId] = useState(null);

  const [newCubicleName, setNewCubicleName] = useState('');
  const [editCubicleId, setEditCubicleId] = useState(null);

//   const [cubicleNames, setCubicleNames] = useState({});

  const handleAddTable = () => {
    if (newTableName.trim() !== '') {
      dispatch(addTable(newTableName));
      setNewTableName('');
    }
  };

  const handleEditTable = (tableId, currentName) => {
    setEditTableId(tableId);
    setNewTableName(currentName);
  };

  const handleSaveEditTable = () => {
    if (newTableName.trim() !== '') {
      dispatch(editTableName({ tableId: editTableId, newName: newTableName }));
      setEditTableId(null);
      setNewTableName('');  
    }
  };

  const handleCancelEditTable = () => {
    setEditTableId(null);
    setNewTableName('');
  };

  const handleDeleteTable = (tableId) => {
    dispatch(deleteTable(tableId));
  };

  const handleAddCubicle = (tableId) => {
    if (newCubicleName.trim() !== '') {
      dispatch(addCubicle({ tableId, cubicleName: newCubicleName }));
      setNewCubicleName('');
    }
  };

  const handleEditCubicle = (cubicleId, currentName) => {
    setEditCubicleId(cubicleId);
    setNewCubicleName(currentName);
  };

  const handleSaveEditCubicle = (tableId) => {
    if (newCubicleName.trim() !== '') {
      dispatch(editCubicleName({ tableId, cubicleId: editCubicleId, newName: newCubicleName }));
      setEditCubicleId(null);
      setNewCubicleName('');
    }
  };

  const handleCancelEditCubicle = () => {
    setEditCubicleId(null);
    setNewCubicleName('');
  };


  const handleDeleteCubicle = (tableId, cubicleId) => {
    dispatch(deleteCubicle({ tableId, cubicleId }));
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Table List</h2>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <input
          type="text"
          placeholder="Enter table name"
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
        />

        <input
            type="text"
            placeholder="Enter cubicle name"
            value={newCubicleName}
            onChange={(e) => setNewCubicleName(e.target.value)}
        />
        <button className='btn btn-primary my-3' onClick={handleAddTable} >Add Table</button>
      </div>


      <h3 className='text-center'>Table List</h3>
      <table className="table text-center">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
      <th scope="col">Add Cubicle</th>
    </tr>
  </thead>
  <tbody>
    {
    tables.map((table) => (
        <tr>
      <th scope="row">{table.id}</th>
      <td>{table.name}</td>
      <td>{table.id === editTableId ? (
                
                <div className='table-button'>
                  <button className='btn btn-success mx-3' onClick={handleSaveEditTable}>Save</button>
                  <button className='btn btn-danger' onClick={handleCancelEditTable}>Cancel</button>
                  </div>
                
              ) : (
                
                <div className='table-button'>
                  <button className='btn btn-info mx-3' onClick={() => handleEditTable(table.id, table.name)}>Edit</button>
                  <button className='btn btn-dark' onClick={() => handleDeleteTable(table.id)}>Delete</button>
                  </div>
                
              )}</td>
    <td><button className='btn btn-warning' onClick={() => handleAddCubicle(table.id)}>Add Cubicle</button></td>
    </tr>
    ))}
<br/>
  </tbody>
</table>


{tables.map((table) => (
    
    <div>
    <h4 className='text-center'>Cubicle List of {table.name}</h4>
    <table class="table text-center">
  <thead>
    <tr>
      <th scope="col">Sr. No.</th>
      <th scope="col">Cubicle Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {table.cubicles?.map((cubical)=>(
        <tr>
            <th>{cubical.id}</th>
            <td>{cubical.name}</td>
            <td>{cubical.id === editCubicleId ? (
                        <>
                          <button className='btn btn-success' onClick={() => handleSaveEditCubicle(table.id)}>Save</button>
                          <button className='btn btn-danger' onClick={handleCancelEditCubicle}>Cancel</button>
                        </>
                      ) : (
                        <>
                          <button className='btn btn-secondary mx-3' onClick={() => handleEditCubicle(cubical.id, cubical.name)}>Edit</button>
                          <button className='btn btn-danger' onClick={() => handleDeleteCubicle(table.id, cubical.id)}>Delete</button>
                        </>
                      )}</td>
        </tr>
  ))}
  </tbody>
</table>
    </div>
   
))}
     
    </div>
  );
};

export default TableList;

