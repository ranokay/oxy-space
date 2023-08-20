import { Provider } from '@oxy-space/app/provider'
import { supabase } from '@oxy-space/app/utils/supabase'
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import Constants from 'expo-constants'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { SolitoImageProvider } from 'solito/image'

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from 'expo-router'

const url = `http://${Constants.expoConfig?.hostUri?.split(':')[0]}:3000`

const imageURL = url as `http:${string}` | `https:${string}`

// const imageURL = process.env.NEXT_PUBLIC_APP_URL as `http:${string}` | `https:${string}`

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
	const colorScheme = useColorScheme()

	const [loaded, error] = useFonts({
		Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
		InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
	})

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error
	}, [error])

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<SessionContextProvider supabaseClient={supabase}>
			<Provider>
				<SolitoImageProvider nextJsURL={imageURL}>
					<ThemeProvider
						value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
					>
						<Stack />
					</ThemeProvider>
				</SolitoImageProvider>
			</Provider>
		</SessionContextProvider>
	)
}

export default RootLayout
