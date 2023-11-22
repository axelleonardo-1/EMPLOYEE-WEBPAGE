//Imports
const express = require('express');
const path = require('path');
const userRouter = require('../routes/user');
const jobsRouter = require('../routes/jobs');

//Router
const router = express.Router();

// Agrega middleware para analizar solicitudes con cuerpo en formato JSON
router.use(express.json());


router.use('/user', userRouter);
router.use('/jobs', jobsRouter);

//root-index.html
router.get("/",(req,res) => res.sendFile(path.resolve(__dirname + "/../views/index.html")));
//home-index.html
router.get("/home", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/index.html")));
//jobsApplied-appliedJobs.html
router.get("/jobsApplied", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/appliedJobs.html")));
//vacancyDetails - job-details.html
router.get("/vacancyDetails", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/job-detail.html")));
//vacanciesAvailables - jobListing.html
router.get("/vacanciesAvailables", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/jobListing.html")));
//tutorial - tutotial.html
router.get("/tutorial", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/tutorial.html")));
//publisher - publisherHome.html
router.get("/publisher", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/publisherHome.html")));
//postVacant - publisherNewVacant.html
router.get("/postVacant", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/publisherNewVacant.html")));
//myVacants publisherShowVacants.html
router.get("/myVacants", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/publisherShowVacants.html")));
//updateVacant - publisherUpdateVacant.html
router.get("/updateVacant", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/publisherUpdateVacant.html")));
//applierProfile - showApplier.html
router.get("/applierProfile", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/showApplier.html")));
// userLogin.html
router.get("/login", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/userLogin.html")));
// userProfile.html
router.get("/profile", (req, res) => res.sendFile(path.resolve(__dirname + "/../views/userProfile.html")));

module.exports = router;