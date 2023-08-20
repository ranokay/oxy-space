import { InfiniteListScreen } from '@oxy-space/app/features/infinite-list/screen'
import { Stack } from 'expo-router'

const Screen = () => {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Infinite List',
				}}
			/>
			<InfiniteListScreen />
		</>
	)
}

export default Screen
