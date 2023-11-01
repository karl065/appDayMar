'use client';
import SidebarCliente from '@/componentes/SidebarCliente/SidebarCliente';
import {usePathname} from 'next/navigation';

const UserPage = ({children}) => {
  const path = usePathname();

  return (
    <div className="flex justify-between">
      <SidebarCliente />
      <div className="flex flex-grow m-2 relative w-full">
        {path && children}
      </div>
    </div>
  );
};

export default UserPage;
