import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/databaseConfig";

class TeamMember extends Model {
  public id!: number;
  public firstName!: string;
  public secondName!: string;
  public role!: string;
  public image!: string;
}

TeamMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    secondName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "TeamMember",
    tableName: "team_members",
    timestamps: false,
  }
);

export default TeamMember;
