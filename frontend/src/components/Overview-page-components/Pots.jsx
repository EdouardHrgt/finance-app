import useFetch from "../../hooks/useFetch";
import TitleAndLink from "../../components/TitleAndLink";

function Pots() {
  const { data: pots, loading, error } = useFetch("/api/pots");

  const totalSaved = pots?.reduce((sum, pot) => sum + (pot.total || 0), 0);

  const metrics = pots
    ? pots.slice(0, 4).map((pot) => ({
        label: pot.name,
        value: pot.total,
        theme: pot.theme,
      }))
    : Array(4).fill({ label: "", value: 0, theme: "#ccc" });

  return (
    <div className="transactions-and-pots-container">
      <TitleAndLink title="Pots" link="/pots" />

      <section className="pots-metrics">
        <div className="total-saved">
          <svg
            fill="none"
            height="36"
            viewBox="0 0 28 36"
            width="28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.4375 5.8875v-2.8875c0-.58016-.2305-1.13656-.6407-1.5468-.4102-.41023-.9666-.6407-1.5468-.6407h-12.5c-.58016 0-1.13656.23047-1.5468.6407-.41023.41024-.6407.96664-.6407 1.5468v2.8875c-1.39375.22446-2.66214.93755-3.57823 2.01165-.91608 1.07411-1.420065 2.43915-1.42177 3.85085v17.5c0 1.5747.62556 3.0849 1.73905 4.1984 1.1135 1.1135 2.62373 1.7391 4.19845 1.7391h15c1.5747 0 3.0849-.6256 4.1984-1.7391s1.7391-2.6237 1.7391-4.1984v-17.5c-.0017-1.4117-.5057-2.77674-1.4218-3.85085-.9161-1.0741-2.1845-1.78719-3.5782-2.01165z"
              fill="#277c78"
            />
          </svg>
          <div className="total-saved-txt">
            <p className="tp4-regular">Total Saved</p>
            <p>
              {/* if fetch isnt finished => Spinner is displayed... else if fetch got an error => error message is displayed.. else we inject datas */}
              {loading ? (
                <span className="spinner"></span>
              ) : error ? (
                <span className="error">{error}</span>
              ) : (
                <strong className="tp1">${totalSaved?.toLocaleString()}</strong>
              )}
            </p>
          </div>
        </div>

        <div className="pots-metrics-grid">
          {metrics.map((m, idx) => (
            <div className="pots-metric" key={idx}>
              <div
                className="pots-metric-bar"
                style={{ backgroundColor: m.theme }}
              ></div>
              <div className="pots-metric-txt">
                <h3 className="tp5-regular">
                  {loading ? "Loading..." : error ? "Error" : m.label}
                </h3>
                <p>
                  {/* if fetch isnt finished => Spinner is displayed... else if fetch got an error => error message is displayed.. else we inject datas */}
                  {loading ? (
                    <span className="spinner"></span>
                  ) : error ? (
                    <span className="error">{error}</span>
                  ) : (
                    <strong className="tp4-bold">
                      ${m.value.toLocaleString()}
                    </strong>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Pots;
