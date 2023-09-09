'use client';
import React from 'react';
import AdminPage from '../page';
import ActualizarProductos from '@/componentes/Formularios/Productos/ActualizarProductos';

const page = () => {
  return (
    <AdminPage>
      <div>
        <ActualizarProductos />
      </div>
    </AdminPage>
  );
};

export default page;
