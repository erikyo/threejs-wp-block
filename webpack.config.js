const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const CopyPlugin = require( 'copy-webpack-plugin' );

module.exports = {
	...defaultConfig,
	entry: {
		'threejs-block': path.resolve( process.cwd(), `src/index.tsx` ),
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.[tjmc]sx?$/,
				use: [ 'babel-loader' ],
				exclude: /node_modules/,
			},
		],
		...defaultConfig.module,
	},
	plugins: [
		...defaultConfig.plugins,
		new CopyPlugin( {
			patterns: [
				{
					from: 'node_modules/three/build/three.module.js',
					to: '[name][ext]',
				},
			],
		} ),
	],
};
