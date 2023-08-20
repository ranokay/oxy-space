import type { User } from '@supabase/supabase-js'
import { atom, useAtom } from 'jotai'

const userAtom = atom<User | null>(null)

export const useSupabaseUser = () => {
	return [...useAtom(userAtom)] as const
}

const userLoadingAtom = atom(true)

export const useUserLoading = () => {
	return [...useAtom(userLoadingAtom)] as const
}
