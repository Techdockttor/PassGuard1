const createPassword = require('./createPassword');
const getAllPasswords = require('./getAllPasswords');
const deletePassword = require('./deletePassword');
const updatePasswordStatus = require('./updatePasswordStatus');
const savePasswordToDatabase = require('./savePasswordToDatabase');

module.exports = {
  createPassword,
  getAllPasswords,
  deletePassword,
  updatePasswordStatus,
  savePasswordToDatabase,
};
