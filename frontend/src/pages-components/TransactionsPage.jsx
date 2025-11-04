import { useState } from "react";
import { loadFromStore } from "../utils/storage";
import { useLocation } from "react-router-dom";
import { formatDate, formatAmount } from "../utils/formatDateAndAmount";

function TransactionsPage() {
  const location = useLocation();
  const transactions = loadFromStore(`/api${location.pathname}`) || [];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = transactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <main className="transactions-page page">
      <h1 className="tp1">Transactions</h1>
      <div className="transactions-page-container">
        <div className="transactions-page-form">
          <input
            type="text"
            name="transaction"
            id="transaction"
            placeholder="Search transaction"
          />
          <div className="transactions-page-form-dropdowns-wrapper">
            <div className="transaction-page-form-menu mg-right">
              <p className="tp4-regular p-light">Sort by</p>
              <div className="dropdown">
                <div className="dropdown-txt">
                  <p className="tp4-bold p-dark">Latest </p>
                  <img
                    src="../../public/assets/icon-caret-down.svg"
                    alt="open the menu"
                  />
                </div>
                <div className="dropdown-content">
                  <p className="tp4-regular">Latest</p>
                  <p className="tp4-regular">Oldest</p>
                  <p className="tp4-regular">A to Z</p>
                  <p className="tp4-regular">Z to A</p>
                  <p className="tp4-regular">Highest</p>
                  <p className="tp4-regular">Lowest</p>
                </div>
              </div>
            </div>
            <div className="transaction-page-form-menu">
              <p className="tp4-regular p-light">Category</p>
              <div className="dropdown">
                <div className="dropdown-txt">
                  <p className="tp4-bold p-dark">All Transactions</p>
                  <img
                    src="../../public/assets/icon-caret-down.svg"
                    alt="open the menu"
                  />
                </div>
                <div className="dropdown-content">
                  <p className="tp4-regular">All Transactions</p>
                  <p className="tp4-regular">Entertainment</p>
                  <p className="tp4-regular">Bills</p>
                  <p className="tp4-regular">Groceries</p>
                  <p className="tp4-regular">Dining Out</p>
                  <p className="tp4-regular">Transportation</p>
                  <p className="tp4-regular">Personnal Care</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="transactions-page-transactions-labels">
          <p className="tp5-regular transactions-page-transactions-labels-first">
            Recipient / Sender
          </p>
          <div>
            <p className="tp5-regular transactions-page-transactions-labels-category">
              Category
            </p>
            <p className="tp5-regular transactions-page-transactions-labels-date">
              Transaction Date
            </p>
          </div>
          <p>Amount</p>
        </div>

        <section className="transactions-page-transactions">
          {currentTransactions.map((t, i) => (
            <div className="transactions-page-transaction" key={i}>
              <div className="transactions-page-transaction-name-img">
                <img src={t.avatar} alt={t.name} />
                <p>
                  <strong className="tp4-bold">{t.name}</strong>
                </p>
              </div>
              <div className="transactions-page-transaction-category-date">
                <p className="tp5-regular transactions-page-transaction-category">
                  {t.category}
                </p>
                <p className="tp5-regular transactions-page-transaction-date">
                  {formatDate(t.date)}
                </p>
              </div>
              <div className="transactions-page-transaction-amount">
                <p>
                  <strong
                    className="tp4-bold"
                    style={
                      formatAmount(t.amount).startsWith("+")
                        ? { color: "var(--green)" }
                        : {}
                    }
                  >
                    {formatAmount(t.amount)}
                  </strong>
                </p>
              </div>
            </div>
          ))}

          <div className="transactions-page-pagination">
            <button
              className="tp4-regular"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg
                fill="none"
                height="11"
                viewBox="0 0 6 11"
                width="6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m5.14656 10.8535-5.000005-4.99997c-.046488-.04643-.0833676-.10158-.1085298-.16228-.0251623-.06069-.03811269-.12576-.0381127-.19147 0-.0657.0129504-.13077.0381126-.19147.0251623-.06069.0620419-.11584.1085299-.16228l4.999995-4.999997c.06993-.0700052.15906-.117689.2561-.13701419.09704-.01932521.19764-.0094229.28905.02845329.09141.0378763.16953.1020229.22447.1843199.05493.082297.08421.179044.08414.277991v10.000017c.00007.0989-.02921.1957-.08414.278-.05494.0823-.13306.1464-.22447.1843s-.19201.0478-.28905.0284c-.09704-.0193-.18617-.067-.25609-.137z"
                  fill="#696868"
                />
              </svg>
              Prev
            </button>

            <div className="pagination-pages-choice">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => goToPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              className="tp4-regular"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
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
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default TransactionsPage;
