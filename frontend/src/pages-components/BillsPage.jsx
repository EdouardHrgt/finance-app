import { useMemo, useState } from "react";
import { loadFromStore } from "../utils/storage";
import {
  formatAmount,
  getDayFromISODate,
  formatMonthlyDate,
} from "../utils/formatDateAndAmount";

function BillsPage() {
  const transactionsList = loadFromStore(`/api/transactions`) || [];
  const transactions = transactionsList.filter((t) => t.recurring === true);
  const today = new Date().getDate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Latest");

  // Calcul des totaux
  const { upcomings, paidBills, dueSoon, countUpcomings, countPaid, countDue } =
    useMemo(() => {
      let upcomings = 0;
      let paidBills = 0;
      let dueSoon = 0;
      let countUpcomings = 0;
      let countPaid = 0;
      let countDue = 0;

      transactions.forEach((t) => {
        const amount = Number(t.amount);
        const day = getDayFromISODate(t.date);

        if (amount > 0) {
          upcomings += amount;
          countUpcomings++;
        } else if (amount < 0) {
          if (day < today) {
            paidBills += Math.abs(amount);
            countPaid++;
          } else {
            dueSoon += Math.abs(amount);
            countDue++;
          }
        }
      });

      return {
        upcomings,
        paidBills,
        dueSoon,
        countUpcomings,
        countPaid,
        countDue,
      };
    }, [transactions, today]);

  // Filtrage et tri
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions.filter((t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOption) {
      case "Oldest":
        filtered.sort(
          (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
        );
        break;
      case "Latest":
        filtered.sort(
          (a, b) => new Date(b.date).getDate() - new Date(a.date).getDate()
        );
        break;
      case "A to Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Highest":
        filtered.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
        break;
      case "Lowest":
        filtered.sort((a, b) => Math.abs(a.amount) - Math.abs(b.amount));
        break;
      default: // Latest
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return filtered;
  }, [transactions, searchTerm, sortOption]);

  return (
    <main className="bills-page page">
      <h1 className="tp1">Bills</h1>
      <section className="bills-page-grid">
        {/* LEFT COLUMN */}
        <div className="bills-page-left-col">
          <div className="bills-page-total">
            <img src="/assets/icon-recurring-bills.svg" alt="" />
            <p className="tp4-regular">Total Bills</p>
            <p>
              <strong className="tp1">
                {formatAmount(paidBills + dueSoon, true)}
              </strong>
            </p>
          </div>

          <div className="bills-page-summary">
            <h2 className="tp3 p-dark">Summary</h2>

            <div className="bills-page-summary-card">
              <p className="tp5-regular p-light">Paid Bills</p>
              <p>
                <strong className="p-dark tp5-bold">
                  {countPaid > 0
                    ? `${countPaid} (${formatAmount(paidBills, true)})`
                    : "0 ($0)"}
                </strong>
              </p>
            </div>

            <div className="bills-page-summary-card">
              <p className="tp5-regular p-light">Total Upcoming</p>
              <p>
                <strong className="p-dark tp5-bold">
                  {countUpcomings > 0
                    ? `${countUpcomings} (${formatAmount(upcomings, true)})`
                    : "0 ($0)"}
                </strong>
              </p>
            </div>

            <div className="bills-page-summary-card">
              <p className="tp5-regular p-light">Due Soon</p>
              <p>
                <strong className="p-dark tp5-bold">
                  {countDue > 0
                    ? `${countDue} (${formatAmount(dueSoon, true)})`
                    : "N/A"}
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="bills-page-right-col">
          {/* FILTER + SORT */}
          <section className="bills-page-form">
            <input
              type="text"
              name="bills-search"
              id="bills-search"
              placeholder="Search bills"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="bills-page-dropdown-wrapper">
              <p className="tp4-regular p-light bills-page-dropdown-label">
                Sort by
              </p>
              <div className="bills-page-dropdown">
                <div className="bills-page-dropdown-txt">
                  <p className="tp4-bold p-dark">{sortOption}</p>
                  <img src="/assets/icon-caret-down.svg" alt="open the menu" />
                </div>
                <div className="bills-page-dropdown-content">
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
                      className={`tp4-regular ${
                        sortOption === opt ? "active" : ""
                      }`}
                      onClick={() => setSortOption(opt)}
                    >
                      {opt}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* TABLE */}
          <section className="bills-page-table">
            <div className="bills-page-table-labels">
              <p className="tp5-regular Bills-page-table-label-first">
                Bill Title
              </p>
              <p className="tp5-regular Bills-page-table-label-date">
                Due Date
              </p>
              <p className="tp5-regular Bills-page-table-label-amount">
                Amount
              </p>
            </div>

            {filteredAndSortedTransactions.map((bill, i) => {
              const isPaid =
                bill.amount < 0 && getDayFromISODate(bill.date) < today;

              return (
                <article key={i} className="Bills-page-table-card">
                  <div className="Bills-page-table-card-name-img">
                    <img src={bill.avatar} alt={bill.name} />
                    <p>
                      <strong className="tp4-bold">{bill.name}</strong>
                    </p>
                  </div>

                  <div className="Bills-page-table-card-date">
                    <p
                      className="tp5-regular"
                      style={!isPaid ? { color: "var(--grey-500)" } : {}}
                    >
                      {formatMonthlyDate(bill.date)}
                    </p>
                  </div>

                  <div className="Bills-page-table-card-amount">
                    <p>
                      <strong className="tp4-bold">
                        {formatAmount(bill.amount, true)}
                      </strong>
                    </p>
                  </div>
                </article>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}

export default BillsPage;
