import Sequelize from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(process.env.POSTGREURL, {
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

export default sequelize;
