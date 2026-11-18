import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use the installed TypeScript compiler API: this environment's spawned
  // tsc --showConfig process returns no stdout to Next's CLI checker.
  experimental: { useTypeScriptCli: false },
  cacheComponents: true,
  partialPrefetching: true,
};

export default nextConfig;
