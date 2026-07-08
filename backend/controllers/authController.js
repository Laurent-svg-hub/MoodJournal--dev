const Utilisateur = require("../models/Utilisateur");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    const utilisateur = await Utilisateur.findOne({ email }).select("+password");
    if (!utilisateur) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, utilisateur.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: utilisateur._id,
        role: utilisateur.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Connexion réussie",
      token,
      user: {
        id: utilisateur._id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur pendant la connexion",
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    const utilisateur = await Utilisateur.create({
      nom,
      prenom,
      email,
      password,
    });

    return res.status(201).json({
      message: "Utilisateur créé",
      user: utilisateur,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur création utilisateur",
      error: error.message,
    });
  }
};

module.exports = { loginUser, registerUser };