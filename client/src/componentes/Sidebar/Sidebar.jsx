import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="bg-zinc-900 opacity-75 h-screen flex flex-col pt-2 px-5 space-y-2">
      <Link href="/Admin/Usuarios">Usuarios</Link>
      <Link href="/Admin/CrearCategorias">Crear Categorias</Link>
      <Link href="/Admin/CrearProductos">Crear Productos</Link>
    </div>
  );
};

export default Sidebar;
