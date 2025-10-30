import useFetch from "../hooks/useFetch";

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

  // ======================
  // Helper: format currency
  // ======================
  const formatAmount = (value) => {
    if (value == null || isNaN(value)) return "N/A";
    return `$${Math.abs(value).toFixed(2)}`;
  };

  // ======================
  // Compute budgetsDetail
  // ======================
  const budgetsDetail =
    budgets?.map((b) => ({
      label: b.category,
      value: b.maximum,
      theme: b.theme,
    })) || [];

  // ======================
  // Compute totals
  // ======================
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

  // ======================
  // Compute donut gradient
  // ======================
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

  // ======================
  // Render
  // ======================
  return (
    <div className="budgets-wrapper">
      <section className="title-link-wrapper">
        <h2 className="tp2">Budgets</h2>
        <a href="#">
          See Details
          <svg
            fill="none"
            height="11"
            viewBox="0 0 6 11"
            width="6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m.853506.146465 5.000004 5.000005c.04648.04643.08336.10158.10853.16228.02516.06069.03811.12576.03811.19147 0 .0657-.01295.13077-.03811.19147-.02517.06069-.06205.11584-.10853.16228l-5.000004 5.00003c-.069927.07-.159054.1177-.256097.137-.097042.0193-.197637.0094-.289048-.0285-.091412-.0378-.16953-.102-.2244652-.1843-.0549354-.0823-.08421767-.179-.08413981-.278l-.00000043-9.999984c-.00007788-.098949.02920444-.195695.08413984-.277992.0549356-.082297.1330536-.1464431.2244646-.1843193.091412-.03787611.192007-.04777907.289049-.02845381.097042.01932521.186169.06700801.256097.13701411z"
              fill="#696868"
            />
          </svg>
        </a>
      </section>

      <section className="donut-details">
        {/* === Donut Graph === */}
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

        {/* === Details === */}
        <div className="details">
          {budgetsDetail.length > 0 ? (
            budgetsDetail.map((b, i) => (
              <div key={i} className="detail">
                <div
                  className="color-bar"
                  style={{
                    backgroundColor: b.theme,
                  }}
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
                      {loading ? (
                        <span className="spinner small" />
                      ) : error ? (
                        "N/A"
                      ) : (
                        formatAmount(b.value)
                      )}
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
