"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkDelete("Cotisants", null, {});
    return queryInterface.bulkInsert("Cotisants", [
      {
        nom: "De Riv",
        prenom: "Geralt",
        sexe: "M",
        telMobile: "00 11 22 33 44",
        email: "geralt.de_riv@gmail.tem",
        dateNaissance: new Date(),
        lieuNaissance: "Kaedwen",
        nationalite: "Temeri",
        promotion: "100-300",
        dateCotisation: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Cotisants", null, {});
  },
};
