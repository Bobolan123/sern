'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
      */
    await queryInterface.bulkInsert('Users', [
        {
          email: 'John Doe',
          password: '123',
          username: 'Fake1'
        }, 
        {
          email: 'John Doe2',
          password: '123',
          username: 'Fake2'
        }, 
        {
          email: 'John Doe3',
          password: '123',
          username: 'Fake3'
        }, 
        
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
