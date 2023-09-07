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
    actualizarProducto: (state, action) => {
      const updatedProduct = action.payload; // El producto actualizado que llega en el payload
      const updatedProducts = state.productos.map((producto) => {
        if (producto.idProducto === updatedProduct.idProducto) {
          // Si se encuentra el producto en el estado, reemplazarlo con los nuevos datos
          return {
            ...producto,
            ...updatedProduct,
          };
        }
        return producto; // Mantener los otros productos sin cambios
      });
      state.productos = updatedProducts;
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
  actualizarProducto,
} = valoresSlice.actions;

export default valoresSlice.reducer;
