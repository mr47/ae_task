const loadModel = ({ name, model, db }) => { db[name] = model };

module.exports.loadModels = (models, db) => models.forEach((entity) => loadModel({
  name: entity.name,
  model: entity.model,
  db
}))

module.exports.createAssociations = (db) => {
  console.log('Making Associations between Models...');
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) { db[modelName].associate(db); }
  });
};
