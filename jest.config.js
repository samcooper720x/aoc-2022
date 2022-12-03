module.exports = {
  testEnvironment: "node",
  modulePaths: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "\\.test\\.(js|ts)$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testPathIgnorePatterns: [
    "/_mocks_/",
    "/node_modules/",
    "/resources/",
    "/dist/",
  ],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts"],
  verbose: true,
};
