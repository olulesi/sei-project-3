import express from 'express'
import spaces from '../controllers/spaces.js'
import auth from '../controllers/auth.js'
import users from '../controllers/users.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/spaces')
  .get(spaces.index)
  .post(secureRoute, spaces.create)

router.route('/spaces/:id')
  .get(spaces.show)
  .put(secureRoute, spaces.update)
  .delete(secureRoute, spaces.delete)

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)

router.route('/spaces/:id/comments')
  .post(secureRoute, spaces.commentCreate)

router.route('/spaces/:id/comments/:commentId')
  .delete(secureRoute, spaces.commentDelete)  

router.route('/spaces/:id/favourite')
  .post(secureRoute, spaces.favouriteASpace)
  .delete(secureRoute, spaces.unFavouriteASpace)

router.route('/profile/:id')
  .get(secureRoute, users.userProfile)

router.route('/users')
  .get(users.index)

router.route('/users/:id')
  .get(users.viewProfile)

  

export default router