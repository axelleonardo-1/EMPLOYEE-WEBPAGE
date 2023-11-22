const mongoose = require('mongoose');
const router = require("express").Router();


const JobSchema = new mongoose.Schema(
    {
    
        employerId: {
            type: String,
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

// mostrar vacantes
router.get('/vacancies', async (req, res) => {
    try {
        // Get the publisherId from query parameters instead of body
        const publisherId = req.query.publisherId;
        const jobs = await Job.find({ employerId: publisherId });

        res.json(jobs); // Send the jobs back in the response
        console.log("Entro en el fetch");
        console.log("id recibido");
        console.log(publisherId);
        console.log(jobs);

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching jobs', error: error.message });
    }
});

// get all jobs for show Jobs
router.get('/allJobs', async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching jobs', error: error.message });
    }
});

// to show job details of a specific job
router.get('/details/:jobId', async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const job = await Job.findById(jobId);

        console.log('id recibido');
        console.log(jobId);
        console.log(job);

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching job', error: error.message });
    }
});


module.exports = router;