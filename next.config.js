/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset/resource",
    });

    return config;
  },
};
