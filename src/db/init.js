import TokenModel from '../Model/Token/token.js';
import UserModel from '../Model/User/index.js';
import sequelize from './config.js';

const syncDB = async () => {
  //   await sequelize.sync({ alter: true, force: false });
  await UserModel.sync({ alter: true, force: false });
  await TokenModel.sync({ alter: true, force: false });
};

export default syncDB;
