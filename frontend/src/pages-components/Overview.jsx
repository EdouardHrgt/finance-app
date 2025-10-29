import Balance from "../components/Balance";
import Pots from "../components/Pots";
import Transactions from "../components/Transactions";
function Overview() {
  return (
    <div className="overview-page">
      <Balance />
      <Pots />
      <Transactions />
    </div>
  );
}

export default Overview;
