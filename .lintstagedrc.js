const path = require('path');

module.exports = {
  './src/**/*': ['eslint --fix --quiet', 'yarn prettier --write']
};
