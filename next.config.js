module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
  experimental: {
    // Enables the styled-components SWC transform
    esmExternals: false,
    styledComponents: true,
  },
};
