import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/About">ABOUT</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
