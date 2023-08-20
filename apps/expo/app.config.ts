import { ConfigContext, ExpoConfig } from '@expo/config'
import dotenv from 'dotenv'

dotenv.config()

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	extra: {
		eas: {
			projectId: '0d50ff29-b3db-4dcd-bcfa-43ae97127e14',
		},
	},
	owner: process.env.EAS_OWNER,
	plugins: ['expo-router'],
	experiments: {
		tsconfigPaths: true,
		typedRoutes: true,
	},
	platforms: ['ios', 'android'],
	name: 'OxySpace',
	slug: 'oxy-space',
	updates: {
		url: 'https://u.expo.dev/85fc6ccd-0ce1-4e4d-804c-b15df989f97e',
	},
	runtimeVersion: {
		policy: 'sdkVersion',
	},
})
