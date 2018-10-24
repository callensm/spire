import { Router } from 'express'
import { SnippetController } from '../controllers'

const router = Router()
router.get('/', SnippetController.getSnippets)
router.post('/', SnippetController.createSnippet)
router.get('/:id', SnippetController.findById)
router.delete('/:id', SnippetController.deleteSnippet)
router.get('/tag/:id', SnippetController.findByTag)
router.get('/lang/:lang', SnippetController.findByLanguage)
router.get('/author/:id', SnippetController.findByAuthor)
router.post('/:id/favorite/:op(add|sub)', SnippetController.updateFavorites)
router.post('/:id/tags', SnippetController.updateTags)

export default router
