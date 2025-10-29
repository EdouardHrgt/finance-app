import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const { data, loading, error } = useFetch("/api/transactions");

  return (
    <TransactionsContext.Provider value={{ transactions: data, loading, error }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
