import TitleAndLink from "../components/TitleAndLink";
import { loadFromStore } from "../utils/storage";
import { useLocation } from "react-router-dom";
import { formatDate, formatAmount } from "../utils/formatDateAndAmount";

function BudgetsPage() {
  const location = useLocation();
  const budgetsList = loadFromStore(`/api${location.pathname}`) || [];
  //   FORMAT OF budgetsList => [
  //   {
  //     category: "Entertainment",
  //     maximum: 50.0,
  //     theme: "#277C78",
  //   },
  //   {
  //     category: "Bills",
  //     maximum: 750.0,
  //     theme: "#82C9D7",
  //   },
  //   {
  //     category: "Dining Out",
  //     maximum: 75.0,
  //     theme: "#F2CDAC",
  //   },
  //   {
  //     category: "Personal Care",
  //     maximum: 100.0,
  //     theme: "#626070",
  //   },
  // ];

  return (
    <main className="budgets-page page">
      <h1 className="tp1">Budgets</h1>
      <section className="budgets-page-container">
        {/* LEFT COLUMN : DONUT */}
        <div className="budgets-page-left">
          <div className="donut">
            <div className="donut-hole">
              <div className="donut-center-txt">
                <p>
                  <strong className="tp1">$338</strong>
                </p>
                <p className="donut-limit">of $975 limit</p>
              </div>
            </div>
          </div>
          <h2 className="tp2 p-dark">Spending Summary</h2>
          <div className="budget-page-donut-metrics">
            {/* 1 of 4 metrix card */}
            <div className="budget-page-donut-metric">
              <div className="budget-page-donut-metric-bar">
                {/* need to take background-color from budget.theme */}
              </div>
              <p className="p-light tp4-regular">Entertainment</p>
              <div className="budget-page-donut-metric-amount">
                <p>
                  <strong className="tp3 p-dark">$15.00</strong>
                </p>
                <p className="p-light tp5-regular">of $50.00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="budgets-page-right">
          {/* =================================================================== */}
          <div className="budgets-page-card">
            {/* CARD TITLE */}
            <div className="budgets-page-card-title">
              <div className="budgets-page-card-circle"></div>
              <h2 className="tp2 p-dark">Entertainment</h2>
              <img src="../../public/assets/icon-ellipsis.svg" alt="#" />
            </div>
            {/* CARD MAX */}
            <p className="p-light tp4-regular">Maximum of $50.00</p>
            <div className="budgets-page-card-gauge-container">
              <div className="budgets-page-card-gauge">
                {/*  style : max-width = percentage of the actual budget spent / budget.maximum */}
              </div>
            </div>
            {/* SPENT / REMAINING METRIX */}
            <div className="budgets-page-card-metrics">
              <div className="budgets-page-card-metric">
                <div className="budgets-page-metric-bar"></div>
                <p className="p-light tp4-regular">Spent</p>
                <p>
                  <strong className="tp4-bold p-dark">$15.00</strong>
                </p>
              </div>
              <div className="budgets-page-card-metric">
                <div className="budgets-page-metric-bar"></div>
                <p className="p-light tp4-regular">Remaining</p>
                <p>
                  <strong className="tp4-bold p-dark">$35.00</strong>
                </p>
              </div>
            </div>
            {/* LASTEST SPENDING */}
            <div className="budgets-page-card-latest">
              <TitleAndLink title="Latest Spending" link="/" />
              <div className="budgets-page-card-latest-el">
                <img
                  src="../../public/assets/avatars/emma-richardson.jpg"
                  alt=""
                />
                <p className="tp5-bold p-dark">James Thompson</p>
                <div className="budgets-page-card-latest-el-date-amount">
                  <p>
                    <strong className="tp5-bold p-dark">-$5.00</strong>
                  </p>
                  <p className="tp5-regular p-light">11 Aug 2024</p>
                </div>
              </div>
            </div>
          </div>
          {/* =================================================================== */}
        </div>
      </section>
    </main>
  );
}

export default BudgetsPage;
