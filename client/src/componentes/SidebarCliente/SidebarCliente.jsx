import Link from 'next/link';
import {usePathname} from 'next/navigation';

const SidebarCliente = () => {
  const path = usePathname();

  return (
    <div className="bg-zinc-900 opacity-75 space-y-2 min-h-screen flex flex-col pt-2 px-5 ">
      <Link
        className={`mx-auto p-1.5 bg-lime-700 rounded-full hover:bg-lime-800 focus:outline-none focus:bg-lime-500 ${
          path === '/Admin/Usuarios' ? 'pointer-events-none opacity-50' : ''
        }`}
        href="/PerfilUsuario/Perfil"
        title="Ver Perfil"
      >
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1694651316/appDayMar/app/group_FILL0_wght400_GRAD0_opsz48_secwfi.png"
          alt="verUsuarios"
          style={{filter: 'invert(100%)'}}
          className="w-10 h-10"
        />
      </Link>
      <Link
        className={`mx-auto p-1.5 bg-lime-700 rounded-full hover:bg-lime-800 focus:outline-none focus:bg-lime-500 ${
          path === '/Admin/CrearUsuarios'
            ? 'pointer-events-none opacity-50'
            : ''
        }`}
        href="/Admin/CrearUsuarios"
        title="Crear Usuarios"
      >
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1694651316/appDayMar/app/person_add_FILL0_wght400_GRAD0_opsz48_ftzxwv.png"
          alt="crearUsuarios"
          className="w-10 h-10"
          style={{filter: 'invert(100%)'}}
        />
      </Link>
      <Link
        className={`mx-auto p-1.5 bg-lime-700 rounded-full hover:bg-lime-800 focus:outline-none focus:bg-lime-500 ${
          path === '/Admin/ActualizarUsuarios'
            ? 'pointer-events-none opacity-50'
            : ''
        }`}
        href="/Admin/ActualizarUsuarios"
        title="Actualizar Usuarios"
      >
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1694651316/appDayMar/app/assignment_ind_FILL0_wght400_GRAD0_opsz48_iglpgo.png"
          alt="actualizarUsuarios"
          className="w-10 h-10"
          style={{filter: 'invert(100%)'}}
        />
      </Link>
      <hr />
      <Link
        className={`mx-auto p-1.5 bg-lime-700 rounded-full hover:bg-lime-800 focus:outline-none focus:bg-lime-500 ${
          path === '/Admin/CrearCategorias'
            ? 'pointer-events-none opacity-50'
            : ''
        }`}
        href="/Admin/CrearCategorias"
        title="Crear Categorias"
      >
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1694654373/appDayMar/app/yard_FILL0_wght400_GRAD0_opsz48_nrrckr.png"
          alt="CrearCategorias"
          style={{filter: 'invert(100%)'}}
          className="w-10 h-10"
        />
      </Link>
      <Link
        className={`mx-auto p-1.5 bg-lime-700 rounded-full hover:bg-lime-800 focus:outline-none focus:bg-lime-500 ${
          path === '/Admin/CrearProductos'
            ? 'pointer-events-none opacity-50'
            : ''
        }`}
        href="/Admin/CrearProductos"
        title="Crear Productos"
      >
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1694654372/appDayMar/app/potted_plant_FILL0_wght400_GRAD0_opsz48_f002xj.png"
          alt="CrearProductos"
          style={{filter: 'invert(100%)'}}
          className="w-10 h-10"
        />
      </Link>
      <Link
        className={`mx-auto p-1.5 bg-lime-700 rounded-full hover:bg-lime-800 focus:outline-none focus:bg-lime-500 ${
          path === '/Admin/Productos' ? 'pointer-events-none opacity-50' : ''
        }`}
        href="/Admin/Productos"
        title="Ver Productos"
      >
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1694654372/appDayMar/app/forest_FILL0_wght400_GRAD0_opsz48_zr3bfw.png"
          alt="Productos"
          style={{filter: 'invert(100%)'}}
          className="w-10 h-10"
        />
      </Link>
      <Link
        className={`mx-auto p-1.5 bg-lime-700 rounded-full hover:bg-lime-800 focus:outline-none focus:bg-lime-500 ${
          path === '/Admin/ActualizarProducto'
            ? 'pointer-events-none opacity-50'
            : ''
        }`}
        href="/Admin/ActualizarProducto"
        title="Actualizar Productos"
      >
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1694654372/appDayMar/app/compost_FILL0_wght400_GRAD0_opsz48_gcjrlf.png"
          alt="ActualizarProductos"
          style={{filter: 'invert(100%)'}}
          className="w-10 h-10"
        />
      </Link>
    </div>
  );
};

export default SidebarCliente;
