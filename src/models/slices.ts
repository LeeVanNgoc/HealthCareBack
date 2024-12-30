import { Model, DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB';

class Doctor extends Model {
  public id!: number;
  public name!: string;
  public link!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Doctor.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Doctors',
  timestamps: true,
});

export default Doctor;
