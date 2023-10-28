import {
  getFiltroProductos,
  getProductos,
} from '@/redux/Services/productos/getProductos';
import {
  getFiltroUsuarios,
  getUsuarios,
} from '@/redux/Services/usuarios/getUsuarios';
import {usePathname} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const SearchBar = () => {
  const dispatch = useDispatch();
  const path = usePathname();
  const [search, setSearch] = useState('');
  const productos = useSelector((state) => state.valores.productos);
  const usuarios = useSelector((state) => state.valores.usuarios);
  const [searchName, setSearchName] = useState([]);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    if (path === '/' || path === '/Admin/Productos') {
      const filteredProductos = productos
        .filter((producto) =>
          producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((producto) => producto.nombre);

      searchTerm ? setSearchName(filteredProductos) : setSearchName([]);
    }
    if (path === '/Admin/Usuarios') {
      const filteredUsuarios = usuarios
        .filter((usuario) =>
          usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((usuario) => usuario.nombre);

      searchTerm ? setSearchName(filteredUsuarios) : setSearchName([]);
    }
  };

  const handleSearch = (searchTerm) => {
    if (path === '/' || path === '/Admin/Productos') {
      getFiltroProductos({nombre: searchTerm}, dispatch);
    }
    if (path === '/Admin/Usuarios') {
      getFiltroUsuarios({nombre: searchTerm}, dispatch);
    }
  };

  const handleName = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setSearchName([]);
    handleSearch(searchTerm);
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    handleSearch(search);
    setSearchName([]);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setSearch('');
    setSearchName([]);
    getProductos(dispatch);
    if (path === '/Admin/Usuarios') getUsuarios(dispatch);
  };

  useEffect(() => {
    if (productos.length === 0) {
      setSearch('');
    }
    if (usuarios.length === 0) {
      setSearch('');
    }
  }, [productos, usuarios]);

  return (
    <div className="flex justify-between items-center relative z-50">
      <div className="inline-block relative mr-2 text-xs md:text-sm lg:text-base">
        <input
          type="text"
          placeholder="Buscar"
          className="bg-auto rounded-md w-20 md:w-48 lg:w-64 text-black font-bold"
          value={search}
          onChange={handleChange}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-red-900 font-bold"
          onClick={handleDelete}
        >
          X
        </button>
        {searchName.length > 0 && (
          <div
            id="dropdownDelay"
            className={`z-50 ${
              searchName.length > 0 ? 'absolute' : 'hidden'
            } bg-black divide-y divide-black rounded-lg shadow p-2 dark:bg-black mt-2 border-white border-2 opacity-75 dark:opacity-100`}
          >
            <ul
              className="text-sm text-white dark:text-white flex flex-col"
              aria-labelledby="dropdownDelayButton"
            >
              {searchName.map((name, index) => (
                <button key={index} id={name} value={name} onClick={handleName}>
                  {name}
                </button>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button onClick={handleSearchButton}>
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1693410322/appDayMar/app/search_p8qit4.png"
          alt="Lupa búsqueda"
          style={{filter: 'invert(100%)', color: 'green'}}
          className="w-5 h-5 md:w-8 md:h-8"
        />
      </button>
    </div>
  );
};

export default SearchBar;
