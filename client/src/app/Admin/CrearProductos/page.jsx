'use client';

import React from 'react';
import AdminPage from '../page';
import CrearProductos from '@/componentes/Formularios/Productos/CrearProductos';

const page = () => {
  return (
    <AdminPage>
      <div className="mx-auto">
        <CrearProductos />
      </div>
    </AdminPage>
  );
};

export default page;
