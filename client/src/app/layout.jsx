import Navbar from '@/componentes/Navbar/Navbar';
import './globals.css';
import Providers from '@/redux/provider';

export const metadata = {
  title: 'DayMar',
  description: 'Carlos Castellanos',
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <Providers>
        <body>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
