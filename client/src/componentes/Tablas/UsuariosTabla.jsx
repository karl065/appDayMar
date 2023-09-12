import {useMemo} from 'react';
import {usePagination, useTable} from 'react-table';
import {useSelector} from 'react-redux';
import Link from 'next/link';

const UsuariosTabla = () => {
  const data = useSelector((state) => state.valores.usuarios);

  const columns = useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Direccion',
        accessor: 'direccion',
      },
      {
        Header: 'Celular',
        accessor: 'celular',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Rol',
        accessor: 'rol',
      },

      {
        Header: '',
        accessor: 'edit',
        Cell: ({cell: {value}, row: {original}}) => (
          <Link href={`/Admin/ActualizarProducto?id=${original.idProducto}`}>
            ✏
          </Link>
        ),
      },
    ],
    []
  );

  const table = useTable(
    {columns, data, initialState: {pageIndex: 0, pageSize: 10}},
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
    <div className="flex flex-col bg-black opacity-75 p-2 rounded shadow-lg space-y-2">
      <table className="min-w-full text-center" {...getTableProps()}>
        <thead className="border-b font-medium dark:border-neutral-500">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  scope="col"
                  className="px-6 py-2 uppercase"
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
                className="border-b dark:border-neutral-500"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="whitespace-nowrap px-6 py-2 uppercase"
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
      <div className="flex justify-center">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
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
  );
};

export default UsuariosTabla;
