module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: 'codex',
  globals: {
    __static: true,
  },
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
