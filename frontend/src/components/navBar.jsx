import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMenu = () => setIsMinimized((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMinimized(false);
      }
    };

    handleResize();
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
          {navBarPages.map(([path, label]) => (
            <li key={path}>
              <NavLink
                to={path === "overview" ? "/" : `/${path}`}
                className={({ isActive }) =>
                  `tp3 nav-link ${isActive ? "active" : ""}`
                }
              >
                <img
                  src={`./assets/icon-nav-${path}.svg`}
                  alt={label}
                  className="nav-icon"
                />
                <span>{label}</span>
              </NavLink>
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
