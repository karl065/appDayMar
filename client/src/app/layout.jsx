'use client';
import Navbar from '@/componentes/Navbar/Navbar';
import './globals.css';
import Providers from '@/redux/provider';
import {useEffect} from 'react';
import {getUsuarios} from '@/redux/Services/usuarios/getUsuarios';
import store from '@/redux/store';
import {getProductos} from '@/redux/Services/productos/getProductos';
import {userLogin} from '@/redux/Slices/slice';

export const metadata = {
  title: 'DayMar',
  description: 'Carlos Castellanos',
};

export default function RootLayout({children}) {
  useEffect(() => {
    getUsuarios(store.dispatch);
    getProductos(store.dispatch);
  }, []);
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://res.cloudinary.com/dpjeltekx/image/upload/v1693416340/appDayMar/app/icono_arlsok.png"
        />
      </head>
      <Providers>
        <body>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
