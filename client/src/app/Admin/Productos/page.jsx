'use client';
import FiltroProductos from '@/componentes/Filtros/FiltroProductos';
import AdminPage from '../page';
import ProductoTablas from '@/componentes/Tablas/ProductoTablas';

const Page = () => {
  return (
    <AdminPage>
      <div className="space-y-2 mx-auto w-full">
        <FiltroProductos />
        <div>
          <ProductoTablas />
        </div>
      </div>
    </AdminPage>
  );
};

export default Page;
