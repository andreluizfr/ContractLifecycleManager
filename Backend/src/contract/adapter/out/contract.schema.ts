import { Model, Schema, Document as MongooseDocument } from 'mongoose';
import { Contract } from 'src/contract/domain/models/contract';

export const ContractSchema = new Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  modifiedAt: {
    type: Date,
    required: false,
  },
  loanDate: {
    type: Date,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  loanAmount: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  dailyFine: {
    type: Number,
    required: true
  },
  installments: {
    type: Number,
    required: true
  },
  installmentsPayed: {
    type: Number,
    required: true
  },
  pastDueAmount: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
    /*
    followingList: {
        type: Array,
        required: false,
    }
        */
});

export interface ContractDocument extends Contract, MongooseDocument {}
export interface ContractModel extends Model<ContractDocument> {}