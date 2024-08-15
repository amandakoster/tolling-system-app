// straight from teh jest docs:
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  // Specify the root directory for Jest to start searching for tests
  roots: ["<rootDir>/src"],

  // Transform files before testing using ts-jest for TypeScript and Babel for JSX
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Mock static assets such as CSS or image files
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
    "^sql.js$": "<rootDir>/__mocks__/sql.js", // Mock sql.js if needed
  },

  // Specify the file extensions Jest will look for
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Specify Jest's test environment
  testEnvironment: "jsdom",

  // Collect code coverage information
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],

  // Additional setup files for Jest
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

export default config;
