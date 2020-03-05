const Trail = require('../models/trail')

function index(req, res, next) {
  Trail
    .find()
    .populate('user')
    .then(foundTrails => res.status(200).json(foundTrails))
    .catch(next)
}

function create(req, res, next) {
  req.body.user = req.currentUser
  Trail
    .create(req.body)
    .then(createdTrail => res.status(201).json(createdTrail))
    .catch(next)
}

function show(req, res, next) {
  Trail
    .findById(req.params.id)
    .populate('completion.user')
    .populate('user')
    .then(trail => {
      if (!trail) throw new Error('Not Found')
      res.status(200).json(trail)
    })
    .catch(next)
}

function update(req, res, next) {
  Trail
    .findById(req.params.id)
    .then(trail => {
      if (!trail) return res.status(404).json({ message: 'Not Found' })
      if (!trail.user.equals(req.currentUser._id)) {
        return res.status(401).json({ message: 'Unauthorized' })
      } else {
        Object.assign(trail, req.body)
        trail.save()
          .then(updatedTrail => res.status(202).json(updatedTrail))
      }
    })
    .catch(next)
}

function destroy(req, res, next) {
  Trail
    .findById(req.params.id)
    .then(trail => {
      if (!trail) return res.status(404).json({ message: 'Not Found' })
      if (!trail.user.equals(req.currentUser._id)) {
        return res.status(401).json({ message: 'Unauthorized' })
      } else {
        trail.remove()
        return res.sendStatus(204)
      }
    })
    .catch(next)
}

//new controller for completion form
function completion(req, res, next) {
  req.body.user = req.currentUser
  Trail
    .findById(req.params.id)
    .populate('user')
    .then(trail => {
      if (!trail) return res.status(404).json({ message: 'Not Found' })
      trail.completion.push(req.body)
      return trail.save()
    })
    .then(trail => res.status(201).json(trail))
    .catch(next)
}

function completionDelete(req, res, next) {
  Trail
    .findById(req.params.id)
    .then(trail => {
      if (!trail) return res.status(404).json({ message: 'Not Found' })
      if (trail.completion.some(completion => completion.user.equals(req.currentUser._id))) {
        const completion = trail.completion.filter(completion => completion.user.equals(req.currentUser._id))[0]
        completion.remove()
        return trail.save()
      }
    })
    .then(trail => res.status(202).json(trail))
    .catch(next)
}

//have not implented comments into the front end yet
function commentDelete(req, res, next) {
  Trail
    .findById(req.params.id)
    .then(trail => {
      if (!trail) return res.status(404).json({ message: 'Not Found' })
      const comment = trail.comments.id(req.params.commentId)
      if (!comment.user.equals(req.currentUser._id)) {
        return res.status(401).json({ message: 'Unauthorized' })
      } else {
        comment.remove()
        return trail.save().then(() => res.sendStatus(204))
      }
    })
    .catch(next)
}

//have not implented comments into the front end yet
function commentCreate(req, res, next) {
  req.body.user = req.currentUser
  Trail
    .findById(req.params.id)
    .then(trail => {
      if (!trail) return res.status(404).json({ message: 'Not Found' })
      trail.comments.push(req.body)
      return trail.save()
    })
    .then(trail => res.status(201).json(trail))
    .catch(next)
}

// * GET /api/trails/:id/like
function like(req, res, next) {
  Trail
    .findById(req.params.id)
    .then(trail => {
      if (!trail) return res.status(404).json({ message: 'Not Found ' })
      if (trail.likes.some(like => like.user.equals(req.currentUser._id))) return trail
      trail.likes.push({ user: req.currentUser })
      return trail.save()
    })
    .then(trail => res.status(202).json(trail))
    .catch(next)
}

function likeDelete(req, res, next) {
  Trail
    .findById(req.params.id)
    .then(trail => {
      if (!trail) return res.status(404).json({ message: 'Not Found' })
      if (trail.likes.some(like => like.user.equals(req.currentUser._id))) {
        const like = trail.likes.filter(like => like.user.equals(req.currentUser._id))[0]
        like.remove()
        return trail.save()
      }
    })
    .then(trail => res.status(202).json(trail))
    .catch(next)
}

module.exports = { index, create, show, update, destroy, commentCreate, commentDelete, completion, like, likeDelete, completionDelete }