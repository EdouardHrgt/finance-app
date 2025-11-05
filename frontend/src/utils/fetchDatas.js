// src/utils/fetchDatas.js
import localDatas from "../datas/localDatas";
import { saveToStore, loadFromStore } from "./storage";

const apiUrl = import.meta.env.VITE_API_URL;
const AVATAR_PUBLIC_PATH = "/assets/images/avatar";

const normalizeAvatars = (datas) => {
  if (!datas) return datas;
  const fix = (path) => {
    if (!path || typeof path !== "string") return path;
    const filename = path.split("/").pop();
    return `${AVATAR_PUBLIC_PATH}/${filename}`;
  };

  if (Array.isArray(datas)) {
    return datas.map((d) =>
      d.avatar ? { ...d, avatar: fix(d.avatar) } : d
    );
  }

  if (typeof datas === "object") {
    const copy = { ...datas };
    for (const key of Object.keys(copy)) {
      if (Array.isArray(copy[key])) copy[key] = normalizeAvatars(copy[key]);
    }
    return copy;
  }
  return datas;
};

const fetchDatas = async (url, method = "GET", data = null) => {
  const key = url.startsWith("/") ? url : `/${url}`;
  try {
    const res = await fetch(`${apiUrl}${url}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null,
    });

    if (!res.ok) throw new Error("Network response not ok");
    const json = await res.json();

    const normalized = normalizeAvatars(json);
    saveToStore(key, normalized);
    return normalized;
  } catch (err) {
    console.warn("Backend offline, fallback to local or LS:", err.message);

    const stored = loadFromStore(key);
    if (stored) return normalizeAvatars(stored);

    if (key in localDatas) {
      const normalized = normalizeAvatars(localDatas[key]);
      saveToStore(key, normalized);
      return normalized;
    }

    return [];
  }
};

export default fetchDatas;
