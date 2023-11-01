'use client';
import SidebarCliente from '@/componentes/SidebarCliente/SidebarCliente';
import {usePathname} from 'next/navigation';

const UserPage = ({children}) => {
  const path = usePathname();

  return (
    <div className="flex justify-between">
      <SidebarCliente />
      <div className="relative flex flex-grow w-full m-2">
        {path && children}
      </div>
    </div>
  );
};

export default UserPage;
