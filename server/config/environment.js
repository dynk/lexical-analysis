const appConfig = {
  development: {
    PORT: process.env.PORT || 3020,
    MONGODB_URI: process.env.MONGODB_URI || 'localhost',
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || 'lexical',
    MONGODB_PORT: process.env.MONGODB_PORT || '27017',
    JWT_SECRET: process.env.JWT_SECRET || 'secret123'
  },
  test: {
    PORT: process.env.PORT || 3020,
    MONGODB_URI: process.env.MONGODB_URI || 'localhost',
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || 'test',
    MONGODB_PORT: process.env.MONGODB_PORT || '27017',
    JWT_SECRET: process.env.JWT_SECRET || 'secret123'
  },
  production: {
    PORT: process.env.PORT || 3020,
    MONGODB_URI: process.env.MONGODB_URI || 'localhost',
    MONGODB_DATABASE_NAME: process.env.MONGODB_DATABASE_NAME || 'lexical',
    MONGODB_PORT: process.env.MONGODB_PORT || '27017',
    JWT_SECRET: process.env.JWT_SECRET || 'secret123'
  }
};

module.exports = {
  appConfig
};