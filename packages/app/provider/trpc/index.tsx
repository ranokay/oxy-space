import { TRPCProvider as Provider } from '../../utils/trpc'
/* provider for expo, tRPC */
import { ReactNode } from 'react'

export const TRPCProvider = ({ children }: { children: ReactNode }) => {
	return <Provider>{children}</Provider>
}
