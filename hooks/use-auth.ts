"use client";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null | undefined>(undefined); // Start with undefined to differentiate between loading and logged out

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user; // Will be undefined initially, then null or user
}
