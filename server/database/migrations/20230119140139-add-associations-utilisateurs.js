"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Utilisateurs", "idCotisant", {
      type: Sequelize.INTEGER,
      references: {
        model: "Cotisants",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Utilisateurs", "idCotisant");
  },
};
