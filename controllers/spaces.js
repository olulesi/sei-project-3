import Space from '../models/space.js'
import { notFound, forbidden } from '../lib/errorHandler.js'

// spaces index

async function spaceIndex(_req, res, next){
  try {
    const spaces = await Space.find()
    return res.status(200).json(spaces)
  } catch (err) {
    next(err)
  }
}

// spaces create 

async function spaceCreate (req, res, next){
  try {
    const newSpaceData = { ...req.body, owner: req.currentUser._id }
    const newSpace = await Space.create(newSpaceData)
    return res.status(201).json(newSpace)
  } catch (err) {
    next(err)
  }
}

// spaces show

async function spaceShow(req, res, next){
  const { id } = req.params
  try {
    const space = await Space.findById(id).populate('owner').populate('comments.owner').populate('favouritedBy.owner')
    if (!space) throw new Error()
    return res.status(200).json(space)
  } catch (err) {
    next(err)
  }
}

// space update / edit

async function spaceUpdate(req, res, next){
  const { id } = req.params
  try {
    const spaceToEdit = await Space.findById(id)
    if (!spaceToEdit) throw new Error()
    Object.assign(spaceToEdit, req.body)
    await spaceToEdit.save()
    return res.status(202).json(spaceToEdit)
  } catch (err) {
    next(err)
  }
}

// space delete

async function spaceDelete(req, res, next) {
  const { id } = req.params
  try {
    const spaceToDelete = await Space.findById(id)
    if (!spaceToDelete) throw new Error(notFound)
    if (!spaceToDelete.owner.equals(req.currentUser._id)) throw new Error(forbidden)
    await spaceToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

// add a comment

async function spaceCommentCreate(req, res, next) {
  const { id } = req.params
  try {
    const space = await Space.findById(id)
    if (!space) throw new Error(notFound)
    const newComment = { ...req.body, owner: req.currentUser._id }
    space.comments.push(newComment)
    await space.save()
    return res.status(201).json(space)
  } catch (err) {
    next(err)
  }
}

// delete a comment

async function spaceCommentDelete(req, res, next) {
  const { id, commentId } = req.params
  try {
    const space = await Space.findById(id)
    if (!space) throw new Error(notFound)
    const commentToDelete = space.comments.id(commentId)
    if (!commentToDelete) throw new Error(notFound)
    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error(forbidden)
    await commentToDelete.remove()
    await space.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

// favourite space

async function favouriteASpace(req, res, next) {
  const { id } = req.params
  console.log(req.params)
  try {
    const space = await Space.findById(id)
    if (!space) throw new Error(notFound)
    // const favourited = { owner: req.currentUser._id }
    space.favouritedBy.push(req.currentUser._id)
    await space.save()
    return res.status(201).json(space)
  } catch (err) {
    next(err)
  }
}

// unfavourite a space

async function unFavouriteASpace(req, res, next) {
  const { id } = req.params
  console.log(req.params)
  try {
    const space = await Space.findById(id)
    if (!space) throw new Error(notFound)
    // const favourited = { owner: req.currentUser._id }
    space.favouritedBy.pull(req.currentUser._id)
    await space.save()
    return res.status(201).json(space)
  } catch (err) {
    next(err)
  }
}







export default {
  index: spaceIndex,
  create: spaceCreate,
  show: spaceShow,
  update: spaceUpdate,
  delete: spaceDelete,
  commentCreate: spaceCommentCreate,
  commentDelete: spaceCommentDelete,
  favouriteASpace: favouriteASpace,
  unFavouriteASpace: unFavouriteASpace,
}