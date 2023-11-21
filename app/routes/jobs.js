const mongoose = require('mongoose');
const router = require("express").Router();


const JobSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        employerId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        requirements: [
            {
                type: String
            }
        ],
        skills: [
            {
                type: String
            }
        ],
        salaryRange: {
            min: {
                type: Number
            },
            max: {
                type: Number
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
            required: true
        }
    });

const Job = mongoose.model('Job',JobSchema);