const path = require("path");

module.exports = {
  paths: {
    appSrc: path.resolve(__dirname, "ui"),
    appIndexJs: path.resolve(__dirname, "ui/index.tsx"),
  },
  webpack: {
    alias: {
      "@curses": path.resolve(__dirname, "ui/_curses-lib/@curses"),
      "@styles": path.resolve(__dirname, "ui/_styles"),
    },
  },
  jest: {
    configure: (config) => ({
      ...config,
      roots: ["<rootDir>/ui"],
      collectCoverageFrom: ["ui/**/*.{js,jsx,ts,tsx}", "!ui/**/*.d.ts"],
      testMatch: [
        "<rootDir>/ui/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/ui/**/*.{spec,test}.{js,jsx,ts,tsx}",
      ],
      moduleNameMapper: {
        ...config.moduleNameMapper,
        "^@curses/(.*)$": "<rootDir>/ui/_curses-lib/@curses/$1",
        "^@styles/(.*)$": "<rootDir>/ui/_styles/$1",
      },
    }),
  },
};
