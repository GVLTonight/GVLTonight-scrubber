// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    node: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'airbnb-base',
  // add your custom rules here
  'rules': {
    'no-undef': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow underscore prefix
    'no-underscore-dangle': 0,
    // allow console logs
    'no-console': 0,
    "arrow-body-style": ["error", "as-needed"],
    'no-plusplus': [
      "error", {
        "allowForLoopAfterthoughts": true
      }
    ]
  }
}
