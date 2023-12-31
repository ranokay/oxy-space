import { supabase } from '../supabase'
import type { AppRouter } from '@oxy-space/api/src/router'
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

const getBaseUrl = () => {
	return `${process.env.NEXT_PUBLIC_API_URL}`
}

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
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
		}
	},
	ssr: false,
})

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
