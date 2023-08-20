import { FlashList } from '@shopify/flash-list'
import { ReactElement, ReactNode } from 'react'
import { useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface Props {
	data: Record<string, unknown>[]
	renderItem: (item: Record<string, unknown>) => ReactElement
	itemHeight: number
}

export const VirtualList = ({
	data,
	renderItem,
	itemHeight,
}: Props): ReactNode => {
	const { top, bottom } = useSafeAreaInsets()
	const scheme = useColorScheme()
	const isLight = scheme === 'light'

	return (
		<FlashList
			data={data}
			contentContainerStyle={{
				backgroundColor: !isLight ? '#000' : '#fff',
				paddingTop: top,
				paddingBottom: bottom,
			}}
			renderItem={({ item }) => renderItem(item)}
			estimatedItemSize={itemHeight}
		/>
	)
}
