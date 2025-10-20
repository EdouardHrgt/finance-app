/*
├─ budgets (ARRAY OF OBJ)
│   ├─ category : string
│   ├─ maximum : number
│   └─ theme : string (hex couleur)
*/
const budgets = [
  {
    category: "Entertainment",
    maximum: 50.0,
    theme: "#277C78",
  },
  {
    category: "Bills",
    maximum: 750.0,
    theme: "#82C9D7",
  },
  {
    category: "Dining Out",
    maximum: 75.0,
    theme: "#F2CDAC",
  },
  {
    category: "Personal Care",
    maximum: 100.0,
    theme: "#626070",
  },
];

module.exports = budgets;