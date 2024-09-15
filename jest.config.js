export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  setupFilesAfterEnv: ["<rootDir>/test/unit/setupTest.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass|png)$": "identity-obj-proxy",
    "\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4)$":
      "<rootDir>/test/unit/mocks/FileMock.js",
  },
};
