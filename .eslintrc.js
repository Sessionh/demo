/**
 * https://eslint.org/docs/user-guide/configuring
 * eslint-loader 配置
 * copy from https://github.com/vuejs-templates/webpack
 */



module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  rules: {
    "indent": ["error", 2],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "no-console": "error",
    "arrow-parens": 0
  }
  // root: true,
  // parserOptions: {
  //   parser: 'babel-eslint'
  // },
  // env: {
  //   browser: true,
  // },
  // extends: [
  //   // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  //   // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  //   'plugin:vue/essential',
  //   // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  //   'standard'
  // ],
  // // required to lint *.vue files
  // plugins: [
  //   'vue'
  // ],
  // // add your custom rules here
  // rules: {
  //     // allow async-await
  //     'generator-star-spacing': 'off',
  //     // allow debugger during development
  //     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //     "indent": ["error", 4, { "SwitchCase": 1 }],
  //     "quotes": ["error", "single"],
  //     "semi": ["error", "always"],
  //     "no-console": ["error"],
  //     "no-empty": 2,
  //     "no-eq-null": 2,
  //     "no-new": 0,
  //     "no-fallthrough": 0,
  //     "no-unreachable": 0
  // }
}
