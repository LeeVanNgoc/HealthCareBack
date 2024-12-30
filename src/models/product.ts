import { Model, DataTypes } from 'sequelize';
import sequelize from '../configs/connectDB';

class Product extends Model {
  public id!: number;
  public name!: string;
  public title!: string;
  public size!: string;
  public color!: string;
  public material!: string;
  public quantity!: number;
  public price!: string;
  public supplier!: string;
  public image!: string;  

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  material: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  supplier: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Products',
});

export default Product;
