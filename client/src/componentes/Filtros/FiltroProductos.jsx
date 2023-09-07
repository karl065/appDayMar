import {
  getFiltroProductos,
  getProductos,
} from '@/redux/Services/productos/getProductos';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const FiltroProductos = () => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.valores.categorias);
  const [filtros, setFiltros] = useState([]);
  console.log(filtros);
  const [filtroGeneral, setFiltroGeneral] = useState(false);
  const [filtroCategorias, setFiltroCategorias] = useState(false);

  const toggleDropdown = () => {
    setFiltroGeneral(!filtroGeneral);
  };

  const toggleCategorias = () => {
    setFiltroCategorias(!filtroCategorias);
  };

  const handleFiltros = (e) => {
    e.preventDefault();
    const categoriaObj = JSON.parse(e.target.value);
    setFiltros([...filtros, categoriaObj]);
    const {idCategoria} = categoriaObj;
    getFiltroProductos({idCategoria}, dispatch);
  };

  const handleDeleteFiltro = (e) => {
    e.preventDefault();
    setFiltros((prevFiltros) =>
      prevFiltros.filter((filtro) => filtro.nombreCategoria !== e.target.value)
    );
    getProductos(dispatch);
  };
  return (
    <div className="flex bg-black opacity-75 rounded p-2 relative z-50">
      <div>
        <button
          id="dropdownDelayButton"
          data-dropdown-toggle="dropdownDelay"
          data-dropdown-delay="500"
          data-dropdown-trigger="hover"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={toggleDropdown}
        >
          Filtrar{' '}
          <svg
            className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
              filtroGeneral ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {filtroGeneral && (
          <div
            id="dropdownDelay"
            className={`z-60 ${
              filtroGeneral ? 'absolute' : 'hidden'
            } bg-black divide-y divide-black rounded-lg shadow w-44 dark:bg-black mt-2 border-white border-2 opacity-75 dark:opacity-100`}
          >
            <ul
              className="space-x-2 py-2 text-sm text-white dark:text-white "
              aria-labelledby="dropdownDelayButton"
            >
              <button
                id="dropdownDelayButtonCategorias"
                data-dropdown-toggle="dropdownDelayCategorias"
                data-dropdown-delay="500"
                data-dropdown-trigger="hover"
                className="flex mx-2"
                type="button"
                onClick={toggleCategorias}
              >
                Categorias{' '}
                <svg
                  className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
                    filtroCategorias ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {filtroCategorias && (
                <div className="flex flex-col">
                  {categorias.map((categoria, index) => (
                    <button
                      key={index}
                      value={JSON.stringify(categoria)}
                      onClick={handleFiltros}
                    >
                      {categoria.nombreCategoria}
                    </button>
                  ))}
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className="flex mx-2 space-y-2">
        {filtros.map((filtro, index) => (
          <button
            key={index}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            value={filtro.nombreCategoria}
            onClick={handleDeleteFiltro}
          >
            {filtro.nombreCategoria}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltroProductos;
