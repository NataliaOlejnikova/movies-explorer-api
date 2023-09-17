const {
  PORT = 3000,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET = '85df5e5679969bf2361cd36e4d67f7f6ed0fd2ee025707ccd3c3b0561d8db658',
} = process.env;

module.exports = {
  PORT,
  DB_URL,
  JWT_SECRET,
};
