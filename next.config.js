const withPWA = require("next-offline");
const withTM = require("next-transpile-modules")(["styled-components"]);
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([withTM, withPWA], {
  devIndicators: {
    autoPrerender: false,
  },
});
