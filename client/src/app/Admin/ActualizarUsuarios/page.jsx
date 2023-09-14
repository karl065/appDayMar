'use client';
import ActualizarUsuario from '@/componentes/Formularios/Usuarios/ActualizarUsuarios';
import AdminPage from '../page';

const page = () => {
  return (
    <AdminPage>
      <div className="mx-auto">
        <ActualizarUsuario />
      </div>
    </AdminPage>
  );
};

export default page;
