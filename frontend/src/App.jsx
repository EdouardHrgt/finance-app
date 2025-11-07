import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/navBar.jsx";
import OverviewPage from "./pages-components/OverviewPage.jsx";
import TransactionsPage from "./pages-components/TransactionsPage.jsx";
import BudgetsPage from "./pages-components/BudgetsPage.jsx";
import BillsPage from "./pages-components/BillsPage.jsx";
import PotsPage from "./pages-components/PotsPage.jsx";

function App() {
  const [isNavMinimized, setIsNavMinimized] = useState(false);

  return (
    <BrowserRouter>
      <div id="app-main" className={isNavMinimized ? "nav-minimized" : ""}>
        <NavBar isMinimized={isNavMinimized} setIsMinimized={setIsNavMinimized} />
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/pots" element={<PotsPage />} />
          <Route path="/recurring-bills" element={<BillsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
