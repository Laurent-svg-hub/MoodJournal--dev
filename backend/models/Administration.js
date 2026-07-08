const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const administrateurSchema = new mongoose.Schema(
  {
    nom: {
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

    niveauAcces: {
      type: String,
      enum: ["super_admin", "moderateur", "support"],
      default: "moderateur",
    },
  },
  {
    timestamps: true, // génère createdAt et updatedAt
  }
);

// Hash du mot de passe avant sauvegarde
administrateurSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Méthode de vérification du mot de passe
administrateurSchema.methods.verifierPassword = async function (passwordSaisi) {
  return bcrypt.compare(passwordSaisi, this.password);
};

administrateurSchema.index({ email: 1 });

const Administrateur = mongoose.model("Administrateur", administrateurSchema);

module.exports = Administrateur;