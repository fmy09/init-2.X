// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': [0, {
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none"
    }],
    // 关闭语句强制分号结尾
    'semi': [0],
    // 空行最多不能超过50行
    'no-multiple-empty-lines': [0, {'max': 50}],
    // 关闭禁止混用tab和空格
    'no-mixed-spaces-and-tabs': [0],
    // 注释风格不要有空格
    'spaced-comment': 0,
    // 连续声明
    'one-var': 0,
    // 一行结束后面不要有空格
    'no-trailing-spaces': 0,
    // 允许三目运算、短路
    'no-unused-expressions': 0
  }
}
