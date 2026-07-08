const mongoose = require("mongoose");

const statistiqueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
    },

    periode: {
      type: String,
      enum: ["jour", "semaine", "mois"],
      required: true,
    },

    moyenneHumeur: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },

    humeurDominante: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

statistiqueSchema.index({ userId: 1, periode: 1, createdAt: -1 });

const Statistique = mongoose.model("Statistique", statistiqueSchema);

module.exports = Statistique;