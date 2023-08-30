import Link from 'next/link';

import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  return (
    <nav className="bg-zinc-900 flex justify-between px-16 py-4 items-center">
      <Link href="/">
        <img
          src="https://res.cloudinary.com/dpjeltekx/image/upload/v1693416033/appDayMar/app/Para_navbar_gcbjwy.png"
          alt="Logo"
          className="w-30 h-10"
        />
      </Link>
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
