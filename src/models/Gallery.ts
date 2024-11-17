import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/databaseConfig";

class Gallery extends Model {
  public id!: number;
  public event!: string;
  public description!: string;
  public images!: string[];
}

Gallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Gallery",
    tableName: "galleries",
    timestamps: false,
  }
);

export default Gallery;
