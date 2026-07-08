const mongoose = require("mongoose");

const parametreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true,
      unique: true, // un seul document de paramètres par utilisateur
    },

    theme: {
      type: String,
      enum: ["clair", "sombre"],
      default: "clair",
    },

    notificationActives: {
      type: Boolean,
      default: true,
    },

    heureRappel: {
      type: String,
      default: "20:00",
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },

    langue: {
      type: String,
      enum: ["fr", "en", "es", "de"],
      default: "fr",
    },
  },
  {
    timestamps: true,
  }
);

const Parametre = mongoose.model("Parametre", parametreSchema);

module.exports = Parametre;