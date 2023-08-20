import { DataFetchingScreen } from '@oxy-space/app/features/data-fetching/screen'
import { Stack } from 'expo-router'

const Screen = () => {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Data Fetching',
				}}
			/>
			<DataFetchingScreen />
		</>
	)
}

export default Screen
