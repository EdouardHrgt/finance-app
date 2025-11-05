import useFetch from "../../hooks/useFetch";
import TitleAndLink from "../../components/TitleAndLink";
import { formatDate, formatAmount } from "../../utils/formatDateAndAmount";
import { normalizeStructure } from "../../utils/storage";

const DEFAULT_AVATAR = "/assets/images/avatars/no-pp.png";

function Transactions() {
  const { data: rawTransactions, loading, error } = useFetch("/api/transactions");

  // Normalisation AVANT utilisation
  const transactions = normalizeStructure(rawTransactions);

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

  return (
    <div className="transactions-and-pots-container transactions-wrapper">
      <TitleAndLink title="Transactions" link="/transactions" />

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
