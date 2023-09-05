'use client';
import Sidebar from '@/componentes/Sidebar/Sidebar';
import {usePathname} from 'next/navigation';

const AdminPage = ({children}) => {
  const path = usePathname();
  const isCrearCategoriasRoute = path === '/Admin/CrearCategorias';
  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex items-center justify-center flex-grow">
        {path && children}
      </div>
    </div>
  );
};

export default AdminPage;
