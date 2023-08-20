import { Car } from '@oxy-space/api/src/db/schema'
import { ReactNode } from 'react'
import { H1, H2, YStack } from 'tamagui'

type Props = {
	data: Car[]
}

export const Table = ({ data }: Props): ReactNode => {
	return (
		<YStack>
			<H1>Work in progress</H1>
			<H2>Fetched {data.length} items</H2>
		</YStack>
	)
}
