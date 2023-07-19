import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import sequelize from "../index";

import { ClienteFace } from "../../types/client.options";

interface ClienteModelTemplate
  extends Model<
      InferAttributes<ClienteModelTemplate>,
      InferCreationAttributes<ClienteModelTemplate>
    >,
    ClienteFace {}

const Cliente = sequelize.define<ClienteModelTemplate>("clients", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING({ length: 48 }),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.CHAR(12),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(24),
    allowNull: false,
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  complementAddress: {
    type: DataTypes.STRING(24),
    allowNull: true,
  },
});

//Cliente.sync({ force: true });

export default Cliente;
