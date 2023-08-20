import { trpc } from '@oxy-space/app/utils/trpc'
import { H1, H2, Paragraph, YStack } from '@oxy-space/ui'

export const DataFetchingScreen = () => {
	const helloWorld = trpc.hello.world.useQuery()
	const protectedRoute = trpc.auth.secretMessage.useQuery()
	const isError =
		protectedRoute?.failureReason?.data?.httpStatus !== 200 &&
		protectedRoute?.failureReason?.data?.httpStatus !== undefined

	return (
		<YStack
			flex={1}
			justifyContent='center'
			alignItems='center'
			padding='$4'
			space='$4'
		>
			<H1>Data Fetching</H1>

			<H2>Public Route</H2>
			{helloWorld.isLoading && <Paragraph>Loading...</Paragraph>}
			{helloWorld.error && (
				<Paragraph>{protectedRoute.error?.data?.code}</Paragraph>
			)}
			{helloWorld.data && !helloWorld.error && (
				<Paragraph>{helloWorld.data}</Paragraph>
			)}

			<H2>Protected Route</H2>
			{protectedRoute.isLoading && !isError && (
				<Paragraph>Loading...</Paragraph>
			)}
			{isError && (
				<Paragraph>{protectedRoute?.failureReason?.message}</Paragraph>
			)}
			{protectedRoute.data && !isError && (
				<Paragraph>{protectedRoute.data}</Paragraph>
			)}
		</YStack>
	)
}
