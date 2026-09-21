import { createContext, useContext, useEffect, useState } from "react";
import { content } from "./data";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("qs-lang") || "en");
  const [dark, setDark] = useState(() => localStorage.getItem("qs-theme") === "dark");

  useEffect(() => { localStorage.setItem("qs-lang", lang); }, [lang]);
  useEffect(() => {
    localStorage.setItem("qs-theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <AppContext.Provider value={{ lang, setLang, dark, setDark, t: content[lang] }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
