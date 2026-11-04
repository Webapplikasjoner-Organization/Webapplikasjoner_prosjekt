"use client";

import { createContext, useContext, useState } from "react";
import { SessionUser } from "../auth-types";

type AuthContextData = {
  user: SessionUser | null;
  /*
  isLoading: boolean;
  changeProfilePicture?: (url: string) => void;
  changeUsername?: (newUsername: string) => void;
  changePassword: (newPassword: string) => void;
  deleteAccount: () => void;
  logout: () => void;
  */
  randomNumbers: number[] | [];
  addRandomNumber: (num: number) => void;
  gameIDs: string[];
  addGameID: (id: string) => void;
  removeGameID: (id: string) => void;
};

const AuthContext = createContext<AuthContextData | null>(null);

type AuthProviderProps = {
  user: SessionUser | null;
  randomNumbers: number[] | [];
  gameIDs: string[] | [];
  children: React.ReactNode;
};

export function AuthProvider({
  user,
  randomNumbers: initialRandomNumbers,
  gameIDs: initialGameIDs,
  children,
}: AuthProviderProps) {
  /*
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(user);

  const isLoading = currentUser === null;

  const changeProfilePicture = useCallback((url: string) => {}, []);

  const changeUsername = useCallback(async (newUsername: string) => {
    if (!currentUser) {
      await navigate("/login");
      return;
    }
    if (!currentUser.username) {
      return;
    }
    await userService.update({
      id: currentUser.id,
      category: "username",
      newValue: newUsername,
    });
  }, []);

  const changePassword = useCallback(async (newPassword: string) => {
    if (!currentUser) {
      await navigate("/login");
      return;
    }
    await userService.update({
      id: currentUser.id,
      category: "password",
      newValue: newPassword,
    });
  }, []);

  const deleteAccount = useCallback(async () => {
    if (!currentUser) {
      await navigate("/login");
      return;
    }
    await userService.delete(currentUser.id);
    setCurrentUser(null);
    await navigate("/login");
  }, []);

  const logout = useCallback(async () => {
    setCurrentUser(null);
    await navigate("/");
  }, []);

  const value = {
    user: currentUser,
    isLoading,
    changeProfilePicture,
    changeUsername,
    changePassword,
    deleteAccount,
    logout,
  };
  */
  const [randomNumbers, setRandomNumbers] = useState<number[] | []>(
    initialRandomNumbers ?? [],
  );
  const [gameIDs, setGameIDs] = useState<string[] | []>(initialGameIDs ?? []);

  const addRandomNumber = (num: number) => {
    setRandomNumbers((prev) => (prev ? [...prev, num] : [num]));
  };

  const addGameID = (gameID: string) => {
    setGameIDs((prev) => (prev ? [...prev, gameID] : [gameID]));
  };

  const removeGameID = (gameID: string) => {
    setGameIDs((prev) => (prev ? prev.filter((id) => id !== gameID) : []));
  };

  const value = {
    user: user,
    randomNumbers: randomNumbers,
    addRandomNumber,
    gameIDs: gameIDs,
    addGameID,
    removeGameID,
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
