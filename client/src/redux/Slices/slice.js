import {createSlice} from '@reduxjs/toolkit';

export const valoresSlice = createSlice({
  name: 'valores',
  initialState: {
    categorias: [],
    pedidos: [],
    productos: [],
    usuarios: [],
    ventas: [],
    login: [],
  },
  reducers: {
    cargarUsuarios: (state, action) => {
      state.usuarios = action.payload;
    },
    cargarProductos: (state, action) => {
      state.productos = action.payload;
    },
    userLogin: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const {cargarUsuarios, cargarProductos, userLogin} =
  valoresSlice.actions;

export default valoresSlice.reducer;
