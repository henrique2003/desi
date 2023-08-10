import { Schema, model, Document } from 'mongoose'

export interface IProprieties extends Document {
  username: string
  password: string
}

const ProprietiesSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  coordinator: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  mapsLoc: {
    type: String,
    required: true,
    trim: true
  },
  dorms: {
    type: String,
    required: true,
    trim: true
  },
  suites: {
    type: String,
    required: true,
    trim: true
  },
  area: {
    type: String,
    required: true,
    trim: true
  },
  parkingSpaces: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  material: {
    type: String,
    required: true,
    trim: true
  },
  commission: {
    type: String,
    required: true,
    trim: true
  },
  images: [{
    type: String,
    required: true,
    trim: true
  }]
}, {
  timestamps: true
})

export default model<IProprieties>('Proprieties', ProprietiesSchema)