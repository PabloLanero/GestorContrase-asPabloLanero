'use strict';
let iconos = ["0x1F9F8","0x26a1","0x26d4","0x1F607","0x1F608","0x1F697","0x1F929","0x1F914"]
const { faker } = require('@faker-js/faker');


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
   let categories = Array(10).fill(0).map( (v,idx) => ({
    // id: idx,
    name: faker.company.bsNoun(),
    icon: iconos[Math.round(Math.random()*iconos.length)],
    createdAt: new Date(),
    updatedAt: new Date(),
   }))


   await queryInterface.bulkInsert('Categories', categories)
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
