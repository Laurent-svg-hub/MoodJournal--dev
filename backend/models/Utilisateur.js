const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const utilisateurSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true,
    },

    prenom: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    photoprofil: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // génère createdAt et updatedAt
  }
);

// Hash du mot de passe avant sauvegarde
utilisateurSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Méthode de vérification du mot de passe
utilisateurSchema.methods.verifierPassword = async function (passwordSaisi) {
  return bcrypt.compare(passwordSaisi, this.password);
};


const Utilisateur = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = Utilisateur;