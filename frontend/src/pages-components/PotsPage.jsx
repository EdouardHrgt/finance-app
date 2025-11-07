import { loadFromStore } from "../utils/storage";
import { useLocation } from "react-router-dom";
import { formatAmount } from "../utils/formatDateAndAmount";

function PotsPage() {
  const location = useLocation();
  const potsList = loadFromStore(`/api${location.pathname}`) || [];

  const computePercentage = (total, target) => {
    if (!target || target === 0) return "0%";
    const percentage = (total / target) * 100;
    return `${percentage.toFixed(0)}%`;
  };

  return (
    <main className="pots-page page">
      <div className="pots-page-title-wrapper">
        <h1 className="tp1" id="pots-title">
          Pots
        </h1>
        <button>
          <p className="tp4-bold">+ Add New Pot</p>
          <p className="btn-hover-title tp4-bold">Feature not implemented yet</p>
        </button>
      </div>

      <section className="pots-page-grid">
        {potsList.map((pot, idx) => (
          <article className="pots-page-pot" key={idx}>
            {/* TITLE BAR IN THE CARD */}
            <div className="pots-page-pot-title">
              <div
                className="pots-page-circle"
                style={{ backgroundColor: pot.theme }}
              ></div>
              <h2 className="tp2 p-dark">{pot.name}</h2>
              <img src="/assets/icon-ellipsis.svg" alt="edit" />
            </div>

            {/* METRIX BAR */}
            <div className="pots-page-pot-metrix">
              <div className="pots-page-pot-metrix-amount">
                <p className="tp4-regular p-light">Total Saved</p>
                <p>
                  <strong className="tp1 p-dark">
                    {formatAmount(pot.total, "no-sign")}
                  </strong>
                </p>
              </div>

              <div className="pots-page-pot-metrix-gauge-wrapper">
                <div
                  className="pots-page-pot-metrix-gauge"
                  style={{
                    width: computePercentage(pot.total, pot.target),
                    backgroundColor: pot.theme,
                  }}
                ></div>
              </div>

              <div className="pots-page-pot-metrix-percent">
                <p className="tp5-bold p-dark-medium">
                  {computePercentage(pot.total, pot.target)}
                </p>
                <p className="tp5-regular p-light">
                  Target of {formatAmount(pot.target, "no-sign")}
                </p>
              </div>

              <div className="pots-page-pot-metrix-btns">
                <button>
                  <p className="tp4-bold p-dark">+Add Money</p>
                  <p className="btn-hover tp4-bold">
                    Feature not implemented yet
                  </p>
                </button>
                <button>
                  <p className="tp4-bold p-dark">Withdraw</p>
                  <p className="btn-hover tp4-bold">
                    Feature not implemented yet
                  </p>
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default PotsPage;
