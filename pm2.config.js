module.exports = {
	apps: [
		{
			name: 'next-app',
			script: './.pnp.cjs',
			args: '.next/standalone/server.js',
			interpreter: 'node',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
