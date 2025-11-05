import TitleAndLink from "../components/TitleAndLink";
import { loadFromStore } from "../utils/storage";
import { useLocation } from "react-router-dom";
import { formatDate, formatAmount } from "../utils/formatDateAndAmount";

function BudgetsPage() {
  const location = useLocation();
  const budgetsList = loadFromStore(`/api${location.pathname}`) || [];
  const transactions = loadFromStore("/api/transactions") || [];

  // Total budget
  const totalBudget = budgetsList.reduce((acc, b) => acc + (b.maximum || 0), 0);

  // Total dépensé (t.amount < 0)
  const totalSpent = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  // Donut gradient (basé sur la répartition de chaque budget)
  let start = 0;
  const segments = budgetsList.map((b) => {
    const percent = (b.maximum / totalBudget) * 100;
    const end = start + percent;
    const seg = `${b.theme} ${start}% ${end}%`;
    start = end;
    return seg;
  });
  const gradient = `conic-gradient(${segments.join(", ")})`;

  // Calcul dépenses par catégorie
  const getSpentByCategory = (cat) =>
    transactions
      .filter((t) => t.category === cat && t.amount < 0)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  return (
    <main className="budgets-page page">
      <h1 className="tp1">Budgets</h1>

      <section className="budgets-page-container">
        {/* LEFT COLUMN : DONUT */}
        <div className="budgets-page-left">
          <div className="donut" style={{ background: gradient }}>
            <div className="donut-hole">
              <div className="donut-center-txt">
                <p>
                  <strong className="tp1">${totalSpent.toFixed(0)}</strong>
                </p>
                <p className="donut-limit">
                  of ${totalBudget.toFixed(0)} limit
                </p>
              </div>
            </div>
          </div>

          <h2 className="tp2 p-dark">Spending Summary</h2>

          <div className="budget-page-donut-metrics">
            {budgetsList.map((b, i) => {
              const spent = getSpentByCategory(b.category);
              return (
                <div key={i} className="budget-page-donut-metric">
                  <div
                    className="budget-page-donut-metric-bar"
                    style={{ backgroundColor: b.theme }}
                  />
                  <p className="p-light tp4-regular">{b.category}</p>
                  <div className="budget-page-donut-metric-amount">
                    <p>
                      <strong className="tp3 p-dark">
                        {formatAmount(spent)}
                      </strong>
                    </p>
                    <p className="p-light tp5-regular">
                      of {formatAmount(b.maximum)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN : DETAIL PAR BUDGET */}
        <div className="budgets-page-right">
          {budgetsList.map((b, i) => {
            const spent = getSpentByCategory(b.category);
            const remaining = b.maximum - spent;
            const percent = Math.min((spent / b.maximum) * 100, 100);
            const lastSpending = transactions
              .filter((t) => t.category === b.category && t.amount < 0)
              .slice(-3)
              .reverse();

            return (
              <div key={i} className="budgets-page-card">
                <div className="budgets-page-card-title">
                  <div
                    className="budgets-page-card-circle"
                    style={{ backgroundColor: b.theme }}
                  ></div>
                  <h2 className="tp2 p-dark">{b.category}</h2>
                  <img src="/assets/icon-ellipsis.svg" alt="#" />
                </div>

                <p className="p-light tp4-regular">
                  Maximum of {formatAmount(b.maximum)}
                </p>

                <div className="budgets-page-card-gauge-container">
                  <div
                    className="budgets-page-card-gauge"
                    style={{
                      maxWidth: `${percent}%`,
                      backgroundColor: b.theme,
                    }}
                  />
                </div>

                <div className="budgets-page-card-metrics">
                  <div className="budgets-page-card-metric">
                    <div
                      className="budgets-page-metric-bar"
                      style={{ backgroundColor: b.theme }}
                    ></div>
                    <div>
                      <p className="p-light tp4-regular">Spent</p>
                      <p>
                        <strong className="tp4-bold p-dark">
                          {formatAmount(spent)}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div className="budgets-page-card-metric">
                    <div className="budgets-page-metric-bar"></div>
                    <div>
                      <p className="p-light tp4-regular">Remaining</p>
                      <p>
                        <strong className="tp4-bold p-dark">
                          {remaining < 0
                            ? "Budget killed :c"
                            : formatAmount(remaining)}
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="budgets-page-card-latest">
                  <TitleAndLink title="Latest Spending" link="/" />
                  {lastSpending.length > 0 ? (
                    lastSpending.map((t, j) => (
                      <article key={j} className="budgets-page-card-latest-el">
                        <img src={t.avatar} alt={t.name} />
                        <p className="tp5-bold p-dark">{t.name}</p>
                        <div className="budgets-page-card-latest-el-date-amount">
                          <p>
                            <strong className="tp5-bold p-dark">
                              {formatAmount(t.amount)}
                            </strong>
                          </p>
                          <p className="tp5-regular p-light">
                            {formatDate(t.date)}
                          </p>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="tp5-regular p-light">No recent spendings</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default BudgetsPage;
