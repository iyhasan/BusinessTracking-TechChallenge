import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { UserType } from './types/user'

export interface AuthState {
    isAuthenticated: boolean,
    token: string | null | undefined
    login: () => void,
    logout: () => void,
}

export interface UserStoreType {
    user: UserType | null | undefined,
}

export const authStore = create<AuthState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            token: null,
            login: () => set(() => ({isAuthenticated: true})),
            logout: () => set(() => ({isAuthenticated: false, token: null})),
        }),
        {
            name: 'auth-storage'
        }
    )
)

export const userStore = create<UserStoreType>()(
    persist((set) => ({
        user: null
    }), {name: 'user-storage'})
)