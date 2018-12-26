const Sequelize = require('sequelize');
const cn = require('../common/dbconnection');

const fields = {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    comment: 'Employee id',
  },
  employeeId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'employees',
      key: 'id',
    },
  },
  groupId: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'groups',
      key: 'id',
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
};

const model = cn.define('employees__groups', fields);
model.isEmployeeInGroup = async (employeeId, groupId) => {
  const instance = await cn
    .query(
      `
      SELECT id FROM employees__groups
      WHERE employeeId = :employeeId
      AND groupId = :groupId
      `,
      {
        replacements: {
          employeeId,
          groupId,
        },
        type: cn.QueryTypes.SELECT,
      },
    );
  if (instance.length) {
    return true;
  }
  return false;
};
module.exports = model;
