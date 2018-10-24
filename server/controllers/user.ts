import { Request, Response, NextFunction } from 'express'
import { IUser } from '../types'
import { User } from '../models'

export async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find().select('-hash')
    res.json({ users })
  } catch (e) {
    next(e)
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    if (await User.findOne({ $or: [{ username: req.body.username, email: req.body.email }] })) {
      throw 'A user with the same username or email already exists'
    }

    const newUser: IUser = new User(req.body)

    const doc = await newUser.save()
    res.json({ user: doc._id })
  } catch (e) {
    next(e)
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const doc = await User.findByIdAndDelete(req.params.id)
    if (doc) res.json({ user: doc._id })
    else throw `No user with ID ${req.params.id} was found`
  } catch (e) {
    next(e)
  }
}

export async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.params.id).select('-hash')
    res.json({ user })
  } catch (e) {
    next(e)
  }
}

export async function findAdmins(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find({ admin: true }).select('-hash')
    res.json({ users })
  } catch (e) {
    next(e)
  }
}
