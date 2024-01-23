import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tables: [
    {
      id: 1,
      name: 'Table 1',
      cubicles: [
        { id: 1, name: 'Cubicle 1', status: 'occupied', assignedTo: 'John Doe' },
        { id: 2, name: 'Cubicle 2', status: 'vacant', assignedTo: null },
      ],
    },
  ],
  employees: [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },                                        
  ],
};

export const slice = createSlice({
  name: 'office',
  initialState,
  reducers: {
    addTable: (state, action) => {
      const newTable = {
        id: state.tables.length + 1,
        name: action.payload,
        cubicles: [],
      };
      state.tables.push(newTable);
    },
    editTableName: (state, action) => {
      const { tableId, newName } = action.payload;
      const table = state.tables.find(table => table.id === tableId);
      if (table) {
        table.name = newName;
      }
    },
    deleteTable: (state, action) => {
      const tableId = action.payload;
      state.tables = state.tables.filter(table => table.id !== tableId);
    },
    addCubicle: (state, action) => {
      const { tableId, cubicleName } = action.payload;
      const table = state.tables.find(table => table.id === tableId);
      if (table) {
        const newCubicle = {
          id: table.cubicles.length + 1,
          name: cubicleName,
          status: 'vacant',
          assignedTo: null,
        };
        table.cubicles.push(newCubicle);
      }
    },
    editCubicleName: (state, action) => {
      const { tableId, cubicleId, newName } = action.payload;
      const table = state.tables.find(table => table.id === tableId);
      if (table) {
        const cubicle = table.cubicles.find(cubicle => cubicle.id === cubicleId);
        if (cubicle) {
          cubicle.name = newName;
        }
      }
    },
    deleteCubicle: (state, action) => {
      const { tableId, cubicleId } = action.payload;
      const table = state.tables.find(table => table.id === tableId);
      if (table) {
        table.cubicles = table.cubicles.filter(cubicle => cubicle.id !== cubicleId);
      }
    },
  },
});

export const {
  addTable,
  editTableName,
  deleteTable,
  addCubicle,
  editCubicleName,
  deleteCubicle,
} = slice.actions;

export const selectOffice = state => state.office;

export default slice.reducer;
