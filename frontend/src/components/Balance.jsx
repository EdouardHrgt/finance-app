import useFetch from "../hooks/useFetch";

function Overview() {
  const { data: balance, loading, error } = useFetch("/api/balance");

  const metrics = [
    { label: "Current Balance", value: balance?.current },
    { label: "Income", value: balance?.income },
    { label: "Expenses", value: balance?.expenses },
  ];

  return (
    <div className="overview-wrapper">
      <h1 className="tp1">Overview</h1>
      <section className="metrics">
        {metrics.map(({ label, value }) => (
          <div className="metric" key={label}>
            <h3 className="tp4-regular">{label}</h3>
            <p>
              {loading ? (
                <span className="spinner"></span>
              ) : error ? (
                <span className="error">{error}</span>
              ) : value != null ? (
                <strong className="tp1">${value.toLocaleString()}</strong>
              ) : (
                <span className="error">Data missing</span>
              )}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Overview;
