import { create } from 'zustand'

export interface AuthState {
    isAuthenticated: boolean,
    login: () => void,
    logout: () => void,
}

export const authStore = create<AuthState>()((set) => ({
    isAuthenticated: false,
    login: () => set(() => ({isAuthenticated: true})),
    logout: () => set(() => ({isAuthenticated: false})),
  }))