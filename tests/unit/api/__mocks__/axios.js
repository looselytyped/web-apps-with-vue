export default {
  get: jest.fn(),
  put: jest.fn(() => Promise.resolve()),
  patch: jest.fn(() => Promise.resolve()),
  post: jest.fn(() => Promise.resolve())
};
