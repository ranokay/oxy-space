import '@tamagui/core/reset.css'
import '@tamagui/font-inter/css/400.css'
import '@tamagui/font-inter/css/700.css'
import 'raf/polyfill'

import { Provider, initialWindowMetrics } from '@oxy-space/app/provider'
import { trpc } from '@oxy-space/app/utils/trpc/index.web'
import {
	type Session,
	createPagesBrowserClient,
} from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { NextThemeProvider, useRootTheme } from '@tamagui/next-theme'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactNode, useMemo, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SolitoImageProvider } from 'solito/image'

if (process.env.NODE_ENV === 'production') {
	require('../public/tamagui.css')
}

const imageURL = process.env.NEXT_PUBLIC_APP_URL as
	| `http:${string}`
	| `https:${string}`

const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useRootTheme()

	return (
		<NextThemeProvider
			onChangeTheme={(next) => {
				setTheme(next as typeof theme)
			}}
		>
			<Provider defaultTheme={theme}>
				<SolitoImageProvider
					loader={({ quality, width, src }) => {
						return `${imageURL}${src}?w=${width}&q=${quality}`
					}}
				>
					<SafeAreaProvider initialMetrics={initialWindowMetrics}>
						{children}
					</SafeAreaProvider>
				</SolitoImageProvider>
			</Provider>
		</NextThemeProvider>
	)
}

const MyApp = ({
	Component,
	pageProps,
}: AppProps<{ initialSession: Session | null }>) => {
	const [supabaseClient] = useState(() => createPagesBrowserClient())

	const contents = useMemo(() => {
		return <Component {...pageProps} />
	}, [Component, pageProps])

	return (
		<>
			<Head>
				<title>OXY Space</title>
				<meta name='description' content='Tamagui, Solito, Expo & NextJs' />
				<link rel='icon' href='/favicon.ico' />
				<style>{`
          body, #root, #__next {
            min-width: 100% !important;
          }
        `}</style>
			</Head>

			<ThemeProvider>
				<SessionContextProvider
					supabaseClient={supabaseClient}
					initialSession={pageProps.initialSession}
				>
					{contents}
				</SessionContextProvider>
			</ThemeProvider>
		</>
	)
}

export default trpc.withTRPC(MyApp)
