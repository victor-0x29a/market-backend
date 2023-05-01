import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { productFace } from "../../types/product.options";
import sequelize from "../index";
import Supplier from "./supplier";

interface supplierConsult {
  name?: string;
}

interface productModel
  extends Model<
    InferAttributes<productModel>,
    InferCreationAttributes<productModel>
  >,
  productFace {
  supplier?: supplierConsult;
}

const Product = sequelize.define<productModel>("product", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  barchar: {
    type: DataTypes.STRING(13),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  breakdownStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  replacement: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  enterprise: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Product.belongsTo(Supplier, {
  foreignKey: "enterprise",
});

//Product.sync({ force: true });

export default Product;
