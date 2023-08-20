import { trpc } from '@oxy-space/app/utils/trpc'
import { H1, Paragraph, YStack } from '@oxy-space/ui'
import { Table } from '@oxy-space/ui/src/table'
import { ReactNode } from 'react'

export const TableScreen = (): ReactNode => {
	const allCars = trpc.car.all.useQuery()
	const isError =
		allCars?.failureReason?.data?.httpStatus !== 200 &&
		allCars?.failureReason?.data?.httpStatus !== undefined

	return (
		<YStack
			flex={1}
			justifyContent='center'
			alignItems='center'
			padding='$4'
			space='$4'
		>
			<H1>🛞 Vehicles Table</H1>
			{allCars.isLoading && <Paragraph>Loading...</Paragraph>}
			{isError && <Paragraph>{allCars.error?.data?.code}</Paragraph>}
			{allCars.data && <Table data={allCars.data} />}
		</YStack>
	)
}
