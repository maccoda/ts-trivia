const rewireMobX = require('react-app-rewire-mobx');
const rewireTypescript = require('react-app-rewire-typescript');
module.exports = function override(config, env) {
  rewireMobX(config, env);
  rewireTypescript(config, env);
  return config;
};
