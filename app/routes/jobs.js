const { response } = require('express');
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
        peopleInterested: {
            type: [{ type: String }], // Define un array de strings
            default: [] // Esto asegura que el campo siempre se inicialice como un array vacío
        },
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


router.put('/apply/:jobId', async (req, res) => {
    try {
        console.log("Entro al fetch 2")
        // El userId debe ser obtenido del cuerpo (body) de la solicitud, no de los parámetros de la ruta
        const userId = req.body.userId; // Cambiado de req.params.userId a req.body.userId

        const jobId = req.params.jobId; // jobId está bien, ya que se pasa como un parámetro en la URL
        console.log(jobId + " jobid");
        console.log(userId + " userId");
        
        // Encuentra el trabajo por su ID y actualiza la lista de personas interesadas
        Job.findByIdAndUpdate(
            jobId,
            { $push: { peopleInterested: userId } },
            { new: true }
        ).then((doc) =>{
          console.log("Job con nuevo interesado");
          console.log(doc)
          if (doc) {
            console.log("update exitoso");
            // se envia la respuesta en caso de que se crean los nuevos archivos actualizados
            res.json({ success: true, job: doc});
          } else {
              res.status(404).json({ success: false, message: 'Job not found' });
          }
        });
    } catch (error) {
        console.error('Error applying to job:', error);
        res.status(500).json({ success: false, message: 'Error applying to job' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Job.findByIdAndDelete(id);

        if (result) {
            res.json({ success: true, message: 'Registro eliminado correctamente', result: result });
        } else {
            res.status(404).json({ success: false, message: 'No se encontró el registro para eliminar' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el registro', error: error.message });
    }
});

router.get('/userApplications/:jobId',async(req,res) => {
    console.log('entra al fetch ');
    try{
        console.log('dentro del try');
        const JobId = req.params.jobId;
        const searchedJob = await Job.findById(JobId);
        if (!searchedJob) { // no se ha encontrado
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.json(searchedJob);
    }
    catch (error){
        console.error('Error applying to job:', error);
        res.status(500).json({ success: false, message: 'Error fetching job' });
    }
});

// Ruta GET para buscar un trabajo por su _id y devolverlo en la respuesta
router.get('/busqueda/:jobId', async (req, res) => {
    try {
        // Obtener el jobId de los parámetros de la URL
        const jobId = req.params.jobId;
        // Buscar el trabajo en la base de datos
        const job = await Job.findById(jobId);

        // Verificar si se encontró el trabajo
        if (!job) {
            // No se encontró el trabajo, devolver un estado 404 con un mensaje
            return res.status(404).json({ success: false, message: 'Job not found' });
        }
        // Se encontró el trabajo, devolverlo como respuesta JSON
        res.json({ success: true, job: job });
    } catch (error) {
        // Hubo un error en la búsqueda, devolver un estado 500 con un mensaje
        console.error('Error searching for job:', error);
        res.status(500).json({ success: false, message: 'Error searching for job', error: error.message });
    }
});


// Ruta PUT para actualizar un trabajo existente
router.put('/updateJob/:jobId', async (req, res) => {
    const jobId = req.params.jobId;
    const jobUpdates = req.body;

    console.log('dentro de updates');
    try {
        // Buscar por _id y actualizar el trabajo
        const updatedJob = await Job.findByIdAndUpdate(jobId, jobUpdates, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.json({ success: true, message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating job', error: error.message });
    }
});

// Ruta PUT para eliminar un userId de peopleInterested de un trabajo específico
router.put('/delete/:jobId', async (req, res) => {
    const { jobId } = req.params;
    const { userId } = req.body; // El ID del usuario a eliminar de peopleInterested

    console.log(jobId + "   " + userId);

    try {
        console.log('dentro del try')
        // Utilizar $pull para eliminar el userId de peopleInterested
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { $pull: { peopleInterested: userId } },
            { new: true }
        );

        console.log(updatedJob);

        if (!updatedJob) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.json({ success: true, message: 'User removed from peopleInterested successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ success: false, message: 'Error updating job', error: error.message });
    }
});




module.exports = router;