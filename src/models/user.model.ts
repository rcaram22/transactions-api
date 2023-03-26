import { Schema, model, Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

class UserModel {
  private _userSchema: any;
  private _userModel!: Model<User>;

  get userModel() {
    return this._userModel;
  }

  constructor() {
    this._userSchema = new Schema<User>(
      {
        username: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        lastName: {
          type: String,
          required: true,
          trim: true,
        },
      },
      {
        timestamps: true,
        versionKey: false,
      }
    );

    this._userModel = model('User', this._userSchema);
  }
}

export default new UserModel().userModel;
