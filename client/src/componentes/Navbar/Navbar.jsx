import Link from 'next/link';
import './Navbar.css';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 flex justify-between px-16 py-4 items-center">
      <SearchBar />
      <ul className="flex gap-4">
        <li>
          <Link href="/">HOME</Link>
        </li>
        <li>
          <Link href="/About">ABOUT</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
