module.exports = (api) => {
	api.cache(true)
	return {
		presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
		plugins: [
			require.resolve('expo-router/babel'),
			[
				'module:react-native-dotenv',
				{
					moduleName: '@env',
					path: '../../.env',
					allowlist: [
						'NEXT_PUBLIC_SUPABASE_URL',
						'NEXT_PUBLIC_SUPABASE_ANON_KEY',
					],
					safe: false,
					allowUndefined: true,
				},
			],
			[
				require.resolve('babel-plugin-module-resolver'),
				{
					root: ['../..'],
					alias: {
						// define aliases to shorten the import paths
						'@oxy-space/app': '../../packages/app',
						'@oxy-space/api': '../../packages/api',
						'@oxy-space/ui': '../../packages/ui',
					},
					extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
				},
			],
			// if you want reanimated support
			// 'react-native-reanimated/plugin',
			...(process.env.EAS_BUILD_PLATFORM === 'android'
				? []
				: [
						[
							'@tamagui/babel-plugin',
							{
								components: ['@oxy-space/ui', 'tamagui'],
								config: './tamagui.config.ts',
							},
						],
				  ]),
			[
				'transform-inline-environment-variables',
				{
					include: 'TAMAGUI_TARGET',
				},
			],
			'jotai/babel/plugin-react-refresh',
		],
	}
}
