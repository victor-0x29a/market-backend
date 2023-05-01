import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import supplierFace from "../../types/supplier.options";
import sequelize from "../index";

interface supplierModel
  extends Model<
    InferAttributes<supplierModel>,
    InferCreationAttributes<supplierModel>
  >,
  supplierFace { }

const Supplier = sequelize.define<supplierModel>("supplier", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  cnpj: {
    type: DataTypes.CHAR(14),
    allowNull: false,
  },
  name: {
    type: DataTypes.CHAR(18),
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER({ length: 9 }),
    allowNull: false,
  },
  email: {
    type: DataTypes.CHAR(48),
    allowNull: true,
  },
});

//Supplier.sync({ force: true });

export default Supplier;
