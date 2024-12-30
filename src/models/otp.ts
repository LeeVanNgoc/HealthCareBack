import { Model, DataTypes } from "sequelize";
import sequelize from "../configs/connectDB";

class Otp extends Model {
  public id!: number;
  public email!: string;
  public otpCode!: string;
}

Otp.init(
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otpCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "OTPs",
    timestamps: false,
  }
);

export default Otp;
