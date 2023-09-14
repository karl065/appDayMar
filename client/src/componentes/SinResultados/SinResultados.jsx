import {getProductos} from '@/redux/Services/productos/getProductos';
import {getUsuarios} from '@/redux/Services/usuarios/getUsuarios';
import {usePathname} from 'next/navigation';
import {useDispatch} from 'react-redux';

const SinResultados = () => {
  const dispatch = useDispatch();
  const path = usePathname();

  const handleAtras = (e) => {
    e.preventDefault();
    getProductos(dispatch);
    if (path === '/Admin/Usuarios') getUsuarios(dispatch);
  };
  return (
    <div className="flex flex-col bg-black opacity-75 p-2 justify-center items-center rounded shadow-lg space-y-2">
      <img
        src="https://res.cloudinary.com/dpjeltekx/image/upload/v1694644782/appDayMar/app/no-hay-resultados_n5wxx2.png"
        alt="sin resultados"
        className="w-60"
      />
      <h1 className="shadow-white shadow-2xl">No se encontro tu búsqueda</h1>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleAtras}
      >
        Atras
      </button>
    </div>
  );
};

export default SinResultados;
