import type { NextConfig } from "next";
import withPWA from "next-pwa";
import withNextIntl from "next-intl/plugin"; 
const baseConfig: NextConfig = {
  outputFileTracingRoot: __dirname,

  serverExternalPackages: ["typeorm", "pg"],



  webpack: (config) => {
    const externalsObj = {
      "pg-native": "commonjs pg-native",
      mysql: "commonjs mysql",
      "react-native-sqlite-storage": "commonjs react-native-sqlite-storage",
      "@sap/hana-client/extension/Stream": "commonjs @sap/hana-client/extension/Stream",
    };
    if (Array.isArray(config.externals)) {
      config.externals.push(externalsObj);
    } else if (config.externals) {
      config.externals = [config.externals, externalsObj];
    } else {
      config.externals = [externalsObj];
    }
    return config;
  },
};

const withPwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

export default withNextIntl()(withPwa(baseConfig));
