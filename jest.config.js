module.exports = {
    roots: ["<rootDir>/src/"],
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/ts-jest"
    },
    setupFilesAfterEnv: ["<rootDir>/src/jestSetup.ts"],
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{ts,tsx}"],
    coverageDirectory: "<rootDir>/coverage/",
};
