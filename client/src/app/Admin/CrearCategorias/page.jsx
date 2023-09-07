'use client';
import CrearCategoriasForm from '@/componentes/Formularios/Categorias/CrearCategoriasForm';
import AdminPage from '../page';

const page = () => {
  return (
    <AdminPage>
      <div className="mx-auto">
        <CrearCategoriasForm />
      </div>
    </AdminPage>
  );
};

export default page;
