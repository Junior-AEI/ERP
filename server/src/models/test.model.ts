import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
class Test extends Model {
    declare id: number;
    declare name: string;
    declare description: string;
}

Test.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
    },
    { sequelize }
);

sequelize.sync();

export { Test };
