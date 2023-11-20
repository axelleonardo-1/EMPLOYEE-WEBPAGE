const mongoose = require('mongoose');
const router = require("express").Router();

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userType: {
    type: String,
    enum: ['user', 'publisher'], // Asegúrate de que solo se puedan ingresar estos dos valores
    required: true
  },
  profile: {
    avatar: String, // Si quieres que sea obligatorio, agrega `required: true`
    firstName: String,
    lastName: String,
    contactNumber: String,
    location: String,
    resume: String,
    skills: {
      type: String, // Puedes cambiar esto a un array si almacenas las habilidades individualmente
    },
    education: String, // Puedes cambiar esto a un array si almacenas los datos educativos individualmente
    workExperience: String, // Puedes cambiar esto a un array si almacenas la experiencia laboral individualmente
    aplications: [{
      type: String, // o String si el ID es una cadena
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Crea el modelo de usuarios
const User = mongoose.model('User', UserSchema);


router.post('/register', async (req, res) => {
    try {
        // En un entorno de producción, asegúrate de validar y hashear la contraseña aquí
        const newUser = new User({
            ...req.body, // Copia todos los campos de req.body
            // Genera campos adicionales como createdAt y updatedAt
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        // Guarda el nuevo usuario en la base de datos
        const savedUser = await newUser.save();

        // Enviar la respuesta al cliente
        res.json({ success: true, user: savedUser });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ success: false, message: 'Error al registrar el usuario.' });
    }
});


module.exports = router;