import { Schema, Types, model, Model } from "mongoose";
import { Account } from "../interfaces/account.interface";

class AccountModel {
  private _accountSchema: any;
  private _accountModel!: Model<Account>;

  get accountModel() {
    return this._accountModel;
  }

  constructor() {
    this._accountSchema = new Schema<Account>(
      {
        owner: {
          type: Types.ObjectId,
          ref: "User",
          required: true,
        },
        currency: {
          type: Types.ObjectId,
          ref: "Currency",
          required: true,
        },
        balance: {
          type: Number,
          required: true,
        },
      },
      {
        timestamps: true,
        versionKey: false,
      }
    );

    this._accountModel = model("Account", this._accountSchema);
  }
}

export default new AccountModel().accountModel;
