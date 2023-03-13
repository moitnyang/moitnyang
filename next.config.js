/** @type {import('next').NextConfig} */

const path = require('path'); // 1. path 선언

const nextConfig = {
 /*  basePath: "/{https://github.com/moitnyang/moitnyang.git}", */
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles/_variables.scss"; @import "styles/_mixins.scss";`,
  
  },
};

module.exports = nextConfig;
