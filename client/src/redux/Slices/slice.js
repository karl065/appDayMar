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
    cargarCategorias: (state, action) => {
      state.categorias = action.payload;
    },
    nuevaCategoria: (state, action) => {
      state.categorias = [...state.categorias, action.payload];
    },
    nuevoProducto: (state, action) => {
      state.productos = [...state.productos, action.payload];
    },
  },
});

export const {
  cargarUsuarios,
  cargarProductos,
  userLogin,
  cargarCategorias,
  nuevaCategoria,
  nuevoProducto,
} = valoresSlice.actions;

export default valoresSlice.reducer;
