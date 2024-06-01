
const mysql = jest.createMockFromModule('mysql');

const mockConnection = {
  connect: jest.fn((callback) => {
    callback(new Error('Connection error'));
  }),
};

mysql.createConnection = jest.fn(() => mockConnection);

module.exports = mysql;
