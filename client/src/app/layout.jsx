import Navbar from '@/componentes/Navbar/Navbar';
import './globals.css';
import Providers from '@/redux/provider';
import Head from 'next/head';

export const metadata = {
  title: 'DayMar',
  description: 'Carlos Castellanos',
};

export default function RootLayout({children}) {
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
