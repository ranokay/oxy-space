import { UpdatePasswordScreen } from '@oxy-space/app/features/password-reset/update-password/screen'
import { Stack } from 'expo-router'

const Screen = () => {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Update Password',
				}}
			/>
			<UpdatePasswordScreen />
		</>
	)
}

export default Screen
