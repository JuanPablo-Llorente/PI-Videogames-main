const {DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize =>
{
  // defino el modelo
  sequelize.define("Videogame",
  {
    id:
    {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:
    {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platforms:
    {
      type: DataTypes.STRING,
      allowNull: false,
      set(value)
      {
        this.setDataValue("platforms", value.join(", "));
      }
    },
    image:
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdInDb:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  });
};
