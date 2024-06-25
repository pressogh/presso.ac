module.exports = {
	apps: [
		{
			name: 'next-app',
			script: './.pnp.cjs',
			args: 'node server.js',
			interpreter: 'node',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
