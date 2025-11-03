import Balance from "../components/Overview-page-components/Balance"
import Pots from "../components/Overview-page-components/Pots";
import Transactions from "../components/Overview-page-components/Transactions";
import Budgets from "../components/Overview-page-components/Budgets";
import RecurringBills from "../components/Overview-page-components/RecurringBills";

function Overview() {
  return (
    <main className="overview-page page">
      <Balance />
      <div className="overview-page-grid">
        <section className="overview-page-left-col">
          <Pots />
          <Transactions />
        </section>
        <section className="overview-page-right-col">
          <Budgets />
          <RecurringBills />
        </section>
      </div>
    </main>
  );
}

export default Overview;
