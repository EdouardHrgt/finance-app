import localDatas from "../datas/localDatas"; // backend offline = fetch datas locally
import { saveToStore, loadFromStore } from "./storage";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchDatas = async (url, method = "GET", data = null) => {
  const storageKey = url;

  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${apiUrl}${url}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Unknown fetch error");
    }

    const res = await response.json();

    saveToStore(storageKey, res);

    return res;
  } catch (error) {
    console.error("Fetch error, using fallback data:", error.message);

    const stored = loadFromStore(storageKey);
    if (stored) return stored;

    if (url in localDatas) return localDatas[url];

    return null;
  }
};

export default fetchDatas;
