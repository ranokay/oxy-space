import { PasswordResetScreen } from '@oxy-space/app/features/password-reset/screen'
import { Stack } from 'expo-router'

const Screen = () => {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Reset Password',
				}}
			/>
			<PasswordResetScreen />
		</>
	)
}

export default Screen
