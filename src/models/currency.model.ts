import { Schema, model, Model } from 'mongoose';
import { Currency } from '../interfaces/currency.interface';

class CurrencyModel {
  private _currencySchema: any;
  private _currencyModel!: Model<Currency>;

  get currencyModel() {
    return this._currencyModel;
  }

  constructor() {
    this._currencySchema = new Schema<Currency>(
      {
        name: {
          type: String,
          required: true,
        },
        code: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
        versionKey: false,
      }
    );

    this._currencyModel = model('Currency', this._currencySchema);
  }
}

export default new CurrencyModel().currencyModel;
