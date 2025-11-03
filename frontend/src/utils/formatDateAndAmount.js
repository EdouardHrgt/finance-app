export const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatAmount = (value, style) => {
  if (value == null) return "N/A";

  const str = String(value).trim();
  const isNegative = str.startsWith("-");
  const num = Math.abs(Number.parseFloat(str));
  if (!Number.isFinite(num)) return "N/A";

  const formatted = num.toFixed(2);
  return (isNegative ? "-" : "+") + "$" + formatted;
};
