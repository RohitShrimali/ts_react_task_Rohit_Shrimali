import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTable,
  deleteTable,
  editTableName,
  addCubicle,
  editCubicleName,
  deleteCubicle,
} from "./store/slice";
import "./App.css";
import { Trash3, PencilSquare } from 'react-bootstrap-icons';

const TableList = () => {
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.office.tables);

  const [newTableName, setNewTableName] = useState("");
  const [editTableId, setEditTableId] = useState(null);

  const [newCubicleName, setNewCubicleName] = useState("");
  const [editCubicleId, setEditCubicleId] = useState(null);

  const [cubicleNames, setCubicleNames] = useState({});

  const handleAddTable = () => {
    if (newTableName.trim() !== "") {
      dispatch(addTable(newTableName));
      setNewTableName("");
    }
  };

  const handleEditTable = (tableId, currentName) => {
    setEditTableId(tableId);
    setNewTableName(currentName);
  };

  const handleSaveEditTable = () => {
    if (newTableName.trim() !== "") {
      dispatch(editTableName({ tableId: editTableId, newName: newTableName }));
      setEditTableId(null);
      setNewTableName("");
    }
  };

  const handleCancelEditTable = () => {
    setEditTableId(null);
    setNewTableName("");
  };

  const handleDeleteTable = (tableId) => {
    dispatch(deleteTable(tableId));
  };

  const handleAddCubicle = (tableId) => {
    if (newCubicleName.trim() !== "") {
      dispatch(addCubicle({ tableId, cubicleName: newCubicleName }));
      setNewCubicleName("");
    }
  };

  const handleEditCubicle = (cubicleId, currentName, tableId) => {
    setEditCubicleId(cubicleId);
    setNewCubicleName(currentName);
  };

  const handleSaveEditCubicle = (tableId) => {
    if (newCubicleName.trim() !== "") {
      dispatch(
        editCubicleName({
          tableId,
          cubicleId: editCubicleId,
          newName: newCubicleName,
        })
      );
      setEditCubicleId(null);
      setNewCubicleName("");
    }
  };

  const handleCancelEditCubicle = () => {
    setEditCubicleId(null);
    setNewCubicleName("");
  };

  const handleDeleteCubicle = (tableId, cubicleId) => {
    dispatch(deleteCubicle({ tableId, cubicleId }));
  };

  return (
    <>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <input
            type="text"
            placeholder="Enter table name"
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
          />
          <button className="btn btn-primary my-3" onClick={handleAddTable}>
            Add Table
          </button>

          <input
            type="text"
            placeholder="Enter cubicle name"
            value={newCubicleName}
            onChange={(e) => setNewCubicleName(e.target.value)}
          />
        </div>

        {tables.map((table) => (
          <div className="d-flex justify-content-between">
          <div>
            <h3>{table.name}</h3>
            </div>
            <div>
            {table.id === editTableId ? (
              <div className="table-button">
                <button
                  className="btn btn-success mx-3"
                  onClick={handleSaveEditTable}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleCancelEditTable}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="table-button">
                <button
                  className="btn btn-info mx-3"
                  onClick={() => handleEditTable(table.id, table.name)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => handleDeleteTable(table.id)}
                >
                  Delete
                </button>
              </div>
            )}
            </div>
          </div>
        ))}

        <div class="table-responsive">
          <table class="table">
            <tbody>
              {/* {tables.map((table) => ( */}
                <>
                  {tables.map((table) => (
                    <tr>
                      <>
                        {/* <th>{table.id}</th> */}
                        <th style={{
                            borderBottom: '5px solid blue',
                            backgroundColor: '#E4F7FE',
                            textAlign: 'center'
                        }}>{table.name}</th>
                        {table.cubicles.map((cubical) => {
                          return <th style={{backgroundColor: '#F2FAFD'}}><p style={{
                            border: '1px solid blue',
                            borderRadius: '5px',
                            width: '50%',
                            textAlign: 'center',
                        }} onClick={() => handleEditCubicle(cubical.id, cubical.name)}>{cubical.name}<Trash3 onClick={() => handleDeleteCubicle(table.id, cubical.id)}/><PencilSquare onClick={() => handleSaveEditCubicle(table.id)}/></p></th>;
                        })}
                      </>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => handleAddCubicle(table.id)}
                        >
                          Add Cubicle
                        </button>
                        
                      </td>
                    </tr>
                  ))}
                </>
              {/* ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableList;
