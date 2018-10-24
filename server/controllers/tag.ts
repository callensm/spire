import { Request, Response, NextFunction } from 'express'
import { Tag } from '../models'
import { ITag } from '../types'

export async function getTags(_req: Request, res: Response, next: NextFunction) {
  Tag.find({}, (err, tags) => {
    if (err) next(err)
    res.json(tags)
  })
}

export async function findById(req: Request, res: Response, next: NextFunction) {
  if (req.params.id) {
    Tag.findById(req.params.id, (err, tag) => {
      if (err) next(err)
      res.json(tag)
    })
  } else {
    next({ status: 400, err: new Error('No ID value was provided as a URL parameter') })
  }
}

export async function findByText(req: Request, res: Response, next: NextFunction) {
  if (req.params.text) {
    Tag.find({ text: new RegExp(req.params.text, 'i') }, (err, tags) => {
      if (err) next(err)
      res.json(tags)
    })
  } else {
    next({ status: 400, err: new Error('No text value was provided as a URL parameter') })
  }
}

export async function createTag(req: Request, res: Response, next: NextFunction) {
  const newTag: ITag = new Tag(req.body)
  newTag.save((err, tag) => {
    if (err) next(err)
    res.json(tag)
  })
}
