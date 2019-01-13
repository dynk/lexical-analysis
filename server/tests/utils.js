

const db = require('../db/mongo');

async function loadFixture(...fixtures) {
  for (const fixture of fixtures) {
    const batch = require(`./fixtures/${fixture}.json`);
    for (const models of batch) {
      for (const modelName in models) {
        const fixedData = models[modelName];
        const modulePath = `../models/${modelName.toLowerCase()}`;
        const cachedModule = require.cache[require.resolve(modulePath)];
        const model = cachedModule ? cachedModule.exports : require(modulePath);
        const promises = fixedData.map(f =>  model.create(f));
        try {
          const result = await Promise.all(promises);
          return Promise.resolve(result);
        }catch (err) {
          return Promise.reject(err);
        }
      }
    }
  }
}

async function dropDBs() {
  const mongo = await db;
  await mongo.connection.dropDatabase();
}

async function closeDBConnection() {
  const mongo = await db;
  await mongo.connection.close();
}


module.exports = {
  loadFixture,
  dropDBs,
  closeDBConnection
};

