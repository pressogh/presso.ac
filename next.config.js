const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
	env: {
		BASE_URL: process.env.BASE_URL,
	},
	webpack(conf) {
		conf.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						svgo: false,
						svgoConfig: {
							plugins: [
								{
									name: "removeRasterImages",
									active: false
								},
								{
									name: "removeRasterImages",
									active: false
								},
								{
									name: "removeStyleElement",
									active: false
								},
								{
									name: "removeUnknownsAndDefaults",
									active: false
								},
								{
									name: "removeViewBox",
									active: false
								}
							],
						},
					},
				},
			],
		});
		// 절대경로
		conf.resolve.modules.push(__dirname);
		return conf;
	},
	staticPageGenerationTimeout: 300,
	images: {
		domains: [
			'www.notion.so',
			'notion.so',
			'images.unsplash.com',
			'pbs.twimg.com',
			'abs.twimg.com',
			's3.us-west-2.amazonaws.com',
			'transitivebullsh.it'
		],
		formats: ['image/avif', 'image/webp'],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
	}
});
