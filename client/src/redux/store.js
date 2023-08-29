import {configureStore} from '@reduxjs/toolkit';
import valoresReducer from './Slices/slice';

export default configureStore({
  reducer: {
    valores: valoresReducer,
  },
});
