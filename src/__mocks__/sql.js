// manual mock for sql.js. Jest allows us to manually mock modules by creating a file in the __mocks__ directory.

const DatabaseMock = jest.fn().mockImplementation(() => ({
  run: jest.fn(),
  exec: jest.fn().mockReturnValue([]),
}));

const initSqlJsMock = jest.fn().mockResolvedValue({
  Database: DatabaseMock,
});

export default initSqlJsMock;