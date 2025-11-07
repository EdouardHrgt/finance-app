export const formatDate = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatMonthlyDate = (dateString) => {
  if (!dateString) return "";

  const d = new Date(dateString);
  const day = d.getDate();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `Monthly-${day}${suffix}`;
};

export const formatAmount = (value, raw = false) => {
  if (value == null) return "N/A";

  const str = String(value).trim();
  const isNegative = str.startsWith("-");
  const num = Math.abs(Number.parseFloat(str));
  if (!Number.isFinite(num)) return "N/A";

  const formatted = num.toFixed(2);
  if (raw) return "$" + formatted;
  return (isNegative ? "-" : "+") + "$" + formatted;
};


export function getDayFromISODate(isoDate) {
  const date = new Date(isoDate);
  return date.getUTCDate();
}
