// /** @type {import('next').NextConfig} */
// // const nextConfig = {}
// const nextConfig = {
//     webpack5: true,
//     webpack: (config) => {
//       config.resolve.fallback = { fs: false };
  
//       return config;
//     },
//   };

// module.exports = nextConfig
module.exports = {
  images: {
    // domains: ['placehold.co'],
    unoptimized: true,

  },

  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },

  // to serve static files
  // output: 'export',
}
