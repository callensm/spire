import { Schema, Model, model } from 'mongoose'
import { IUser } from '../types'

export const UserSchema: Schema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    unique: true
  },
  githubId: {
    type: String,
    unique: true
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  snippets: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

const User: Model<IUser> = model<IUser>('User', UserSchema)
export default User
