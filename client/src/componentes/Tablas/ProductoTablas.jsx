import {useDispatch, useSelector} from 'react-redux';
import {useMemo, useState} from 'react';
import {usePagination, useTable} from 'react-table';
import putProductos from '@/redux/Services/productos/putProductos';

const ProductoTablas = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.valores.productos);
  const processedData = useMemo(() => {
    return data.map((producto) => ({
      ...producto,
      imagenUrl: producto.imagen[0].split(',')[0],
      nombreStatus: producto.status === 'D' ? 'Disponible' : 'No disponible',
      categoria: producto.categorias.nombreCategoria,
    }));
  }, [data]);
  const columns = useMemo(
    () => [
      {
        Header: 'Imagen',
        accessor: 'imagenUrl',
        Cell: ({cell: {value}}) => (
          <img className="bg-black" src={value} alt="Producto" width="50" />
        ),
      },
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Precio de Compra',
        accessor: 'precioCompra',
        Cell: ({cell: {value}}) => (
          <span>${parseFloat(value).toLocaleString('es-CO')}</span>
        ),
      },
      {
        Header: 'Precio de Venta',
        accessor: 'precioVenta',
        Cell: ({cell: {value}}) => (
          <span>${parseFloat(value).toLocaleString('es-CO')}</span>
        ),
      },
      {
        Header: 'Stock',
        accessor: 'stock',
      },
      {
        Header: 'Tipo',
        accessor: 'tipo',
      },
      {
        Header: 'Categoria',
        accessor: 'categoria',
      },
      {
        Header: 'Estado',
        accessor: 'nombreStatus',
        Cell: ({cell: {value}, row: {original}}) => {
          const [selectStatus, setSelectStatus] = useState(false);
          const toggleStatus = () => {
            setSelectStatus(!selectStatus);
          };

          const handleStatus = (e) => {
            e.preventDefault();
            const newStatus = e.target.id === 'Disponible' ? 'D' : 'N';

            // Verificar si el estado seleccionado es diferente del estado actual antes de hacer cambios
            if (newStatus !== original.status) {
              putProductos({status: newStatus}, original.idProducto, dispatch);
            }

            // Alternar el estado del botón de selección
            setSelectStatus(!selectStatus);
          };

          return (
            <div>
              <button
                id="dropdownDelayButton"
                data-dropdown-toggle="dropdownDelay"
                data-dropdown-delay="500"
                data-dropdown-trigger="hover"
                className={`${
                  value == 'No disponible'
                    ? 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                    : 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                }`}
                type="button"
                onClick={toggleStatus}
              >
                {value}{' '}
                <svg
                  className={`w-2.5 h-2.5 ml-2.5 transition-transform ${
                    selectStatus === true ? 'rotate-180' : ''
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
              {selectStatus && (
                <div
                  id="dropdownDelay"
                  className={`z-60 ${
                    selectStatus ? 'absolute' : 'hidden'
                  } bg-black divide-y divide-black rounded-lg shadow w-44 dark:bg-black mt-2 border-white border-2 opacity-75 dark:opacity-100`}
                >
                  <ul
                    className="space-x-2 py-2 text-sm text-white dark:text-white "
                    aria-labelledby="dropdownDelayButton"
                  >
                    <button
                      className="z-50 "
                      id={
                        value === 'Disponible' ? 'No disponible' : 'Disponible'
                      }
                      onClick={handleStatus}
                    >
                      {value === 'Disponible' ? 'No Disponible' : 'Disponible'}
                    </button>
                  </ul>
                </div>
              )}
            </div>
          );
        },
      },

      {
        Header: '',
        accessor: 'edit',
        Cell: ({cell: {value}, row: {original}}) => <button>Editar</button>,
      },
    ],
    []
  );

  const table = useTable(
    {
      columns,
      data: processedData,
      initialState: {pageIndex: 0, pageSize: 10},
    },
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state: {pageIndex, pageSize},
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    setPageSize,
  } = table;

  return (
    <div className="mx-auto">
      <div className="flex flex-col bg-black opacity-75 p-8 rounded shadow-lg space-y-2 items-center">
        <table className="text-center" {...getTableProps()}>
          <thead className="border-b font-medium dark:border-neutral-500">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    scope="col"
                    className="px-2 py-2 uppercase"
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className={`border-b dark:border-neutral-500 ${
                    row.original.nombreStatus === 'No disponible'
                      ? 'bg-red-950'
                      : ''
                  }`}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="whitespace-nowrap px-4 py-2 uppercase"
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>{' '}
          <span>
            Página{' '}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Ir a la página:{' '}
            <input
              className="bg-black rounded-sm"
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{width: '50px'}}
            />
          </span>{' '}
          <select
            className="bg-black rounded-sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductoTablas;
