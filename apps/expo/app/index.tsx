import { HomeScreen } from '@oxy-space/app/features/home/screen'
import { Stack } from 'expo-router'

const Screen = () => {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Home',
				}}
			/>
			<HomeScreen />
		</>
	)
}

export default Screen
