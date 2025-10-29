import useFetch from "../hooks/useFetch";

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
    <div className="budget-bills-container">
      <section className="title-link-wrapper">
        <h2 className="tp2">Recurring Bills</h2>
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
