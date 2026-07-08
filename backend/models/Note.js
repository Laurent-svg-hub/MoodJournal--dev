const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },

    titre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    contenue: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    categorie: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true, // génère createdAt et updatedAt
  }
);

noteSchema.index({ userId: 1, createdAt: -1 });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;