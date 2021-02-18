import User from '../models/user.js'
import { notFound } from '../lib/errorHandler.js'

async function getAllUsers(_req, res) {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(404).json({ message: 'Not Found' })
  }
}

async function userProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate('favouritedSpaces').populate('createdSpaces')
    if (!user) throw new Error(notFound)
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

async function viewProfile(req, res, next) {
  const { id } = req.params
  try {
    const user = await User.findById(id).populate('favouritedSpaces').populate('createdSpaces')
    if (!user) throw new Error(notFound)
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}



export default {
  index: getAllUsers,
  userProfile: userProfile,
  viewProfile: viewProfile,
}