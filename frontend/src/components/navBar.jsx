import { useState, useEffect } from "react";

function NavBar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMenu = () => setIsMinimized((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMinimized(false);
      }
    };

    handleResize(); // vérifie dès le montage
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navBarPages = [
    ["overview", "Overview"],
    ["transactions", "Transactions"],
    ["budgets", "Budgets"],
    ["pots", "Pots"],
    ["recurring-bills", "Recurring bills"],
  ];

  return (
    <header className={`header-main ${isMinimized ? "minimized" : ""}`}>
      <img
        id="logo-1"
        src="./assets/logo-large.svg"
        alt="logo large"
        className="logo-large"
      />
      <img
        id="logo-2"
        src="./assets/logo-small.svg"
        alt="logo minimized"
        className="logo-minimized"
      />

      <nav>
        <ul>
          {navBarPages.map(([icon, label]) => (
            <li key={icon}>
              <a href="#" className="tp3">
                <img src={`./assets/icon-nav-${icon}.svg`} alt={label} />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div id="toggle-menu" onClick={toggleMenu}>
        <img src="./assets/icon-minimize-menu.svg" alt="toggle menu" />
        {!isMinimized && <p className="tp3">Minimize Menu</p>}
      </div>
    </header>
  );
}

export default NavBar;
