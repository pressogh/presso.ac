/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['core'],
	compress: true,
	swcMinify: true,
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		})
		config.resolve.fallback = {
			fs: false,
			path: false,
		};

		return config
	}
}

module.exports = nextConfig
