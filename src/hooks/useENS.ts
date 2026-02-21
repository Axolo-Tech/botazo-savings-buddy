import { useState, useEffect } from "react";

const ENS_KEY = "botazo_ens_name";

export const useENS = () => {
  const [ensName, setEnsName] = useState<string>(() => {
    return localStorage.getItem(ENS_KEY) || "";
  });

  useEffect(() => {
    if (ensName) {
      localStorage.setItem(ENS_KEY, ensName);
    }
  }, [ensName]);

  const login = (name: string) => {
    setEnsName(name);
    localStorage.setItem(ENS_KEY, name);
  };

  const logout = () => {
    setEnsName("");
    localStorage.removeItem(ENS_KEY);
  };

  return { ensName, login, logout, isLoggedIn: !!ensName };
};
