import sequelize from "../index";
import Sequelize, {
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import userAccount from "../../types/user.options";

interface userModelAccount
  extends Model<
      InferAttributes<userModelAccount>,
      InferCreationAttributes<userModelAccount>
    >,
    userAccount {}

const User = sequelize.define<userModelAccount>("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  phone: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

//User.sync({ force: true });

export default User;
