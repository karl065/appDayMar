'use client';
import Sidebar from '@/componentes/Sidebar/Sidebar';
import {usePathname} from 'next/navigation';

const AdminPage = ({children}) => {
  const path = usePathname();
  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex flex-grow m-2 relative">{path && children}</div>
    </div>
  );
};

export default AdminPage;
