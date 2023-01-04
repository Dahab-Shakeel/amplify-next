/* eslint-env node */
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "https://api.dev.andromeda.sibel.health/:slug*",
      },
    ];
  },
};
