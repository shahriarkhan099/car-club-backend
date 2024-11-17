import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/databaseConfig";

class News extends Model {
  public id!: number;
  public title!: string;
  public date!: Date;
  public description!: string;
  public image!: string;
  public category!: string;
}

News.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "News",
    tableName: "news",
    timestamps: false,
  }
);

export default News;
