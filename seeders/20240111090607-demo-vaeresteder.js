'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Vaeresteders', [{
      navn: 'Cafe Sankt Lukas',
      adresse: 'Sankt Lukas Kirke, Christian den 4. gade 1',
      bydel: 'Indre By',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Vaeresteders', null, {});
  }
};
