import useFetch from "../../hooks/useFetch";
import TitleAndLink from "../../components/TitleAndLink";

function Budgets() {
  const {
    data: budgets,
    loading: loadingBudgets,
    error: errorBudgets,
  } = useFetch("/api/budgets");
  const {
    data: transactions,
    loading: loadingTransactions,
    error: errorTransactions,
  } = useFetch("/api/transactions");

  const loading = loadingBudgets || loadingTransactions;
  const error = errorBudgets || errorTransactions;

  const formatAmount = (value) => {
    if (value == null || isNaN(value)) return "N/A";
    return `$${Math.abs(value).toFixed(2)}`;
  };

  const budgetsDetail =
    budgets?.map((b) => ({
      label: b.category,
      value: b.maximum,
      theme: b.theme,
    })) || [];

  let totalBudget = 0;
  let totalSpent = 0;

  if (budgets && transactions) {
    totalBudget = budgets.reduce((acc, b) => acc + b.maximum, 0);
    const budgetCategories = budgets.map((b) => b.category);
    totalSpent = transactions
      .filter(
        (t) =>
          budgetCategories.includes(t.category) && typeof t.amount === "number"
      )
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  }

  let gradient = "var(--grey-100)";
  if (!loading && !error && budgetsDetail.length > 0 && totalBudget > 0) {
    let start = 0;
    const segments = budgetsDetail.map((b) => {
      const percent = (b.value / totalBudget) * 100;
      const end = start + percent;
      const seg = `${b.theme} ${start}% ${end}%`;
      start = end;
      return seg;
    });
    gradient = `conic-gradient(${segments.join(", ")})`;
  } else if (loading) {
    gradient = `conic-gradient(
      var(--grey-300) 0% 25%,
      var(--grey-100) 25% 50%,
      var(--grey-300) 50% 75%,
      var(--grey-100) 75% 100%
    )`;
  }

  return (
    <div className="budgets-wrapper">
      <TitleAndLink title="Budgets" link="/budgets" />

      <section className="donut-details">
        <div className="donut" style={{ background: gradient }}>
          <div className="donut-hole">
            {loading ? (
              <div className="spinner" />
            ) : (
              <div className="donut-center-txt">
                <p>
                  <strong
                    style={{ color: error ? "var(--red)" : "var(--grey-900)" }}
                    className="tp1"
                  >
                    {error ? "N/A" : `$${totalSpent.toFixed(0)}`}
                  </strong>
                </p>
                <p className="donut-limit">
                  of ${totalBudget.toFixed(0)} limit
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="details">
          {loading ? (
            budgetsDetail.length > 0 ? (
              budgetsDetail.map((b, i) => (
                <div key={i} className="detail">
                  <div
                    className="color-bar"
                    style={{ backgroundColor: b.theme || "var(--grey-300)" }}
                  />
                  <div className="detail-txt">
                    <p className="tp5-regular">{b.label || "..."}</p>
                    <p>
                      <strong className="tp4-bold">
                        <span className="spinner small" />
                      </strong>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="detail">
                  <div
                    className="color-bar"
                    style={{ backgroundColor: "var(--grey-300)" }}
                  />
                  <div className="detail-txt">
                    <p className="tp5-regular">Loading...</p>
                    <p>
                      <strong className="tp4-bold">
                        <span className="spinner small" />
                      </strong>
                    </p>
                  </div>
                </div>
              ))
            )
          ) : budgetsDetail.length > 0 ? (
            budgetsDetail.map((b, i) => (
              <div key={i} className="detail">
                <div
                  className="color-bar"
                  style={{ backgroundColor: b.theme }}
                />
                <div className="detail-txt">
                  <p className="tp5-regular">{b.label}</p>
                  <p>
                    <strong
                      className="tp4-bold"
                      style={{
                        color: error ? "var(--red)" : "var(--grey-900)",
                      }}
                    >
                      {error ? "N/A" : formatAmount(b.value)}
                    </strong>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="error">No budgets available</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Budgets;
