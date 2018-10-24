import { Schema, Model, model } from 'mongoose'
import { ITag } from '../types'

export const TagSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
    unique: true
  },
  color: {
    type: String,
    required: true
  }
})

const Tag: Model<ITag> = model<ITag>('Tag', TagSchema)
export default Tag
