import { Schema, Model, model } from 'mongoose'
import { ISnippet } from '../types'
import User from './user'

export const SnippetSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    default: new Date()
  },
  author: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  numberOfFavorites: {
    type: Number,
    default: 0
  }
})

SnippetSchema.post('save', (err, doc, next) => {
  if (err) next(err)
  User.updateOne({ username: (doc as ISnippet).author }, { $push: doc._id })
})

const Snippet: Model<ISnippet> = model<ISnippet>('Snippet', SnippetSchema)
export default Snippet
