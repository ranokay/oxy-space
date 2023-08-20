import type { AppRouter } from '@oxy-space/api/src/router'
import { createTRPCReact } from '@trpc/react-query'

import { supabase } from '../supabase/auth'
/**
 * A wrapper for your app that provides the TRPC context.
 */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { ReactNode, useState } from 'react'

/**
 * A set of typesafe hooks for consuming your API.
 */
export const trpc = createTRPCReact<AppRouter>()

const getBaseUrl = () => {
	return process.env.NEXT_PUBLIC_API_URL
}

export const TRPCProvider = ({ children }: { children: ReactNode }) => {
	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					async headers() {
						const { data } = await supabase.auth.getSession()
						const token = data?.session?.access_token

						return {
							Authorization: token ? `Bearer ${token}` : undefined,
						}
					},
					url: `${getBaseUrl()}/trpc`,
				}),
			],
		})
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpc.Provider>
	)
}
