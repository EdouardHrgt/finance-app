import { useState, useEffect } from "react";
import fetchDatas from "../utils/fetchDatas";

const apiUrl = import.meta.env.VITE_API_URL;

function Balance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      try {
        setLoading(true);
        const data = await fetchDatas(`${apiUrl}/api/balance`);

        if (!data) {
          throw new Error("No data received from API");
        }

        setBalance(data);
      } catch (err) {
        console.error("Error fetching balance:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    getBalance();
  }, []);

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
                <span className="error">An error occurred</span>
              ) : (
                <strong className="tp1">${value.toLocaleString()}</strong>
              )}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Balance;
