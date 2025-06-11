module.exports = (sequelize, DataTypes) => {
  const Denuncia = sequelize.define(
    "Denuncia",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      valor_roubado: {
        type: DataTypes.DECIMAL(12, 2),
      },
      data_denuncia: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "Denuncias",
      timestamps: false,
    }
  )

  Denuncia.associate = (models) => {
    Denuncia.belongsTo(models.Usuario, {
      as: "denunciado",
      foreignKey: "id_denunciado",
    })
    Denuncia.belongsTo(models.Usuario, {
      as: "denunciante",
      foreignKey: "id_denunciante",
    })
  }

  return Denuncia
}
