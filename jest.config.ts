import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/**",
    "!<rootDir>/src/**/*-protocols.ts",
    "!**/protocols/**",
    "!**/test/**",
    "!**/domain/models/**",
    "!**/domain/usecases/**",
    "!**/helpers/index.ts",
  ],
  coverageDirectory: "coverage",
  preset: "@shelf/jest-mongodb",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};

export default config;
