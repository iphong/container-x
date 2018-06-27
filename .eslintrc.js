const path = require('path')

module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		es6: true,
		node: true
	},
	parserOptions: {
        typescript: true,
        sourceType: 'module',
		ecmaVersion: 2017,
	},
	extends: ['react', 'prettier'],
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': [
			1,
			{ singleQuote: true, tabWidth: 4, useTabs: true, semi: false, printWidth: 120 }
		],
		'camelcase': 0,
		'react/sort-comp': 0,
		'no-unused-expressions': 1,
		'react/jsx-no-undef': 2,
		'react/react-in-jsx-scope': 0,
		'one-var': [1, { "initialized": "never" }],
		'no-unused-vars': 1,
		'new-cap': 0,
		'prefer-reflect': 1,
		'no-proto': 1,
		'no-use-before-define': 1,
		'max-nested-callbacks': 1,
		'radix': 1,
		'react/forbid-prop-types': 1,
		'no-empty': 1,
		'no-return-assign': 1,
		'no-nested-ternary': 1,
		'no-void': 1,
		'eqeqeq': 1,
		'react/no-did-update-set-state': 1,
		'no-constant-condition': 1,
		'no-irregular-whitespace': 1,
		'no-script-url': 1
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: path.resolve(__dirname, './webpack.config.js')
			}
		}
	}
}
