export const saveToStore = (label, datas) => {
  try {
    localStorage.setItem(label, JSON.stringify(datas));
  } catch (e) {
    console.error("localStorage error : ", e);
  }
};

export const loadFromStore = (label) => {
  const data = localStorage.getItem(label);
  return data ? JSON.parse(data) : null;
};