'use client';
import CrearCategoriasForm from '@/componentes/Formularios/Categorias/CrearCategoriasForm';
import AdminPage from '../page';

const page = () => {
  return (
    <AdminPage>
      <div>
        <CrearCategoriasForm />
      </div>
    </AdminPage>
  );
};

export default page;
