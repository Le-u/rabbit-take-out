/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	extends: [
		'plugin:vue/vue3-essential', // 类型扩展
		'eslint:recommended', // eslint 官方内置规则
		'@vue/eslint-config-prettier', // 关闭 eslint prettier 冲突规则
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'no-func-assign': 2, // 禁止重复的函数声明
		'no-redeclare': 2, // 禁止重复声明变量
		eqeqeq: 2, // 必须使用全等
		'vars-on-top': 2, // var 必须放在函数表达式顶部
		'spaced-comment': [2, 'always'], // 注释后空格一致
	},
};
