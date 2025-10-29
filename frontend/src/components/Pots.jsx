import useFetch from "../hooks/useFetch";

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
      <section className="title-link-wrapper ">
        <h2 className="tp2">Pots</h2>
        <a href="">
          See Details
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
        </a>
      </section>

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
