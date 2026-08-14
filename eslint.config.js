import config from '@bifravst/eslint-config-typescript'
export default [
	...config,
	{
		ignores: [
			'dist/**',
			'export.js',
			'fingerprint/export.js',
			'hello/export.js',
		],
	},
]
