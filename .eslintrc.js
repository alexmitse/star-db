module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['react-app', 'airbnb', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 2,
  },
};
