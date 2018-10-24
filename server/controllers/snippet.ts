import { Request, Response, NextFunction } from 'express'
import { ISnippet } from '../types'
import { Snippet } from '../models'

export async function getSnippets(_req: Request, res: Response, next: NextFunction) {
  Snippet.find({}, (err, snippets) => {
    if (err) next(err)
    res.json(snippets)
  })
}

export async function createSnippet(req: Request, res: Response, next: NextFunction) {
  try {
    const newSnippet: ISnippet = new Snippet(req.body)
    newSnippet.save((err, snippet) => {
      if (err) next(err)
      res.json(snippet)
    })
  } catch (e) {
    next({ status: 500, err: e })
  }
}

export async function deleteSnippet(req: Request, res: Response, next: NextFunction) {
  if (req.params.id) {
    Snippet.findByIdAndDelete(req.params.id, (err, snippet) => {
      if (err) next(err)
      res.json({ deleted: snippet })
    })
  } else {
    next({ status: 400, err: new Error('No ID value was provided as a URL parameter') })
  }
}

export async function findById(req: Request, res: Response, next: NextFunction) {
  if (req.params.id) {
    Snippet.findById(req.params.id, (err, snippet) => {
      if (err) next(err)
      res.json(snippet)
    })
  } else {
    next({ status: 400, err: new Error('No ID value was provided as a URL parameter') })
  }
}

export async function findByTag(req: Request, res: Response, next: NextFunction) {
  if (req.params.id) {
    Snippet.find({ tags: req.params.id }, (err, snippets) => {
      if (err) next(err)
      res.json(snippets)
    })
  } else {
    next({ status: 400, err: new Error('No tag ID value was provided as a URL parameter') })
  }
}

export async function findByLanguage(req: Request, res: Response, next: NextFunction) {
  if (req.params.lang) {
    Snippet.find({ language: req.params.lang }, (err, snippets) => {
      if (err) next(err)
      res.json(snippets)
    })
  } else {
    next({ status: 400, err: new Error('No language parameter was provided in the URL') })
  }
}

export async function findByAuthor(req: Request, res: Response, next: NextFunction) {
  if (req.params.id) {
    Snippet.find({ author: req.params.id }, (err, snippets) => {
      if (err) next(err)
      res.json(snippets)
    })
  } else {
    next({ status: 400, err: new Error('No author ID was provided as a URL parameter') })
  }
}

export async function updateFavorites(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id)
    next({ status: 400, err: new Error('No ID value was provided as a URL parameter') })
  else if (!req.params.op)
    next({ status: 400, err: new Error('No operation was provided as a URL parameter') })
  else {
    Snippet.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { numberOfFavorites: req.params.op === 'add' ? 1 : -1 }
      },
      (err, snippet) => {
        if (err) next(err)
        res.json({ update: snippet })
      }
    )
  }
}

export async function updateTags(req: Request, res: Response, next: NextFunction) {
  if (!req.params.id)
    next({ status: 400, err: new Error('No ID value was provided as a URL parameter') })
  else if (!req.body.tags)
    next({ status: 400, err: new Error('No tag array was provided in the request body') })
  else {
    Snippet.findByIdAndUpdate(req.params.id, { $set: { tags: req.body.tags } }, (err, snippet) => {
      if (err) next(err)
      res.json({ update: snippet })
    })
  }
}
