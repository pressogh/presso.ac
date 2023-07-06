import withPlaiceholder from '@plaiceholder/next';
import withMDX from '@next/mdx';

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

const withMDXConfig = withMDX({
	extension: /\.mdx?$/,
})


export default withPlaiceholder(withMDXConfig(nextConfig));
