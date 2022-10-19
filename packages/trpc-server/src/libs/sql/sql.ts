import { Sequelize } from "sequelize";
import { env } from "../../env/server";
// models
import User from "./models/user.model";
const sequelize = new Sequelize(env.DATABASE_URL);

const initSql = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  User.sync({ alter: env.NODE_ENV === "development" });
};
initSql();
export default sequelize;
