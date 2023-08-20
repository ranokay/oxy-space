import { ParamsScreen } from '@oxy-space/app/features/params/screen'
import { Stack } from 'expo-router'

const Screen = () => {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Params',
				}}
			/>
			<ParamsScreen />
		</>
	)
}

export default Screen
