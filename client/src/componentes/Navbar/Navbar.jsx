import Link from 'next/link';
import SearchBar from '../SearchBar/SearchBar';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '@/redux/Slices/slice';
import {useEffect, useRef, useState} from 'react';
import authUsuario from '@/redux/Services/usuarios/authUsuario';

const Navbar = () => {
  const usuarioLogin = useSelector((state) => state.valores.login);

  const dispatch = useDispatch();

  const [menuGeneral, setMenuGeneral] = useState(false);
  const dropdownGeneralRef = useRef(null);

  const toggleDropdown = () => {
    setMenuGeneral(!menuGeneral);
    dropdownGeneralRef.current = null;
  };

  const handleLogout = () => {
    toggleDropdown();
    localStorage.removeItem('token');
    dispatch(userLogin([]));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) authUsuario(token, dispatch);
  }, []);
  return (
    <nav className="bg-zinc-900 opacity-75 flex justify-between px-4 py-4 items-center relative z-50 text-xs md:text-sm lg:text-lg">
      <h1 className="hidden sm:flex">{usuarioLogin.email}</h1>
      <SearchBar />
      <ul className="gap-2 uppercase hidden md:flex lg:flex">
        <li>
          <Link href="/">inicio</Link>
        </li>
        {usuarioLogin.token ? (
          <>
            {usuarioLogin.rol === 'SuperUser' ||
            usuarioLogin.rol === 'Admin' ? (
              <>
                <li>
                  <Link href="/Admin">Panel Administrativo</Link>
                </li>
              </>
            ) : null}
            <li>
              <Link href="/" onClick={handleLogout}>
                salir
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/Login">iniciar sesión</Link>
            </li>
            <li>
              <Link href="/Register">Registrarse</Link>
            </li>
          </>
        )}
        <li>
          <Link href="/About">acerca de</Link>
        </li>
      </ul>
      <div className="md:hidden lg:hidden">
        <button
          id="dropdownDelayButton"
          data-dropdown-toggle="dropdownDelay"
          data-dropdown-delay="500"
          data-dropdown-trigger="hover"
          type="button"
          onClick={toggleDropdown}
        >
          {' '}
          <img
            src={
              menuGeneral
                ? 'https://res.cloudinary.com/dpjeltekx/image/upload/v1698525767/appDayMar/app/menu_open_FILL0_wght400_GRAD0_opsz48_lodgaz.png'
                : 'https://res.cloudinary.com/dpjeltekx/image/upload/v1698525766/appDayMar/app/menu_FILL0_wght400_GRAD0_opsz48_zrhyur.png'
            }
            alt="Menu"
            style={{filter: 'invert(100%)', color: 'green'}}
          />
        </button>
        {menuGeneral === true && (
          <div
            ref={dropdownGeneralRef}
            id="dropdownDelay"
            className={`right-1 ${
              menuGeneral ? 'absolute' : 'hidden'
            } bg-black divide-y divide-black rounded-lg shadow p-2 dark:bg-black mt-50 border-white border-2 opacity-75 dark:opacity-100`}
          >
            <ul className="gap-2 uppercase">
              <li>
                <Link href="/" onClick={toggleDropdown}>
                  inicio
                </Link>
              </li>
              {usuarioLogin.token ? (
                <>
                  {usuarioLogin.rol === 'SuperUser' ||
                  usuarioLogin.rol === 'Admin' ? (
                    <>
                      <li>
                        <Link href="/Admin" onClick={toggleDropdown}>
                          Panel Administrativo
                        </Link>
                      </li>
                    </>
                  ) : null}
                  <li>
                    <Link href="/" onClick={handleLogout}>
                      salir
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/Login" onClick={toggleDropdown}>
                      iniciar sesión
                    </Link>
                  </li>
                  <li>
                    <Link href="/Register" onClick={toggleDropdown}>
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/About" onClick={toggleDropdown}>
                  acerca de
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
