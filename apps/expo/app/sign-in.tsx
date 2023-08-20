import { SignInScreen } from '@oxy-space/app/features/sign-in/screen'
import { Stack } from 'expo-router'

const Screen = () => {
	return (
		<>
			<Stack.Screen
				options={{
					title: 'Sign In',
				}}
			/>
			<SignInScreen />
		</>
	)
}

export default Screen
