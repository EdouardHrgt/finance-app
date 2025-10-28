import { useState } from "react";

function NavBar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMenu = () => setIsMinimized(!isMinimized);

  return (
    <header className={`header-main ${isMinimized ? "minimized" : ""}`}>
      {/* Logos */}
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

      {/* Navigation */}
      <nav>
        <ul>
          {[
            ["overview", "Overview"],
            ["transactions", "Transactions"],
            ["budgets", "Budgets"],
            ["pots", "Pots"],
            ["recurring-bills", "Recurring bills"],
          ].map(([icon, label]) => (
            <li key={icon}>
              <a href="#" className="tp3">
                <img src={`./assets/icon-nav-${icon}.svg`} alt={label} />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Toggle menu */}
      <div id="toggle-menu" onClick={toggleMenu}>
        <img src="./assets/icon-minimize-menu.svg" alt="toggle menu" />
        {!isMinimized && <p className="tp3">Minimize Menu</p>}
      </div>
    </header>
  );
}

export default NavBar;
