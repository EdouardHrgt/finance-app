import Balance from "../components/Balance";
import Pots from "../components/Pots";
import Transactions from "../components/Transactions";
import Budgets from "../components/Budgets";
import RecurringBills from "../components/RecurringBills";

function Overview() {
  return (
    <div className="overview-page">
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
    </div>
  );
}

export default Overview;
