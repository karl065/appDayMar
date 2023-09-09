import {
  getFiltroProductos,
  getProductos,
} from '@/redux/Services/productos/getProductos';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const FiltroProductos = () => {
  const path = usePathname();

  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.valores.categorias);
  const [filtros, setFiltros] = useState([]);
  const [filtroGeneral, setFiltroGeneral] = useState(false);
  const [filtroCategorias, setFiltroCategorias] = useState(false);
  const [filtroStock, setFiltroStock] = useState(false);
  const [filtroPrecioCompra, setFiltroPrecioCompra] = useState(false);
  const [filtroPrecioVenta, setFiltroPrecioVenta] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState(false);
  const [dataFiltro, setDataFiltro] = useState({});

  const dropdownGeneralRef = useRef(null);
  const dropdownCategoriasRef = useRef(null);
  const dropdownStockRef = useRef(null);
  const dropdownPrecioCompraRef = useRef(null);
  const dropdownPrecioVentaRef = useRef(null);
  const dropdownStatusRef = useRef(null);

  const toggleDropdown = () => {
    setFiltroGeneral(!filtroGeneral);
    dropdownGeneralRef.current = null;
  };

  const handleChangeInput = (e) => {
    const {id, value} = e.target;

    if (id === 'minCant' && value) {
      const minCantIndex = filtros.findIndex((filtro) =>
        filtro.hasOwnProperty('minCant')
      );
      if (minCantIndex !== -1) {
        // Si minCant ya existe, modificar su valor
        const updatedFiltros = [...filtros];
        updatedFiltros[minCantIndex].minCant = value;
        setFiltros(updatedFiltros);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          minCant: value,
        }));
      } else {
        // Si minCant no existe, agregarlo al array de filtros
        setFiltros([...filtros, {minCant: value}]);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          minCant: value,
        }));
      }
    }
    if (id === 'maxCant' && value) {
      const maxCantIndex = filtros.findIndex((filtro) =>
        filtro.hasOwnProperty('maxCant')
      );
      if (maxCantIndex !== -1) {
        // Si minCant ya existe, modificar su valor
        const updatedFiltros = [...filtros];
        updatedFiltros[maxCantIndex].maxCant = value;
        setFiltros(updatedFiltros);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          maxCant: value,
        }));
      } else {
        // Si minCant no existe, agregarlo al array de filtros
        setFiltros([...filtros, {maxCant: value}]);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          maxCant: value,
        }));
      }
    }
    if (id === 'minPrecioC' && value) {
      const minPrecioCIndex = filtros.findIndex((filtro) =>
        filtro.hasOwnProperty('minPrecioC')
      );
      if (minPrecioCIndex !== -1) {
        // Si minCant ya existe, modificar su valor
        const updatedFiltros = [...filtros];
        updatedFiltros[minPrecioCIndex].minPrecioC = value;
        setFiltros(updatedFiltros);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          minPrecioC: value,
        }));
      } else {
        // Si minCant no existe, agregarlo al array de filtros
        setFiltros([...filtros, {minPrecioC: value}]);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          minPrecioC: value,
        }));
      }
    }
    if (id === 'maxPrecioC' && value) {
      const maxPrecioCIndex = filtros.findIndex((filtro) =>
        filtro.hasOwnProperty('maxPrecioC')
      );
      if (maxPrecioCIndex !== -1) {
        // Si minCant ya existe, modificar su valor
        const updatedFiltros = [...filtros];
        updatedFiltros[maxPrecioCIndex].maxPrecioC = value;
        setFiltros(updatedFiltros);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          maxPrecioC: value,
        }));
      } else {
        // Si minCant no existe, agregarlo al array de filtros
        setFiltros([...filtros, {maxPrecioC: value}]);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          maxPrecioC: value,
        }));
      }
    }
    if (id === 'minPrecioV' && value) {
      const minPrecioVIndex = filtros.findIndex((filtro) =>
        filtro.hasOwnProperty('minPrecioV')
      );
      if (minPrecioVIndex !== -1) {
        // Si minCant ya existe, modificar su valor
        const updatedFiltros = [...filtros];
        updatedFiltros[minPrecioVIndex].minPrecioV = value;
        setFiltros(updatedFiltros);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          minPrecioV: value,
        }));
      } else {
        // Si minCant no existe, agregarlo al array de filtros
        setFiltros([...filtros, {minPrecioV: value}]);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          minPrecioV: value,
        }));
      }
    }
    if (id === 'maxPrecioV' && value) {
      const maxPrecioVIndex = filtros.findIndex((filtro) =>
        filtro.hasOwnProperty('maxPrecioV')
      );
      if (maxPrecioVIndex !== -1) {
        // Si minCant ya existe, modificar su valor
        const updatedFiltros = [...filtros];
        updatedFiltros[maxPrecioVIndex].maxPrecioV = value;
        setFiltros(updatedFiltros);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          maxPrecioV: value,
        }));
      } else {
        // Si minCant no existe, agregarlo al array de filtros
        setFiltros([...filtros, {maxPrecioV: value}]);
        setDataFiltro((prevDataFiltro) => ({
          ...prevDataFiltro,
          maxPrecioV: value,
        }));
      }
    }
  };

  const toggleCategorias = () => {
    setFiltroCategorias(!filtroCategorias);
  };
  const toggleStock = () => {
    setFiltroStock(!filtroStock);
  };
  const togglePrecioCompra = () => {
    setFiltroPrecioCompra(!filtroPrecioCompra);
  };
  const togglePrecioVenta = () => {
    setFiltroPrecioVenta(!filtroPrecioVenta);
  };
  const toggleStatus = () => {
    setFiltroStatus(!filtroStatus);
  };

  const handleFiltros = (e) => {
    e.preventDefault();
    const {id, value} = e.target;

    if (id === 'categoria') {
      const categoriaObj = JSON.parse(value);
      const updatedFiltros = [...filtros];
      const existingCategoriaIndex = updatedFiltros.findIndex((filtro) =>
        filtro.hasOwnProperty('idCategoria')
      );

      if (existingCategoriaIndex !== -1) {
        updatedFiltros[existingCategoriaIndex] = categoriaObj;
      } else {
        updatedFiltros.push(categoriaObj);
      }

      setFiltros(updatedFiltros);
      setDataFiltro((prevDataFiltro) => ({
        ...prevDataFiltro,
        idCategoria: categoriaObj.idCategoria,
      }));
    }
    if (id === 'Disponible') {
      const dataStatus = {status: 'D'};
      const updatedFiltros = [...filtros];
      const existingStatusIndex = updatedFiltros.findIndex((filtro) =>
        filtro.hasOwnProperty('status')
      );
      if (existingStatusIndex !== -1) {
        updatedFiltros[existingStatusIndex] = dataStatus;
      } else {
        updatedFiltros.push(dataStatus);
      }
      setFiltros(updatedFiltros);
      setDataFiltro((prevDataFiltro) => ({
        ...prevDataFiltro,
        status: dataStatus.status,
      }));
    }
    if (id === 'No disponible') {
      const dataStatus = {status: 'N'};
      const updatedFiltros = [...filtros];
      const existingStatusIndex = updatedFiltros.findIndex((filtro) =>
        filtro.hasOwnProperty('status')
      );
      if (existingStatusIndex !== -1) {
        updatedFiltros[existingStatusIndex] = dataStatus;
      } else {
        updatedFiltros.push(dataStatus);
      }
      setFiltros(updatedFiltros);
      setDataFiltro((prevDataFiltro) => ({
        ...prevDataFiltro,
        status: dataStatus.status,
      }));
    }
  };

  const handleDeleteFiltro = (e) => {
    e.preventDefault();
    const {id, value} = e.target;

    setFiltroGeneral(false);
    setFiltroCategorias(false);
    setFiltroStock(false);
    setFiltroPrecioCompra(false);
    setFiltroPrecioVenta(false);
    setFiltros((prevFiltros) => {
      if (id === 'nombreCategoria') {
        delete dataFiltro.idCategoria;
      }
      const updateFiltros = prevFiltros.filter(
        (filtro) => filtro[id] !== value
      );
      delete dataFiltro[id];
      if (updateFiltros.length === 0) {
        getProductos(dispatch);
      }
      getFiltroProductos(dataFiltro, dispatch);
      return updateFiltros;
    });
  };

  useEffect(() => {
    if (filtros.length > 0) getFiltroProductos(dataFiltro, dispatch);
  }, [filtros]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const containsGeneral = dropdownGeneralRef.current
        ? dropdownGeneralRef.current.contains(e.target)
        : true;

      if (!filtroGeneral && !containsGeneral) {
        setFiltroGeneral(false);
        dropdownGeneralRef.current = null;
      }
      if (
        filtroCategorias &&
        dropdownCategoriasRef.current &&
        dropdownCategoriasRef.current.contains &&
        !dropdownCategoriasRef.current.contains(e.target)
      ) {
        setFiltroCategorias(false);
      }
      if (
        filtroStock &&
        dropdownStockRef.current &&
        dropdownStockRef.current.contains &&
        !dropdownStockRef.current.contains(e.target)
      ) {
        setFiltroStock(false);
      }
      if (
        filtroPrecioCompra &&
        dropdownPrecioCompraRef.current &&
        dropdownPrecioCompraRef.current.contains &&
        !dropdownPrecioCompraRef.current.contains(e.target)
      ) {
        setFiltroPrecioCompra(false);
      }
      if (
        filtroPrecioVenta &&
        dropdownPrecioVentaRef.current &&
        dropdownPrecioVentaRef.current.contains &&
        !dropdownPrecioVentaRef.current.contains(e.target)
      ) {
        setFiltroPrecioVenta(false);
      }
      if (
        filtroStatus &&
        dropdownStatusRef.current &&
        dropdownStatusRef.current.contains &&
        !dropdownStatusRef.current.contains(e.target)
      ) {
        setFiltroStatus(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    dropdownGeneralRef,
    dropdownCategoriasRef,
    dropdownStockRef,
    dropdownPrecioCompraRef,
    dropdownPrecioVentaRef,
    dropdownStatusRef,
  ]);

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
              filtroGeneral === true ? 'rotate-180' : ''
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
        {filtroGeneral === true && (
          <div
            ref={dropdownGeneralRef}
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
                <div ref={dropdownCategoriasRef} className="flex flex-col">
                  {categorias.map((categoria, index) => (
                    <button
                      id="categoria"
                      key={index}
                      value={JSON.stringify({
                        nombreCategoria: categoria.nombreCategoria,
                        idCategoria: categoria.idCategoria,
                      })}
                      onClick={handleFiltros}
                    >
                      {categoria.nombreCategoria}
                    </button>
                  ))}
                </div>
              )}
              <button
                id="dropdownDelayButtonStock"
                data-dropdown-toggle="dropdownDelayStock"
                data-dropdown-delay="500"
                data-dropdown-trigger="hover"
                className="flex mx-2"
                type="button"
                onClick={toggleStock}
              >
                Stock{' '}
                <svg
                  className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
                    filtroStock ? 'rotate-180' : ''
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
              {filtroStock && (
                <div
                  ref={dropdownStockRef}
                  className="flex flex-col p-1 space-y-1"
                >
                  <input
                    id="minCant"
                    type="number"
                    placeholder="Cantidad minima"
                    className="inline-block rounded bg-black"
                    onChange={handleChangeInput}
                  />
                  <input
                    id="maxCant"
                    type="number"
                    placeholder="Cantidad maxima"
                    className="inline-block rounded bg-black"
                    onChange={handleChangeInput}
                  />
                </div>
              )}

              {path !== '/' && (
                <button
                  id="dropdownDelayButtonPrecioCompra"
                  data-dropdown-toggle="dropdownDelayPrecioCompra"
                  data-dropdown-delay="500"
                  data-dropdown-trigger="hover"
                  className="flex mx-2"
                  type="button"
                  onClick={togglePrecioCompra}
                >
                  Precio de compra{' '}
                  <svg
                    className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
                      filtroPrecioCompra ? 'rotate-180' : ''
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
              )}
              {filtroPrecioCompra && (
                <div
                  ref={dropdownPrecioCompraRef}
                  className="flex flex-col p-1 space-y-1"
                >
                  <input
                    id="minPrecioC"
                    type="number"
                    placeholder="Precio mínimo"
                    className="inline-block rounded bg-black"
                    onChange={handleChangeInput}
                  />
                  <input
                    id="maxPrecioC"
                    type="number"
                    placeholder="Precio máximo"
                    className="inline-block rounded bg-black"
                    onChange={handleChangeInput}
                  />
                </div>
              )}
              <button
                id="dropdownDelayButtonPrecioVenta"
                data-dropdown-toggle="dropdownDelayPrecioVenta"
                data-dropdown-delay="500"
                data-dropdown-trigger="hover"
                className="flex mx-2"
                type="button"
                onClick={togglePrecioVenta}
              >
                {path === '/' ? 'Precio' : 'Precio de venta'}{' '}
                <svg
                  className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
                    filtroPrecioVenta ? 'rotate-180' : ''
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
              {filtroPrecioVenta && (
                <div
                  ref={dropdownPrecioVentaRef}
                  className="flex flex-col p-1 space-y-1"
                >
                  <input
                    id="minPrecioV"
                    type="number"
                    placeholder="Precio mínimo"
                    className="inline-block rounded bg-black"
                    onChange={handleChangeInput}
                  />
                  <input
                    id="maxPrecioV"
                    type="number"
                    placeholder="Precio máximo"
                    className="inline-block rounded bg-black"
                    onChange={handleChangeInput}
                  />
                </div>
              )}
              {path !== '/' && (
                <button
                  id="dropdownDelayButtonStatus"
                  data-dropdown-toggle="dropdownDelayStatus"
                  data-dropdown-delay="500"
                  data-dropdown-trigger="hover"
                  className="flex mx-2"
                  type="button"
                  onClick={toggleStatus}
                >
                  Estado{' '}
                  <svg
                    className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
                      filtroStatus === true ? 'rotate-180' : ''
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
              )}
              {filtroStatus && (
                <div
                  ref={dropdownStatusRef}
                  className="flex flex-col p-1 space-y-1"
                >
                  <button id="Disponible" onClick={handleFiltros}>
                    Disponible
                  </button>
                  <button id="No disponible" onClick={handleFiltros}>
                    No disponible
                  </button>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className="flex mx-2 space-x-2">
        {filtros.map((filtro, index) => (
          <button
            id={Object.keys(filtro)[0]}
            key={index}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            value={filtro[Object.keys(filtro)[0]]}
            onClick={handleDeleteFiltro}
          >
            {filtro.status === 'D'
              ? 'Disponible'
              : filtro.status === 'N'
              ? 'No disponible'
              : filtro.nombreCategoria
              ? filtro[Object.keys(filtro)[0]]
              : `${Object.keys(filtro)[0]}: ${filtro[Object.keys(filtro)[0]]}`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltroProductos;
