import { Schema, Document as MongooseDocument, Model } from 'mongoose';
import { User } from 'src/user/domain/models/user';

export const UserSchema = new Schema<User>({
  createdAt: {
    type: Date,
    required: false
  },
  modifiedAt: {
    type: Date,
    required: false
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

export interface UserDocument extends User, MongooseDocument {}
export interface UserModel extends Model<UserDocument> {}