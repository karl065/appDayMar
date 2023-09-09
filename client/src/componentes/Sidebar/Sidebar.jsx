import Link from 'next/link';
import {usePathname} from 'next/navigation';

const Sidebar = () => {
  const path = usePathname();

  return (
    <div className="bg-zinc-900 opacity-75 min-h-screen flex flex-col pt-2 px-5 space-y-2">
      <Link
        className={`bg-blue-500 m-2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
          path === '/Admin/Usuarios' ? 'pointer-events-none opacity-50' : ''
        }`}
        href="/Admin/Usuarios"
      >
        Usuarios
      </Link>
      <Link
        className={`bg-blue-500 m-2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
          path === '/Admin/CrearUsuarios'
            ? 'pointer-events-none opacity-50'
            : ''
        }`}
        href="/Admin/CrearUsuarios"
      >
        Crear Usuarios
      </Link>
      <hr />
      <Link
        className={`bg-blue-500 m-2 text-white py-2 px-4 rounded hover-bg-blue-600 focus:outline-none focus:bg-blue-600 ${
          path === '/Admin/CrearCategorias'
            ? 'pointer-events-none opacity-50'
            : ''
        }`}
        href="/Admin/CrearCategorias"
      >
        Crear Categorias
      </Link>
      <Link
        className={`bg-blue-500 m-2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
          path === '/Admin/CrearProductos'
            ? 'pointer-events-none opacity-50'
            : ''
        }`}
        href="/Admin/CrearProductos"
      >
        Crear Productos
      </Link>
      <Link
        className={`bg-blue-500 m-2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
          path === '/Admin/Productos' ? 'pointer-events-none opacity-50' : ''
        }`}
        href="/Admin/Productos"
      >
        Productos
      </Link>
      <Link
        className={`bg-blue-500 m-2 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
          path === '/Admin/ActualizarProducto'
            ? 'pointer-events-none opacity-50'
            : ''
        }`}
        href="/Admin/ActualizarProducto"
      >
        Actualizar productos
      </Link>
    </div>
  );
};

export default Sidebar;
