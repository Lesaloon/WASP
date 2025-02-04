import { Model, QueryInterface } from "sequelize";
import { User } from "../models/user/user.model";
import bcrypt from "bcryptjs";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: any) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const saltRounds = 10;
    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@example.com',
        password: bcrypt.hashSync('adminpassword', saltRounds),
        firstName: 'Admin',
        lastName: 'User',
        role: ['user', 'writer', 'admin'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'user@example.com',
        password: bcrypt.hashSync('userpassword', saltRounds),
        firstName: 'Regular',
        lastName: 'User',
        role: ['user'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'writer@example.com',
        password: bcrypt.hashSync('writerpassword', saltRounds),
        firstName: 'Writer',
        lastName: 'User',
        role: ['user', 'writer'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface: QueryInterface, Sequelize: any) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {
      email: ['admin@example.com', 'user@example.com', 'writer@example.com']
    }, {});
  }
};
