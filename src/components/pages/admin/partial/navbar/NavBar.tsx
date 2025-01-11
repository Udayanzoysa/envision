const NavBar = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-xl">MyApp</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="/"
                className="hover:text-gray-400"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-gray-400"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-gray-400"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
