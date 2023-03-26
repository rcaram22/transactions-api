import { Schema, Types, model, Model } from "mongoose";
import { Transaction } from "../interfaces/transaction.interface";

class TransactionModel {
  private _transactionSchema: any;
  private _transactionModel!: Model<Transaction>;

  get transactionModel() {
    return this._transactionModel;
  }

  constructor() {
    this._transactionSchema = new Schema<Transaction>(
      {
        accountFrom: {
          type: Types.ObjectId,
          ref: "Account",
          required: true,
        },
        accountTo: {
          type: Types.ObjectId,
          ref: "Account",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        currency: {
          type: Types.ObjectId,
          ref: "Currency",
          required: true,
        },
      },
      {
        timestamps: true,
        versionKey: false,
      }
    );

    this._transactionModel = model("Transaction", this._transactionSchema);
  }
}

export default new TransactionModel().transactionModel;
