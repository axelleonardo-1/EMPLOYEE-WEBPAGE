const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    avatar: {type:String, default:"./assets/avatars/avatarGeometric.png"}, // Si quieres que sea obligatorio, agrega `required: true`
    firstName: {type:String, default:null},
    lastName: {type:String, default:null},
    contactNumber: {type:String, default:null},
    location: {type:String, default:null},
    resume: {type:String, default:null},
    skills: {type:String, default:null},
    education: {type:String, default:null}, // Puedes cambiar esto a un array si almacenas los datos educativos individualmente
    workExperience: {type:String, default:null}, // Puedes cambiar esto a un array si almacenas la experiencia laboral individualmente
    applications: [{
      id: {type:String, default:null },
      status: { type: String, enum: ['open', 'closed'], default: null }
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

// register new user
router.post('/register', async (req, res) => {
    try {
        let pass = bcrypt.hashSync(req.body.password_hash,15)
        req.body.password_hash = pass;

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

// Sing in from all users
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.user });

        if (user && bcrypt.compareSync(req.body.password, user.password_hash)) {
            // Passwords match
            res.json({ success: true, user: user });
            console.log('\n----------------------contraseña correcta-----------------------');
        } else {
            // User not found or passwords don't match
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

//Por id especifico
router.put('/updateUserProfile/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const updatedData = req.body;

      console.log(userId);
      console.log(updatedData);
      // Find the user by ID and update their profile
      const updatedUser = await User.findByIdAndUpdate(userId, {
          $set: updatedData
      }, { new: true }); // { new: true } to return the updated document

      console.log(updatedUser);
      if (updatedUser) {
          res.json({ success: true, user: updatedUser });
      } else {
          res.status(404).json({ success: false, message: 'User not found' });
      }
  } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ success: false, message: 'Error updating user profile' });
  }
});




module.exports = router;