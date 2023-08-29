import {createSlice} from '@reduxjs/toolkit';

export const valoresSlice = createSlice({
  name: 'valores',
  initialState: {
    categorias: [],
    pedidos: [],
    productos: [],
    usuarios: [],
    ventas: [],
  },
  reducers: {
    cargarUsuarios: (state, action) => {
      state.usuarios = action.payload;
    },
    cargarProductos: (state, action) => {
      state.productos = action.payload;
    },
  },
});

export const {cargarUsuarios, cargarProductos} = valoresSlice.actions;

export default valoresSlice.reducer;
