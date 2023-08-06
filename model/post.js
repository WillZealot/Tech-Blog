const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
  
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    user_id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

Post.updatePost = async function (postId, updatedData) {
  try {
    const result = await Post.update(updatedData, {
      where: {
        id: postId,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = Post;
