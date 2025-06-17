// utils/history.ts
export const saveSearchHistory = (query) => {
  const raw = localStorage.getItem("search_history");
  let history = raw ? JSON.parse(raw) : [];

  // Simpan unik dan maksimal 10 item terakhir
  if (!history.includes(query)) {
    history.push(query);
    if (history.length > 10) history.shift();
    localStorage.setItem("search_history", JSON.stringify(history));
  }
};

export const loadSearchHistory = () => {
  const raw = localStorage.getItem("search_history");
  return raw ? JSON.parse(raw) : [];
};
