'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Adresses', null, {});
    return queryInterface.bulkInsert('Adresses', [{
      adresse: '66 rue de la paix',
      complementAdresse: 'appt. 10',
      codePostal: 33333,
      pays: 'France',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Adresses', null, {});
  }
};
