import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useUsersStore = create<UsersState>()(
  devtools(
    persist(
      (set, get) => {
        return {
          currentUser: undefined,
          logOut: () => {
            set((state) => ({ ...state, currentUser: undefined }));
          },
          setCurrentUser: (payload: UserFromServer) => {
            set((state) => {
              const newUserState = {
                id: payload.userId.toString(),
                expiresAt: new Date(payload.expiresAt),
                token: payload.token,
                tokenHeader: {
                  authorization: "Bearer " + payload.token,
                },
                loggedInAt: new Date(),
              };
              console.log("newUserState:", newUserState);
              return {
                ...state,
                currentUser: newUserState,
              };
            });
          },
          getCurrentUser: () => get().currentUser,
        };
      },
      { name: "usersStore" }
    )
  )
);

interface UsersState {
  currentUser?: AuthenticatedUser;
  logOut: () => void;
  setCurrentUser: (userPayload: UserFromServer) => void;
  getCurrentUser: () => AuthenticatedUser | undefined;
}

export interface UserFromServer {
  expiresAt: number;
  expiresIn: number;
  token: string;
  userId: number;
}

interface AuthenticatedUser {
  id: string;
  loggedInAt: Date;
  expiresAt: Date;
  token: string;
  tokenHeader: { authorization: string };
}
