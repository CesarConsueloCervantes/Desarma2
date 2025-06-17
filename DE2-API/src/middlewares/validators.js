const { body } = require('express-validator');
const mongoose = require('mongoose');

function existsInCollection(model, fieldName) {
  return body(fieldName)
    .isMongoId().withMessage(`${fieldName} debe ser un ID válido`)
    .custom(async (value) => {
      const doc = await model.findById(value);
      if (!doc) {
        throw new Error(`${fieldName} no existe en la base de datos`);
      }
      return true;
    });
}

module.exports = { existsInCollection };