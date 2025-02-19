// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Global Mock
jest.mock("@chakra-ui/core", () => {
  const modules = jest.requireActual("@chakra-ui/core");
  return {
    __esModule: true,
    ...modules,
    useColorMode: jest.fn(),
    useTheme: jest.fn(),
  };
});
