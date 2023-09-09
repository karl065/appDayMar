'use client';
import Register from '@/componentes/Formularios/Usuarios/Register';
import AdminPage from '../page';

const page = () => {
  return (
    <AdminPage>
      <div className="mx-auto">
        <Register />
      </div>
    </AdminPage>
  );
};

export default page;
