'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Utilisateurs', null, {});
    return queryInterface.bulkInsert('Utilisateurs', [{
      nomUtilisateur: 'gege2riv',
      estActive: false,
      derniereConnexion: new Date(),
      motDePasse: 'Ciri',
      // idCotisant: 1, Ne fonctionne pas pour le moment 
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete('Utilisateurs', null, {});
  }
};
