import { DataFetchingScreen } from '@oxy-space/app/features/data-fetching/screen'
import Head from 'next/head'

const Page = () => {
	return (
		<>
			<Head>
				<title>Data Fetching</title>
			</Head>
			<DataFetchingScreen />
		</>
	)
}

export default Page
