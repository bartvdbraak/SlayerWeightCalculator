module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: [
		'plugin:vue/essential',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: [
		'vue'
	],
	rules: {
		'max-len': 0,
		'indent': [2, 'tab'],
		'no-tabs': ["error", { allowIndentationTabs: true }],
	    'require-jsdoc': 0,
	    'no-invalid-this': 0,
		'guard-for-in': 0
	}
};
