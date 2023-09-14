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
    <nav className="bg-zinc-900 opacity-75 flex justify-between px-16 py-4 items-center relative z-50">
      <Link href="/">
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1693416033/appDayMar/app/Para_navbar_gcbjwy.png"
          alt="Logo"
          className="w-30 h-10"
        />
      </Link>
      <h1>{usuarioLogin.email}</h1>
      <SearchBar />
      <ul className="flex gap-4 uppercase">
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
