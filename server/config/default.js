module.exports = {
  APP_PORT: process.env.APP_PORT || 3002,
  DB_HOST: process.env.DB_HOST || 'mongodb://:@localhost',
  DB_PORT: process.env.DB_PORT || 27017,
  DB_NAME: process.env.DB_NAME || 'GST'
};
