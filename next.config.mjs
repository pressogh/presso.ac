import withPlaiceholder from '@plaiceholder/next';
import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
	compress: false,
	experimental: {
		mdxRs: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "presso.ac"
			},
			{
				protocol: "http",
				hostname: "localhost",
			}
		]
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
	},
	output: "standalone",
	transpilePackages: ["next-mdx-remote"]
}

const withMDXConfig = withMDX({
	extension: /\.mdx?$/,
})


export default withPlaiceholder(withMDXConfig(nextConfig));
