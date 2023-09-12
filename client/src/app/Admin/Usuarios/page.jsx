'use client';

import UsuariosTabla from '@/componentes/Tablas/UsuariosTabla';
import AdminPage from '../page';

const page = () => {
  return (
    <AdminPage>
      <div className="inline-block mx-auto">
        <UsuariosTabla />
      </div>
    </AdminPage>
  );
};

export default page;
