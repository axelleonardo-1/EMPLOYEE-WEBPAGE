const mongoose = require('mongoose');
const router = require("express").Router();


const JobSchema = new mongoose.Schema(
    {
    
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        requirements: 
        {
                type: String,
        },
        skills:
        {
            type: String
        },
        salaryRange: {
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 0
            }
        },
        jobType: {
            type: String,
            enum: [
                "Full-Time",
                "Part-Time",
                "Internship",
                "Remote"
            ],
            required: true
        },
        location: {
            type: String,
            required: true
        },
        company: {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            logo: {
                type: String,
                required: true
            }
        },
        peopleInterested: [
            {
                type: String
            }
        ],
        postedAt: {
            type: Date,
            default: Date.now()
        },
        status: {
            type: String,
            enum: [
                "active",
                "closed"
            ],
            required: true,
            default: "active"
        }
    });

const Job = mongoose.model('Job',JobSchema);

router.post('/publishVacant', async(req,res) => {
    try {
        const newJob = new Job({
            ...req.body, // Copia todos los campos de req.body
        });

        // Guarda el nuevo usuario en la base de datos
        const savedJob = await newJob.save();

        // Enviar la respuesta al cliente
        res.json({ success: true, job: savedJob });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ success: false, message: 'Error al registrar el usuario.' });
    }
});

module.exports = router;