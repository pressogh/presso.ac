/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['core'],
	compress: true,
	swcMinify: true,
	experimental: {
		mdxRs: true,
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
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

const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
});
module.exports = withMDX(nextConfig);
