const mongoose = require('mongoose');
require('dotenv').config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const connectDB = async () => {
  const dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
  try {
    await mongoose.connect(dbConnection);
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1); // Exit the process if the database connection fails
  }
};

module.exports = connectDB;