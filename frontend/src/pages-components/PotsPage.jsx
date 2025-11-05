function PotsPage() {
  return (
    <main className="pots-page page">
      <div className="pots-page-title-wrapper">
        <h1 className="tp1" id="pots-title">
          Pots
        </h1>
        <button>
          <p className="tp4-bold">+ Add New Pot</p>
        </button>
      </div>
      <section className="pots-page-grid">
        <article className="pots-page-pot">
          {/* TITLE BAR IN THE CARD */}
          <div className="pots-page-pot-title">
            <div className="pots-page-circle"></div>
            <h2 className="tp2 p-dark">Savings</h2>
            <img src="../../public/assets/icon-ellipsis.svg" alt="edit" />
          </div>
          {/* METRIX BAR */}
          <div className="pots-page-pot-metrix">
            <div className="pots-page-pot-metrix-amount">
              <p className="tp4-regular p-light">Total Saved</p>
              <p>
                <strong className="tp1 p-dark">$150.00</strong>
              </p>
            </div>
            <div className="pots-page-pot-metrix-gauge-wrapper">
              <div className="pots-page-pot-metrix-gauge"></div>
            </div>
            <div className="pots-page-pot-metrix-percent">
              <p className="tp5-bold p-dark-medium">7.50%</p>
              <p className="tp5-regular p-light">Target of $2,000</p>
            </div>
            <div className="pots-page-pot-metrix-btns">
              <button>
                <p className="tp4-bold p-dark">+Add Money</p>
              </button>
              <button>
                <p className="tp4-bold p-dark">Withdraw</p>
              </button>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default PotsPage;
