import { useState, useEffect } from "react";
import fetchDatas from "../utils/fetchDatas";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchDatas(url);

      if (!result) {
        setError("Failed to fetch data");
      } else {
        setData(result);
      }

      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
