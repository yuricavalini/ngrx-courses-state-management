const { exec } = require('child_process');

const script = process.argv[2];

/**
 * Extracts the path from 'src' to the end of the string
 *
 * @param {string} inputString
 * @return {string} The path from 'src' to the end of the string
 */
const getPathFromSrc = inputString => {
  const index = inputString.indexOf('src');
  if (index !== -1) {
    return inputString.slice(index);
  }
  return null; // In case 'src' is not found in the string
};

const files = process.argv
  .slice(3)
  .map(filePath => {
    // ng lint's --lint-file-patterns argument works with defined lintFilePatterns value in angular.json
    return `--lint-file-patterns="${getPathFromSrc(filePath)}"`;
  })
  .join(' ');

exec(
  `npm run ${script} ${files}`,
  (error, stdout) => {
    if (error) {
      console.log(stdout);
      process.exit(1);
    }
  }
);
