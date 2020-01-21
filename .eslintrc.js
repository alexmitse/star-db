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
    'react/prop-types': 0,
    'react-hooks/exhaustive-deps': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
  },
};
