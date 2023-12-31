import config from '../tamagui.config'
import { ToastViewport } from './toast/ToastViewport'
import { TRPCProvider } from './trpc'
import {
	CustomToast,
	TamaguiProvider,
	TamaguiProviderProps,
	ToastProvider,
} from '@oxy-space/ui'
import { useColorScheme } from 'react-native'
import { Metrics, SafeAreaProvider } from 'react-native-safe-area-context'

export const initialWindowMetrics: Metrics | null = {
	frame: { x: 0, y: 0, width: 0, height: 0 },
	insets: { top: 0, left: 0, right: 0, bottom: 0 },
}

export const Provider = ({
	children,
	...rest
}: Omit<TamaguiProviderProps, 'config'>) => {
	const scheme = useColorScheme()

	return (
		<TamaguiProvider
			config={config}
			disableInjectCSS
			defaultTheme={scheme === 'dark' ? 'dark' : 'light'}
			{...rest}
		>
			<SafeAreaProvider>
				<ToastProvider
					swipeDirection='horizontal'
					duration={6000}
					native={['mobile']}
				>
					<TRPCProvider>{children}</TRPCProvider>
					<CustomToast />
					<ToastViewport />
				</ToastProvider>
			</SafeAreaProvider>
		</TamaguiProvider>
	)
}
