import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.config';
class User extends Model {
  declare id: number;
  declare name: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING
  }
}, { sequelize });

sequelize.sync();

export { User };