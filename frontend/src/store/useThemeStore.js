import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("streamify") || 'light',
    setTheme : (theme) => set({theme}),
}))