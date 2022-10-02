import { Sequelize } from "sequelize";
import { env } from "../env/server";

const sequelize = new Sequelize(env.DATABASE_URL);

const initSql = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
initSql();
export default sequelize;
