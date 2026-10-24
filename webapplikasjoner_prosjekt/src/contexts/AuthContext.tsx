"use client";

import { userService } from "@/features/users/user-service";
import { type User } from "@/types/user";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { navigate } from "rwsdk/client";

type AuthContextData = {
  user: User | null;
  isLoading: boolean;
  changeProfilePicture?: (url: string) => void;
  changeUsername?: (newUsername: string) => void;
  changePassword: (newPassword: string) => void;
  deleteAccount: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    //Call API that gets a user.
    //setUser();
  }, []);

  const isLoading = user === null;

  const changeProfilePicture = useCallback((url: string) => {}, []);

  const changeUsername = useCallback(async (newUsername: string) => {
    if (!user) {
      await navigate("/login");
      return;
    }
    if (!user.username) {
      return;
    }
    await userService.update({
      id: user.id,
      category: "username",
      newValue: newUsername,
    });
  }, []);

  const changePassword = useCallback(async (newPassword: string) => {
    if (!user) {
      await navigate("/login");
      return;
    }
    await userService.update({
      id: user.id,
      category: "password",
      newValue: newPassword,
    });
  }, []);

  const deleteAccount = useCallback(async () => {
    if (!user) {
      await navigate("/login");
      return;
    }
    await userService.delete(user.id);
    setUser(null);
    await navigate("/login");
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await navigate("/");
  }, []);

  const value = {
    user,
    isLoading,
    changeProfilePicture,
    changeUsername,
    changePassword,
    deleteAccount,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
