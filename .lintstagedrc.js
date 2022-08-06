const path = require('path');

module.exports = {
  './src/**/*' : (filenames) => [
    `next lint --fix --file ${filenames
      .map((file) => path.relative(process.cwd(), file))
      .join(' --file ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],
};
