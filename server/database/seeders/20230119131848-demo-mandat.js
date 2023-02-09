"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkDelete("Mandats", null, {});
    return queryInterface.bulkInsert("Mandats", [
      {
        dateDebut: new Date(10, 10, 2010),
        dateFin: new Date(10, 20, 2015),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Mandats", null, {});
  },
};
