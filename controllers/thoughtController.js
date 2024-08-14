const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No se encontró ningún pensamiento con este ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Pensamiento creado, pero no se encontró ningún usuario con este ID' })
          : res.json('Pensamiento creado exitosamente')
      )
      .catch((err) => res.status(500).json(err));
  },

  
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No se encontró ningún pensamiento con este ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No se encontró ningún pensamiento con este ID' })
          : User.findOneAndUpdate(
              { thoughts: req.params.id },
              { $pull: { thoughts: req.params.id } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Pensamiento eliminado, pero no se encontró ningún usuario con este ID' })
          : res.json({ message: 'Pensamiento eliminado exitosamente' })
      )
      .catch((err) => res.status(500).json(err));
  },

  
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No se encontró ningún pensamiento con este ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No se encontró ningún pensamiento con este ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
