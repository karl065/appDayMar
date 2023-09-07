import {useDispatch, useSelector} from 'react-redux';
import {useMemo} from 'react';
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
        Cell: ({cell: {value}, row: {original}}) => (
          <select
            className=" bg-black opacity-75 rounded-sm"
            value={value === 'Disponible' ? 'D' : 'N'}
            onChange={(e) => {
              putProductos(
                {status: e.target.value},
                original.idProducto,
                dispatch
              );
            }}
          >
            <option value="D">Disponible</option>
            <option value="N">No disponible</option>
          </select>
        ),
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
