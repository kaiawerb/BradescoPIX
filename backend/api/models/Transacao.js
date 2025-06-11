module.exports = (sequelize, DataTypes) => {
  const Transacao = sequelize.define(
    "Transacao",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      valor: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      data_transacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      descricao: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "Transacoes",
      timestamps: false,
    }
  )

  Transacao.associate = (models) => {
    Transacao.belongsTo(models.Usuario, {
      as: "origem",
      foreignKey: "origem_id",
    })
    Transacao.belongsTo(models.Usuario, {
      as: "destino",
      foreignKey: "destino_id",
    })
  }

  return Transacao
}
