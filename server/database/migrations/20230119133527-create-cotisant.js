"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cotisants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nom: {
        type: Sequelize.STRING,
      },
      prenom: {
        type: Sequelize.STRING,
      },
      sexe: {
        type: Sequelize.STRING,
      },
      telMobile: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      dateNaissance: {
        type: Sequelize.DATEONLY,
      },
      lieuNaissance: {
        type: Sequelize.STRING,
      },
      nationalite: {
        type: Sequelize.STRING,
      },
      promotion: {
        type: Sequelize.STRING,
      },
      dateCotisation: {
        type: Sequelize.DATEONLY,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cotisants");
  },
};
