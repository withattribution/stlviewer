import resolve from '@rollup/plugin-node-resolve'; // locate and bundle dependencies in node_modules (mandatory)
import { terser } from "rollup-plugin-terser"; // code minification (optional)

export default {
	input: 'src/stl-viewer.js',
	output: [
		{
			format: 'umd',
			name: 'STL',
			file: 'build/stlviewer.js'
		}
	],
	plugins: [ 
		resolve(),
		terser()
	]
};