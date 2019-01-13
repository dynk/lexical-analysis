const env = process.env.NODE_ENV || 'development';

const { appConfig } = require('./environment.js');
if (env === 'development' || env === 'test') {
  const envConfig = appConfig[env];
  Object.keys(envConfig).forEach((key) => {
    if(envConfig[key]){
      process.env[key] = envConfig[key];
    }
  });
}
