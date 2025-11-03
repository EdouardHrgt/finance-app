import useFetch from "../../hooks/useFetch";
import TitleAndLink from "../../components/TitleAndLink";

function RecurringBills() {
  const { data: transactions, loading, error } = useFetch("/api/transactions");

  let paidBills = 0;
  let upcoming = 0;
  let recurrent = 0;

  if (!loading && !error && Array.isArray(transactions)) {
    paidBills = transactions
      .filter((t) => t.amount < 0 && !t.recurring)
      .reduce((acc, t) => acc + t.amount, 0);

    upcoming = transactions
      .filter((t) => t.amount >= 0)
      .reduce((acc, t) => acc + t.amount, 0);

    recurrent = transactions
      .filter((t) => t.amount < 0 && t.recurring)
      .reduce((acc, t) => acc + t.amount, 0);
  }

  const totals = {
    bills: ["Paid Bills", paidBills],
    upcomings: ["Total Upcoming", upcoming],
    recurrents: ["Monthly Payments", recurrent],
  };

  const formatAmount = (value) => {
    if (value == null || isNaN(value)) return "N/A";
    const isNegative = value < 0;
    const formatted = Math.abs(value).toFixed(2);
    return (isNegative ? "-" : "+") + "$" + formatted;
  };

  const colors = ["var(--green)", "var(--yellow)", "var(--cyan)"];

  return (
    <div className="budget-bills-container bills-container">
      <TitleAndLink title="Bills" link="/bills" />

      <section className="bills">
        {Object.entries(totals).map(([key, [title, amount]], idx) => {
          const borderColors = ["var(--green)", "var(--yellow)", "var(--cyan)"];
          const borderColor = borderColors[idx % borderColors.length];
          const textColor = error ? "var(--red)" : "inherit";

          return (
            <div
              key={key}
              className="bill"
              style={{ borderLeft: `5px solid ${borderColor}` }}
            >
              <p className="tp4-regular">{title}</p>

              <p>
                <strong className="tp4-bold" style={{ color: textColor }}>
                  {loading ? (
                    <span className="spinner" />
                  ) : error ? (
                    "N/A"
                  ) : (
                    formatAmount(amount)
                  )}
                </strong>
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default RecurringBills;
