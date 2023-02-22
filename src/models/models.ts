import sequelize from '../db';
import { Model, CreationOptional, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  email: CreationOptional<string>;
  password: CreationOptional<string>;
  role: CreationOptional<string>;
}

interface SettingModel extends Model<InferAttributes<SettingModel>, InferCreationAttributes<SettingModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  theme: CreationOptional<number>;
  userId: CreationOptional<number>;
}

interface NoteModel extends Model<InferAttributes<NoteModel>, InferCreationAttributes<NoteModel>> {
  // Some fields are optional when calling UserModel.create() or UserModel.build()
  id: CreationOptional<number>;
  title: CreationOptional<string>;
  description: CreationOptional<string>;
  color: CreationOptional<number>;
  isFixed: CreationOptional<boolean>;
  userId: CreationOptional<number>;
}

export const User = sequelize.define<UserModel>('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

export const Setting = sequelize.define<SettingModel>('setting', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  theme: { type: DataTypes.INTEGER, defaultValue: 0 },
  userId: { type: DataTypes.INTEGER },
});

export const Note = sequelize.define<NoteModel>('note', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  color: { type: DataTypes.INTEGER, defaultValue: 0 },
  isFixed: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.INTEGER },
});

User.hasOne(Setting);
Setting.belongsTo(User);

User.hasMany(Note);
Note.belongsTo(User);

const models = { User, Setting, Note };
export default models;
