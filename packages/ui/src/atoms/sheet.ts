import { atom, useAtom } from 'jotai'

const sheetOpenAtom = atom(false)

export const useSheetOpen = () => {
	return [...useAtom(sheetOpenAtom)] as const
}
