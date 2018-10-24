import { Schema, Model, model } from 'mongoose'
import { ISnippet } from '../types'
import { TagSchema } from './tag'
import User from './user'

export const SnippetSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    default: new Date()
  },
  author: {
    type: Schema.Types.ObjectId,
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
  numberOfFavorites: {
    type: Number,
    default: 0
  },
  tags: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: []
  }
})

SnippetSchema.post('save', (err, doc, next) => {
  if (err) next(err)
  User.updateOne({ _id: (doc as ISnippet).author }, { $push: doc._id })
})

const Snippet: Model<ISnippet> = model<ISnippet>('Snippet', TagSchema)
export default Snippet
