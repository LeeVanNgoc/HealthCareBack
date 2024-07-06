import { Model, DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB';

class Doctor extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public address!: string;
  public image!: Text;
  public phonenumber!: string;
  public evuluate!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Doctor.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  evuluate: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Doctors',
});

export default Doctor;
