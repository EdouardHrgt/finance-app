import { useState, useMemo } from "react";
import { loadFromStore } from "../utils/storage";
import { useLocation } from "react-router-dom";
import { formatDate, formatAmount } from "../utils/formatDateAndAmount";

function TransactionsPage() {
  const location = useLocation();
  const transactions = loadFromStore(`/api${location.pathname}`) || [];


  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Transactions");
  const [sortOption, setSortOption] = useState("Latest");

  const itemsPerPage = 10;

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    if (searchQuery.trim() !== "") {
      result = result.filter((t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All Transactions") {
      result = result.filter((t) => t.category === selectedCategory);
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case "A to Z":
          return a.name.localeCompare(b.name);
        case "Z to A":
          return b.name.localeCompare(a.name);
        case "Highest":
          return parseFloat(b.amount) - parseFloat(a.amount);
        case "Lowest":
          return parseFloat(a.amount) - parseFloat(b.amount);
        case "Oldest":
          return new Date(a.date) - new Date(b.date);
        case "Latest":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return result;
  }, [transactions, searchQuery, selectedCategory, sortOption]);

  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredAndSortedTransactions.slice(
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
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <div className="transactions-page-form-dropdowns-wrapper">
            {/* SORT */}
            <div className="transaction-page-form-menu mg-right">
              <p className="tp4-regular p-light dropdown-label">Sort by</p>
              <div id="dd-name-date-amount" className="dropdown">
                <svg
                  className="dropdown-icon"
                  fill="none"
                  height="15"
                  viewBox="0 0 16 15"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >

                  <path
                    d="m14.25 0h-12.5c-.33152 0-.64946.131696-.883884.366116-.23442.234421-.366116.552363-.366116.883884v12.5c0 .3315.131696.6495.366116.8839.234424.2344.552364.3661.883884.3661h12.5c.3315 0 .6495-.1317.8839-.3661s.3661-.5524.3661-.8839v-12.5c0-.331521-.1317-.649463-.3661-.883884-.2344-.23442-.5524-.366116-.8839-.366116zm-10.625 3.125h7.5c.1658 0 .3247.06585.4419.18306.1173.11721.1831.27618.1831.44194s-.0658.32473-.1831.44194c-.1172.11721-.2761.18306-.4419.18306h-7.5c-.16576 0-.32473-.06585-.44194-.18306s-.18306-.27618-.18306-.44194.06585-.32473.18306-.44194.27618-.18306.44194-.18306zm3.125 8.75h-3.125c-.16576 0-.32473-.0658-.44194-.1831-.11721-.1172-.18306-.2761-.18306-.4419s.06585-.3247.18306-.4419c.11721-.1173.27618-.1831.44194-.1831h3.125c.16576 0 .32473.0658.44194.1831.11721.1172.18306.2761.18306.4419s-.06585.3247-.18306.4419c-.11721.1173-.27618.1831-.44194.1831zm.625-3.75h-3.75c-.16576 0-.32473-.06585-.44194-.18306s-.18306-.27618-.18306-.44194.06585-.32473.18306-.44194.27618-.18306.44194-.18306h3.75c.16576 0 .32473.06585.44194.18306s.18306.27618.18306.44194-.06585.32473-.18306.44194-.27618.18306-.44194.18306zm6.0672 2.3172-1.875 1.875c-.0581.0581-.127.1042-.2029.1357-.0758.0314-.1572.0476-.2393.0476s-.1635-.0162-.2393-.0476c-.0759-.0315-.1448-.0776-.2029-.1357l-1.87499-1.875c-.11727-.1173-.18316-.2763-.18316-.4422 0-.16585.06589-.32491.18316-.44219.11728-.11727.27634-.18316.44219-.18316s.32491.06589.44219.18316l.80781.80859v-3.4914c0-.16576.0658-.32473.1831-.44194.1172-.11721.2761-.18306.4419-.18306s.3247.06585.4419.18306c.1173.11721.1831.27618.1831.44194v3.4914l.8078-.80859c.1173-.11727.2763-.18316.4422-.18316s.3249.06589.4422.18316c.1173.11728.1831.27634.1831.44219 0 .1659-.0658.3249-.1831.4422z"
                    fill="#201f24"
                  />
                </svg>
                <div
                  className="dropdown-txt"
                  onClick={(e) =>
                    e.currentTarget.parentNode.classList.toggle("open")
                  }
                >
                  <p className="tp4-bold p-dark">{sortOption}</p>
                  <img
                    src="/assets/icon-caret-down.svg"
                    alt="open the menu"
                  />
                </div>
                <div className="dropdown-content">
                  {[
                    "Latest",
                    "Oldest",
                    "A to Z",
                    "Z to A",
                    "Highest",
                    "Lowest",
                  ].map((opt) => (
                    <p
                      key={opt}
                      className="tp4-regular"
                      onClick={() => {
                        setSortOption(opt);
                        setCurrentPage(1);
                      }}
                    >
                      {opt}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="transaction-page-form-menu">
              <p className="tp4-regular p-light dropdown-label">Category</p>
              <div id="dd-categories" className="dropdown">
                <svg
                  className="dropdown-icon"
                  fill="none"
                  height="16"
                  viewBox="0 0 18 16"
                  width="18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    d="m16.7976 2.71562-.0062.00704-5.2914 5.65v4.33514c.0003.2062-.0504.4092-.1476.5911-.0972.1818-.2379.3368-.4095.4511l-2.49995 1.6672c-.1884.1255-.40734.1975-.63344.2082-.22611.0108-.45091-.04-.65039-.147s-.36616-.2662-.48225-.4605-.17723-.4165-.17689-.6429v-6.00234l-5.29141-5.65-.00625-.00704c-.16269-.17905-.269938-.40146-.308716-.64026s-.007425-.48373.090256-.70506c.09768-.22133.25749-.409563.46005-.541857.20255-.132294.43914-.202966.68107-.203443h13.75002c.2421.000024.479.070368.6819.202485.2029.132118.3631.320325.4611.541745.0979.22142.1295.46653.0908.70555-.0387.23901-.146.46165-.3088.64084z"
                    fill="#201f24"
                  />{" "}
                </svg>
                <div
                  className="dropdown-txt"
                  onClick={(e) =>
                    e.currentTarget.parentNode.classList.toggle("open")
                  }
                >
                  <p className="tp4-bold p-dark">{selectedCategory}</p>
                  <img
                    src="/assets/icon-caret-down.svg"
                    alt="open the menu"
                  />
                </div>
                <div className="dropdown-content">
                  {[
                    "All Transactions",
                    "Entertainment",
                    "Bills",
                    "Groceries",
                    "Dining Out",
                    "Transportation",
                    "Personnal Care",
                  ].map((cat) => (
                    <p
                      key={cat}
                      className="tp4-regular"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentPage(1);
                      }}
                    >
                      {cat}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LABELS */}
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

        {/* PC VERSION */}
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

          {/* MOBILE VERSION */}
          <section className="transactions-mobile">
            {currentTransactions.map((t, i) => (
              <div className="transactions-mobile-item" key={i}>
                <div className="transactions-left-mobile">
                  <img src={t.avatar} alt={t.name} />
                  <div className="transactions-left-mobile-name-category">
                    <p>
                      <strong className="tp4-bold p-dark">{t.name}</strong>
                    </p>
                    <p className="tp5-regular transactions-page-transaction-category p-light">
                      {t.category}
                    </p>
                  </div>
                </div>
                <div className="transactions-right-mobile">
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
                  <p className="tp5-regular transactions-page-transaction-date p-light">
                    {formatDate(t.date)}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* PAGINATION */}
          <div className="transactions-page-pagination">
            <button
              className="tp4-regular page-btn-1"
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
              <p className="tp4-regular p-dark">Prev</p>
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
              className="tp4-regular page-btn-2"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <p className="tp4-regular p-dark">Next</p>
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
