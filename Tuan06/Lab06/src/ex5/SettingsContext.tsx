import React, { createContext, useContext, useMemo, useState } from "react";
 
type Ctx = {
  notify: boolean; dark: boolean;
  setNotify: (v: boolean) => void; setDark: (v: boolean) => void;
};
const SettingsContext = createContext<Ctx | null>(null);
 
export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const value = useMemo(() => ({ notify, dark, setNotify, setDark }), [notify, dark]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}
 
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings phải nằm trong SettingsProvider");
  return ctx;
}
