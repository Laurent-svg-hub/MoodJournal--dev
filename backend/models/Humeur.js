const mongoose = require("mongoose");

const humeurSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },

    emoji: {
      type: String,
      required: true,
      trim: true,
    },

    niveau: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    commentaire: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true, // génère createdAt et updatedAt
  }
);

humeurSchema.index({ userId: 1, createdAt: -1 });

const Humeur = mongoose.model("Humeur", humeurSchema);

module.exports = Humeur;