const { Sequelize } = require('sequelize');
const config = require('../config/config')
require('dotenv').config();

const sequelize = new Sequelize(  /*nome do banco*/  );

try {
  sequelize.authenticate();
  console.log('Usuário autenticado com sucesso');
} catch (error) {
  console.error('Erro de autenticação', error);
}

module.exports = { Sequelize, sequelize };