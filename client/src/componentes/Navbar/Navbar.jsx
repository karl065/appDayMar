import Link from 'next/link';

import SearchBar from '../SearchBar/SearchBar';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '@/redux/Slices/slice';
import {useEffect, useState} from 'react';
import authUsuario from '@/redux/Services/usuarios/authUsuario';

const Navbar = () => {
  const usuarioLogin = useSelector((state) => state.valores.login);

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(userLogin([]));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) authUsuario(token, dispatch);
  }, []);
  return (
    <nav className=" bg-zinc-900 opacity-75 flex justify-between px-4 py-4 items-center ">
      <h1 className="text-xs md:text-sm lg:text-base">{usuarioLogin.email}</h1>
      <SearchBar />
      <ul className="flex gap-2 text-xs md:text-sm lg:text-base uppercase">
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
    </nav>
  );
};

export default Navbar;
