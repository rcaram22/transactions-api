import { Schema, model, Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';

class UserModel {
  private _userSchema: Schema<User>;
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
        password: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
        versionKey: false,
      }
    );

    // 🔒 Hash password before saving
    this._userSchema.pre('save', async function (next) {
      if (!this.isModified('password')) return next(); // Skip if password hasn't changed

      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
      } catch (error) {
        next(error as Error);
      }
    });

    this._userModel = model('User', this._userSchema);
  }
}

export default new UserModel().userModel;
