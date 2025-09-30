declare module "next-pwa" {
  import type { NextConfig } from "next";
  type WithPWA = (config?: {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean | string;
  }) => (nextConfig: NextConfig) => NextConfig;
  const withPWA: WithPWA;
  export default withPWA;
}
