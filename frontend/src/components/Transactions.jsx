import useFetch from "../hooks/useFetch";

const DEFAULT_AVATAR = "/assets/avatars/no-pp.png";

function Transactions() {
  const { data: transactions, loading, error } = useFetch("/api/transactions");
  console.log(transactions);
  const transactionsList =
    transactions?.slice(0, 5).map((trans) => ({
      label: trans.name,
      img: trans.avatar || DEFAULT_AVATAR,
      amount: trans.amount,
      date: trans.date,
    })) ||
    Array.from({ length: 5 }, () => ({
      label: "",
      img: DEFAULT_AVATAR,
      amount: 0,
      date: "",
    }));

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (raw) => {
    if (raw == null) return "N/A";

    const str = String(raw).trim();
    const isNegative = str.startsWith("-");
    const num = Math.abs(Number.parseFloat(str));
    if (!Number.isFinite(num)) return "N/A";

    const formatted = num.toFixed(2);
    return (isNegative ? "-" : "+") + "$" + formatted;
  };

  return (
    <div className="transactions-and-pots-container transactions-wrapper">
      <section className="title-link-wrapper">
        <h2 className="tp2">Transactions</h2>
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

      <section className="transactions-list">
        {transactionsList.map((t, idx) => (
          <div className="transaction" key={idx}>
            <img src={t.img} alt={t.label || "No avatar"} />
            <p className="transaction-name tp4-bold">
              {loading ? "Loading..." : error ? "Error" : t.label || "—"}
            </p>

            <div className="transaction-amount-date">
              <p>
                <strong className="tp4-bold">
                  {loading ? (
                    <span className="spinner" />
                  ) : error ? (
                    <span className="error">N/A</span>
                  ) : (
                    formatAmount(t.amount)
                  )}
                </strong>
              </p>

              <p className="date tp5-regular">
                {loading ? "" : error ? "" : formatDate(t.date)}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Transactions;
