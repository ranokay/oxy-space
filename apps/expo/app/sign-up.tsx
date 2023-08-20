import { SignUpScreen } from '@oxy-space/app/features/sign-up/screen'
import { Stack } from 'expo-router'

const Screen = () => {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Sign Up',
				}}
			/>
			<SignUpScreen />
		</>
	)
}

export default Screen
