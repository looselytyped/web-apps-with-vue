module.exports = {
  get: jest.fn(() => {
    return Promise.resolve({
      data: [
        {
          id: 1,
          firstName: "Raju",
          lastName: "Gandhi",
          fav: true
        },
        {
          id: 2,
          firstName: "Venkat",
          lastName: "Subramanian",
          fav: false
        }
      ]
    });
  }),
  post: jest.fn(() => Promise.resolve())
};
