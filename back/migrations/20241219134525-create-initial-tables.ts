import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('Items', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateAcquired: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      priceBought: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "new",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "in_use",
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      warranty: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trackingCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('Weapons', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // ...other weapon attributes...
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subcategory: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      legalCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SIAExpireDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      serialNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "NONE",
      },
      caliberGauge: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      barelLength: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      actionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      countryOfOrigin: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "France",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('Accessories', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // ...other accessory attributes...
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weaponId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Weapons',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('Parts', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // ...other part attributes...
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      compatibleModels: {
        type: DataTypes.TEXT,
      },
      weaponId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Weapons',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('Magazines', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // ...other magazine attributes...
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      caliberGauge: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('Items');
    await queryInterface.dropTable('Weapons');
    await queryInterface.dropTable('Accessories');
    await queryInterface.dropTable('Parts');
    await queryInterface.dropTable('Magazines');
    await queryInterface.dropTable('Users');
  },
};
