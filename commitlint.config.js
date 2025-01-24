module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'], // Enforces the presence of a scope,
    'scope-enum': [2, 'always', ['courses-state-management']], // Only allows 'courses-state-management' as scope
  },
};
